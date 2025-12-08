// order.service.js
import Order from './order.schema.js';
import Produto from '../product/product.schema.js';
import axios from 'axios';
import mongoose from 'mongoose';
import { MAQUINA_BASE_URL } from '../../Config/middleware.config.js';

const START_PRODUCTION_URL = `${MAQUINA_BASE_URL}/queue/add`;
const CALLBACK_BASE_URL = process.env.CALLBACK_BASE_URL || 'http://localhost:3000/api/pedidos';

export const finalizarCompra = async (usuarioId, itemsDoCarrinho, callbackURLCliente) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    console.log(`Iniciando finalização de compra para usuário: ${usuarioId}`);
    
    const itemsCompletos = [];
    let valorTotal = 0;
    
    for (const item of itemsDoCarrinho) {
      const produto = await Produto.findById(item.produtoId).session(session);
      if (!produto) {
        throw new Error(`Produto ${item.produtoId} não encontrado`);
      }
      
      // Verificar estoque disponível
      if (produto.estoque < item.quantidade) {
        throw new Error(`Estoque insuficiente para ${produto.nome}. Disponível: ${produto.estoque}, Solicitado: ${item.quantidade}`);
      }
      
      // Reservar posição no estoque
      produto.estoqueReservado = (produto.estoqueReservado || 0) + item.quantidade;
      await produto.save({ session });
      
      itemsCompletos.push({
        produtoId: item.produtoId,
        nomeProduto: produto.nome,
        quantidade: item.quantidade,
        precoUnitario: produto.preco,
        itemIdMaquina: [],
        statusProducao: 'PENDENTE',
        unidades: [] // Array para rastrear cada unidade individualmente
      });
      
      valorTotal += produto.preco * item.quantidade;
    }
    
    // 2. Criar pedido com callbackURL do cliente
    const novoPedido = new Order({
      usuarioId,
      items: itemsCompletos,
      valorTotal,
      callbackURL: callbackURLCliente, // URL para notificar o cliente
      posicaoEstoqueReservada: true,
      status: 'PENDENTE'
    });
    
    await novoPedido.save({ session });
    console.log(`Pedido ${novoPedido.numeroPedido} criado com sucesso`);
    
    await session.commitTransaction();
    
    // 3. Enviar para produção (fora da transação pois é assíncrono)
    setTimeout(() => enviarParaProducao(novoPedido._id), 100);
    
    // 4. Notificar cliente sobre criação do pedido
    if (callbackURLCliente) {
      enviarCallbackCliente(novoPedido, 'PEDIDO_CRIADO');
    }
    
    return novoPedido;
    
  } catch (error) {
    await session.abortTransaction();
    console.error('Erro ao finalizar compra:', error.message);
    throw error;
  } finally {
    session.endSession();
  }
};

// Função para enviar itens para produção
const enviarParaProducao = async (pedidoId) => {
  try {
    const pedido = await Order.findById(pedidoId);
    if (!pedido) {
      console.error(`Pedido ${pedidoId} não encontrado para produção`);
      return;
    }
    
    console.log(`Enviando pedido ${pedido.numeroPedido} para produção`);
    
    for (const item of pedido.items) {
      console.log(`Enviando ${item.quantidade} unidades do produto ${item.produtoId} para produção`);
      
      for (let i = 0; i < item.quantidade; i++) {
        try {
          const uniqueId = `${item.produtoId}-${pedido._id}-${Date.now()}-${i}`;
          const callbackURL = `${CALLBACK_BASE_URL}/callback/${pedido.numeroPedido}/${uniqueId}`;
          
          const response = await axios.post(START_PRODUCTION_URL, {
            id: uniqueId,
            produtoId: item.produtoId.toString(),
            pedidoId: pedido.numeroPedido,
            callbackURL: callbackURL
          }, {
            timeout: 10000
          });
          
          // Salvar informações da unidade
          item.unidades.push({
            idMaquina: response.data.id || uniqueId,
            status: 'EM_PRODUCAO',
            callbackURL: callbackURL,
            dataEnvioProducao: new Date()
          });
          
          item.itemIdMaquina.push(response.data.id || uniqueId);
          item.statusProducao = 'EM_PRODUCAO';
          
          console.log(`Unidade ${i+1} enviada para produção: ${uniqueId}`);
          
        } catch (error) {
          console.error(`Falha ao enviar unidade ${i+1} do produto ${item.produtoId}:`, error.message);
          item.unidades.push({
            idMaquina: null,
            status: 'FALHA_ENVIO',
            erro: error.message
          });
        }
      }
    }
    
    pedido.status = 'EM_PRODUCAO';
    pedido.producaoIniciada = true;
    await pedido.save();
    
    console.log(`Pedido ${pedido.numeroPedido} enviado para produção com sucesso`);
    
    // Notificar cliente sobre início da produção
    if (pedido.callbackURL) {
      enviarCallbackCliente(pedido, 'PRODUCAO_INICIADA');
    }
    
  } catch (error) {
    console.error(`Erro ao enviar pedido ${pedidoId} para produção:`, error);
  }
};

