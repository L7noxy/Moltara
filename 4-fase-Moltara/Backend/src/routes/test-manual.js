// test-manual.js
import axios from 'axios';
import mongoose from 'mongoose';

// Configuração
const API_BASE_URL = 'http://localhost:3000/api';
const MONGODB_URI = 'mongodb://localhost:27017/teste_pedidos';

// IDs de teste
const USUARIO_TESTE_ID = '507f1f77bcf86cd799439011';
const PRODUTO_TESTE_ID = '60d21b4667d0d8992e610c85';

// Servidor mock para receber callbacks
import http from 'http';

// Servidor para receber callbacks do sistema
const callbackServer = http.createServer((req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    console.log('\n📨 CALLBACK RECEBIDO:');
    console.log('URL:', req.url);
    console.log('Método:', req.method);
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.parse(body));
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ received: true }));
  });
});

callbackServer.listen(3001, () => {
  console.log('Servidor de callback rodando na porta 3001');
});

async function conectarMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}

async function limparDadosTeste() {
  try {
    const Pedido = mongoose.model('Order');
    const Produto = mongoose.model('Product');
    
    await Pedido.deleteMany({});
    await Produto.deleteMany({});
    
    console.log('🗑️  Dados de teste limpos');
  } catch (error) {
    console.log('⚠️  Não foi possível limpar dados anteriores');
  }
}

async function criarProdutoTeste() {
  try {
    const Produto = mongoose.model('Product');
    
    const produto = new Produto({
      _id: PRODUTO_TESTE_ID,
      nome: 'Produto de Teste',
      sku: 'TEST001',
      descricao: 'Produto para testes',
      preco: 99.90,
      estoque: 100,
      estoqueReservado: 0
    });
    
    await produto.save();
    console.log('✅ Produto de teste criado:', produto.nome);
    
    return produto;
  } catch (error) {
    console.error('❌ Erro ao criar produto de teste:', error.message);
    // Se já existir, apenas continua
    return null;
  }
}

async function testarCriacaoPedido() {
  console.log('\n🔵 TESTE 1: Criar Pedido');
  
  const payload = {
    usuarioId: USUARIO_TESTE_ID,
    items: [{
      produtoId: PRODUTO_TESTE_ID,
      quantidade: 2
    }],
    callbackURL: 'http://localhost:3001/callback-cliente'
  };
  
  try {
    const response = await axios.post(`${API_BASE_URL}/pedidos`, payload);
    
    console.log('✅ Pedido criado com sucesso!');
    console.log('Resposta:', JSON.stringify(response.data, null, 2));
    
    return response.data.pedido;
  } catch (error) {
    console.error('❌ Erro ao criar pedido:', error.response?.data || error.message);
    return null;
  }
}

async function testarRastreamento(numeroPedido) {
  console.log('\n🔵 TESTE 2: Rastrear Pedido');
  
  try {
    const response = await axios.get(`${API_BASE_URL}/pedidos/rastrear/${numeroPedido}`);
    
    console.log('✅ Rastreamento realizado com sucesso!');
    console.log('Status do pedido:', response.data.pedido.status);
    console.log('Progresso:', response.data.pedido.progressoProducao + '%');
    console.log('Itens:', response.data.pedido.items);
    
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao rastrear pedido:', error.response?.data || error.message);
    return null;
  }
}

