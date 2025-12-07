// order.schema.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  // Identificação
  numeroPedido: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  
  // Itens do pedido
  items: [{
    produtoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    nomeProduto: String,
    quantidade: {
      type: Number,
      required: true,
      min: 1
    },
    precoUnitario: Number,
    statusProducao: {
      type: String,
      enum: ['PENDENTE', 'EM_PRODUCAO', 'PRODUZIDO', 'FALHA_ENVIO', 'CANCELADO'],
      default: 'PENDENTE'
    },
    itemIdMaquina: [String], // IDs retornados pela máquina
    unidades: [{ // Rastreamento individual por unidade
      idMaquina: String,
      status: String,
      callbackURL: String,
      dataEnvioProducao: Date,
      dataAtualizacao: Date,
      dataConclusao: Date,
      dadosMaquina: mongoose.Schema.Types.Mixed
    }]
  }],
  
  // Status geral
  status: {
    type: String,
    enum: ['PENDENTE', 'EM_PRODUCAO', 'PRODUZIDO', 'ENVIADO', 'ENTREGUE', 'CANCELADO'],
    default: 'PENDENTE'
  },
  
  // Produção
  producaoIniciada: Boolean,
  producaoConcluida: Boolean,
  dataProducaoConcluida: Date,
  
  // Callback do cliente
  callbackURL: String,
  
  // Estoque
  posicaoEstoqueReservada: Boolean,
  estoqueLiberado: Boolean,
  
  // Entrega
  codigoRastreamento: String,
  transportadora: String,
  dadosEntrega: mongoose.Schema.Types.Mixed,
  dataEnvio: Date,
  dataEntrega: Date,
  
  // Financeiro
  valorTotal: Number,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware para gerar número do pedido
orderSchema.pre('save', async function(next) {
  if (!this.numeroPedido) {
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const day = new Date().getDate().toString().padStart(2, '0');
    const count = await mongoose.model('Order').countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
      }
    });
    
    this.numeroPedido = `PED${year}${month}${day}${(count + 1).toString().padStart(4, '0')}`;
  }
  
  this.updatedAt = new Date();
  next();
});

// Índices para performance
orderSchema.index({ usuarioId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ 'items.produtoId': 1 });
orderSchema.index({ 'items.unidades.idMaquina': 1 });

export default mongoose.model('Order', orderSchema);