// Endpoint para receber callback das máquinas
export const receberCallbackProducao = async (numeroPedido, itemId, statusProducao, dadosAdicionais = {}) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    console.log(`Recebendo callback para pedido ${numeroPedido}, item ${itemId}, status: ${statusProducao}`);
    
    const pedido = await Order.findOne({ numeroPedido }).session(session);
    if (!pedido) {
      throw new Error(`Pedido ${numeroPedido} não encontrado`);
    }
    
    let itemAtualizado = false;
    let pedidoCompleto = false;
    
    // Atualizar unidade específica
    for (const item of pedido.items) {
      const unidadeIndex = item.unidades.findIndex(u => 
        u.idMaquina === itemId || u.callbackURL.includes(itemId)
      );
      
      if (unidadeIndex !== -1) {
        item.unidades[unidadeIndex].status = statusProducao;
        item.unidades[unidadeIndex].dataAtualizacao = new Date();
        item.unidades[unidadeIndex].dadosMaquina = dadosAdicionais;
        
        // Se produção concluída
        if (statusProducao === 'PRODUZIDO' || statusProducao === 'CONCLUIDO') {
          item.unidades[unidadeIndex].dataConclusao = new Date();
        }
        
        itemAtualizado = true;
        
        // Verificar se todas as unidades deste item estão prontas
        const todasConcluidas = item.unidades.every(u => 
          u.status === 'PRODUZIDO' || u.status === 'CONCLUIDO'
        );
        
        if (todasConcluidas) {
          item.statusProducao = 'PRODUZIDO';
        }
        
        break;
      }
    }
    
    if (!itemAtualizado) {
      console.warn(`Item ${itemId} não encontrado no pedido ${numeroPedido}`);
    }
    
    // Verificar se todo pedido está produzido
    pedidoCompleto = pedido.items.every(item => 
      item.statusProducao === 'PRODUZIDO'
    );
    
    if (pedidoCompleto) {
      pedido.status = 'PRODUZIDO';
      pedido.producaoConcluida = true;
      pedido.dataProducaoConcluida = new Date();
      console.log(`Produção concluída para pedido ${numeroPedido}`);
      
      // Notificar cliente
      if (pedido.callbackURL) {
        enviarCallbackCliente(pedido, 'PRODUCAO_CONCLUIDA');
      }
    }
    
    pedido.updatedAt = new Date();
    await pedido.save({ session });
    await session.commitTransaction();
    
    console.log(`Callback processado com sucesso para pedido ${numeroPedido}`);
    
    return { 
      success: true, 
      pedidoCompleto,
      numeroPedido 
    };
    
  } catch (error) {
    await session.abortTransaction();
    console.error(`Erro ao processar callback para pedido ${numeroPedido}:`, error);
    throw error;
  } finally {
    session.endSession();
  }
};

