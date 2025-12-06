import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantidade: {
        type: Number,
        required: true,
    },
    
    itemIdMaquina: { 
        type: String, 
        unique: true, 
        sparse: true, 
        index: true 
    },
    statusProducao: { 
        type: String, 
        enum: ['AGUARDANDO', 'ENVIADO', 'EM_PRODUCAO', 'PRONTO', 'FALHA'],
        default: 'AGUARDANDO' 
    },
    slotExpedicao: { 
        type: String, 
        default: null 
    }, 
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    items: [orderItemSchema],
    total: {
        type: Number,
        required: true,
    },
    statusPedido: { 
        type: String,
        enum: ["RECEBIDO", "PRODUCAO_EM_ANDAMENTO", "CONCLUIDO", "CANCELADO"],
        default: "RECEBIDO",
    },
}, {
    timestamps: true
});

export default mongoose.model("Order", orderSchema);