async function simularCallbackProducao(numeroPedido) {
  console.log('\n🔵 TESTE 3: Simular Callback da Máquina');
  
  // Primeiro, precisamos obter o pedido para pegar os IDs das máquinas
  const Pedido = mongoose.model('Order');
  const pedido = await Pedido.findOne({ numeroPedido });
  
  if (!pedido) {
    console.error('❌ Pedido não encontrado para simular callback');
    return;
  }
  
  // Simular callback para cada unidade
  for (const item of pedido.items) {
    for (const unidade of item.unidades) {
      if (unidade.idMaquina && unidade.status === 'EM_PRODUCAO') {
        const payload = {
          status: 'PRODUZIDO',
          dados: {
            tempoProducao: '00:45:23',
            qualidade: 'APROVADA',
            lote: 'LOTE-2024-001'
          }
        };
        
        try {
          const response = await axios.post(
            `${API_BASE_URL}/pedidos/callback/${numeroPedido}/${unidade.idMaquina}`,
            payload
          );
          
          console.log(`✅ Callback simulado para unidade ${unidade.idMaquina}`);
          console.log('Resposta:', response.data);
          
          // Aguardar um pouco entre callbacks
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (error) {
          console.error(`❌ Erro no callback para ${unidade.idMaquina}:`, error.response?.data || error.message);
        }
      }
    }
  }
}

async function testarConfirmarEntrega(numeroPedido) {
  console.log('\n🔵 TESTE 4: Confirmar Entrega');
  
  const payload = {
    codigoRastreamento: 'BR123456789BR',
    dadosEntrega: {
      entregador: 'João Silva',
      assinatura: 'assinatura_digital_base64',
      foto: 'foto_entrega_base64'
    }
  };
  
  // Token de autenticação do entregador (simulado)
  const headers = {
    'Authorization': 'Bearer entregador_token_teste'
  };
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/pedidos/${numeroPedido}/confirmar-entrega`,
      payload,
      { headers }
    );
    
    console.log('✅ Entrega confirmada com sucesso!');
    console.log('Resposta:', JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao confirmar entrega:', error.response?.data || error.message);
    return null;
  }
}

async function verificarEstoque() {
  console.log('\n🔵 TESTE 5: Verificar Estoque');
  
  const Produto = mongoose.model('Product');
  const produto = await Produto.findById(PRODUTO_TESTE_ID);
  
  if (produto) {
    console.log('📊 Status do Estoque:');
    console.log('  Estoque total:', produto.estoque);
    console.log('  Estoque reservado:', produto.estoqueReservado);
    console.log('  Estoque disponível:', produto.estoqueDisponivel);
    
    if (produto.estoqueReservado === 0 && produto.estoque === 98) { // 100 - 2
      console.log('✅ Estoque liberado corretamente!');
    } else {
      console.log('⚠️  Verifique o estoque - pode haver problema na liberação');
    }
  }
}

async function fluxoCompletoTeste() {
  console.log('🚀 INICIANDO TESTE COMPLETO DO SISTEMA DE PEDIDOS');
  console.log('=' .repeat(50));
  
  try {
    // 1. Configuração
    await conectarMongoDB();
    await limparDadosTeste();
    await criarProdutoTeste();
    
    // 2. Criar pedido
    const pedidoCriado = await testarCriacaoPedido();
    if (!pedidoCriado) {
      console.error('❌ Teste interrompido: falha ao criar pedido');
      return;
    }
    
    const numeroPedido = pedidoCriado.numeroPedido;
    console.log(`📦 Pedido criado: ${numeroPedido}`);
    
    // Aguardar para ver callback de criação
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 3. Rastrear pedido (deve estar EM_PRODUCAO)
    await testarRastreamento(numeroPedido);
    
    // 4. Simular callbacks das máquinas
    await simularCallbackProducao(numeroPedido);
    
    // Aguardar processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 5. Rastrear novamente (deve estar PRODUZIDO)
    console.log('\n🔄 Verificando status após produção...');
    await testarRastreamento(numeroPedido);
    
    // 6. Confirmar entrega
    await testarConfirmarEntrega(numeroPedido);
    
    // 7. Verificar estoque
    await verificarEstoque();
    
    // 8. Rastrear final (deve estar ENTREGUE)
    console.log('\n🏁 Verificando status final...');
    await testarRastreamento(numeroPedido);
    
    console.log('\n🎉 TESTE COMPLETADO COM SUCESSO!');
    console.log('=' .repeat(50));
    
  } catch (error) {
    console.error('\n💥 ERRO NO TESTE:', error);
  } finally {
    // Fechar conexões
    await mongoose.disconnect();
    callbackServer.close();
    console.log('🔌 Conexões encerradas');
  }
}

// Executar teste
fluxoCompletoTeste();