// Confirmar entrega e liberar estoque
export const confirmarEntrega = async (numeroPedido, codigoRastreamento, dadosEntrega = {}) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    console.log(`Confirmando entrega para pedido ${numeroPedido}`);
    
    const pedido = await Order.findOne({ 
      numeroPedido,
      status: { $in: ['PRODUZIDO', 'ENVIADO'] }
    }).session(session);
    
    if (!pedido) {
      throw new Error(`Pedido ${numeroPedido} não encontrado ou não está pronto para entrega`);
    }
    
    if (!pedido.posicaoEstoqueReservada) {
      throw new Error(`Estoque não foi reservado para o pedido ${numeroPedido}`);
    }
    
    // Liberar estoque (baixa real)
    for (const item of pedido.items) {
      const produto = await Product.findById(item.produtoId).session(session);
      if (produto) {
        // Remover da reserva e dar baixa no estoque
        produto.estoqueReservado -= item.quantidade;
        produto.estoque -= item.quantidade;
        await produto.save({ session });
        console.log(`Estoque liberado para produto ${item.produtoId}: ${item.quantidade} unidades`);
      }
    }
    
    // Atualizar pedido
    pedido.status = 'ENTREGUE';
    pedido.estoqueLiberado = true;
    pedido.dataEntrega = new Date();
    pedido.codigoRastreamento = codigoRastreamento || pedido.codigoRastreamento;
    pedido.dadosEntrega = dadosEntrega;
    
    await pedido.save({ session });
    await session.commitTransaction();
    
    console.log(`Entrega confirmada para pedido ${numeroPedido}`);
    
    // Notificar cliente sobre entrega
    if (pedido.callbackURL) {
      enviarCallbackCliente(pedido, 'ENTREGUE');
    }
    
    return { 
      success: true, 
      pedido: {
        numeroPedido: pedido.numeroPedido,
        status: pedido.status,
        dataEntrega: pedido.dataEntrega
      }
    };
    
  } catch (error) {
    await session.abortTransaction();
    console.error(`Erro ao confirmar entrega para pedido ${numeroPedido}:`, error);
    throw error;
  } finally {
    session.endSession();
  }
};

// Rastrear pedido (substitui o GET por ID)
export const rastrearPedido = async (numeroPedido) => {
  try {
    console.log(`Rastreando pedido ${numeroPedido}`);
    
    const pedido = await Order.findOne({ numeroPedido })
      .select('numeroPedido status items.produtoId items.nomeProduto items.quantidade items.statusProducao items.unidades.status valorTotal createdAt updatedAt')
      .lean();
    
    if (!pedido) {
      throw new Error(`Pedido ${numeroPedido} não encontrado`);
    }
    
    // Calcular progresso
    let totalUnidades = 0;
    let unidadesConcluidas = 0;
    
    pedido.items.forEach(item => {
      totalUnidades += item.quantidade;
      if (item.unidades) {
        unidadesConcluidas += item.unidades.filter(u => 
          u.status === 'PRODUZIDO' || u.status === 'CONCLUIDO'
        ).length;
      }
    });
    
    const progressoProducao = totalUnidades > 0 
      ? Math.round((unidadesConcluidas / totalUnidades) * 100) 
      : 0;
    
    // Status simplificado para o cliente
    const statusParaCliente = {
      PENDENTE: 'Aguardando confirmação',
      EM_PRODUCAO: 'Em produção',
      PRODUZIDO: 'Produzido - pronto para envio',
      ENVIADO: 'Enviado',
      ENTREGUE: 'Entregue',
      CANCELADO: 'Cancelado'
    };
    
    return {
      success: true,
      pedido: {
        numeroPedido: pedido.numeroPedido,
        status: pedido.status,
        statusDescricao: statusParaCliente[pedido.status] || pedido.status,
        progressoProducao,
        totalItems: pedido.items.length,
        valorTotal: pedido.valorTotal,
        criadoEm: pedido.createdAt,
        atualizadoEm: pedido.updatedAt,
        items: pedido.items.map(item => ({
          produto: item.nomeProduto,
          quantidade: item.quantidade,
          statusProducao: item.statusProducao,
          unidadesConcluidas: item.unidades ? item.unidades.filter(u => 
            u.status === 'PRODUZIDO' || u.status === 'CONCLUIDO'
          ).length : 0
        }))
      }
    };
    
  } catch (error) {
    console.error(`Erro ao rastrear pedido ${numeroPedido}:`, error);
    throw error;
  }
};

// Função para enviar callback para o cliente
const enviarCallbackCliente = async (pedido, evento) => {
  if (!pedido.callbackURL) {
    console.log(`Pedido ${pedido.numeroPedido} não tem callbackURL, notificação ignorada`);
    return;
  }
  
  try {
    const payload = {
      evento,
      pedidoId: pedido._id,
      numeroPedido: pedido.numeroPedido,
      status: pedido.status,
      timestamp: new Date().toISOString(),
      dados: {
        progresso: calcularProgressoPedido(pedido),
        estimativaEntrega: calcularEstimativaEntrega(pedido)
      }
    };
    
    console.log(`Enviando callback para ${pedido.callbackURL}, evento: ${evento}`);
    
    await axios.post(pedido.callbackURL, payload, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'X-Pedido-ID': pedido.numeroPedido,
        'X-Assinatura': gerarAssinatura(pedido.numeroPedido, evento)
      }
    });
    
    console.log(`Callback enviado com sucesso para pedido ${pedido.numeroPedido}`);
    
  } catch (error) {
    console.error(`Falha ao enviar callback para ${pedido.callbackURL}:`, error.message);
    // Poderia implementar fila de retry aqui
  }
};

// Funções auxiliares
const calcularProgressoPedido = (pedido) => {
  let totalUnidades = 0;
  let unidadesConcluidas = 0;
  
  pedido.items.forEach(item => {
    totalUnidades += item.quantidade;
    if (item.unidades) {
      unidadesConcluidas += item.unidades.filter(u => 
        u.status === 'PRODUZIDO' || u.status === 'CONCLUIDO'
      ).length;
    }
  });
  
  return {
    totalUnidades,
    unidadesConcluidas,
    porcentagem: totalUnidades > 0 ? Math.round((unidadesConcluidas / totalUnidades) * 100) : 0
  };
};

const calcularEstimativaEntrega = (pedido) => {
  const agora = new Date();
  const dataCriacao = new Date(pedido.createdAt);
  const diferencaDias = Math.floor((agora - dataCriacao) / (1000 * 60 * 60 * 24));
  
  let estimativa = new Date(dataCriacao);
  
  switch (pedido.status) {
    case 'PENDENTE':
      estimativa.setDate(estimativa.getDate() + 7); // +7 dias
      break;
    case 'EM_PRODUCAO':
      estimativa.setDate(estimativa.getDate() + 5); // +5 dias
      break;
    case 'PRODUZIDO':
      estimativa.setDate(estimativa.getDate() + 3); // +3 dias
      break;
    case 'ENVIADO':
      estimativa.setDate(estimativa.getDate() + 2); // +2 dias
      break;
    case 'ENTREGUE':
      return { data: pedido.dataEntrega, status: 'ENTREGUE' };
    default:
      estimativa.setDate(estimativa.getDate() + 10);
  }
  
  return {
    data: estimativa.toISOString(),
    diasUteis: Math.max(0, Math.ceil((estimativa - agora) / (1000 * 60 * 60 * 24))),
    status: 'ESTIMADO'
  };
};

const gerarAssinatura = (numeroPedido, evento) => {
  // Implementar assinatura HMAC para segurança
  const secret = process.env.CALLBACK_SECRET || 'segredo-padrao';
  const crypto = require('crypto');
  return crypto
    .createHmac('sha256', secret)
    .update(`${numeroPedido}-${evento}-${Date.now()}`)
    .digest('hex');
};

// Atualizar status do pedido (para uso interno)
export const atualizarStatusPedido = async (numeroPedido, novoStatus, dados = {}) => {
  try {
    const pedido = await Order.findOneAndUpdate(
      { numeroPedido },
      {
        status: novoStatus,
        ...dados,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!pedido) {
      throw new Error(`Pedido ${numeroPedido} não encontrado`);
    }
    
    // Notificar cliente sobre mudança de status
    if (pedido.callbackURL) {
      enviarCallbackCliente(pedido, `STATUS_${novoStatus}`);
    }
    
    return pedido;
    
  } catch (error) {
    console.error(`Erro ao atualizar status do pedido ${numeroPedido}:`, error);
    throw error;
  }
};