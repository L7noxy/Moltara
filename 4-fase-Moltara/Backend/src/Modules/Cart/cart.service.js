import cartRepository from "./cart.repository.js";
import { productRepository } from "../Product/product.repository.js";

// Função auxiliar interna para calcular total
const calcularTotalCarrinho = async (cartItems) => {
  let total = 0;
  for (const item of cartItems) {
    const product = await productRepository.findById(item.produto);
    if (product) {
      total += product.preco * item.quantidade;
    }
  }
  return total;
};

const cartService = {
  pegarCarrinho: async (userId) => {
    const cart = await cartRepository.findCartByUserId(userId);
    if (cart) return cart;
    
    // Se não existir, cria um vazio com total 0
    return await cartRepository.createCart(userId);
  },

  adicionarProduto: async (userId, productId, quantity) => {
    const cart = await cartService.pegarCarrinho(userId);
    
    const product = await productRepository.findById(productId);
    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    // 2. Procura item usando o nome correto do Schema: 'produto'
    console.log("Procurando produto ID:", productId);
    console.log("Itens no carrinho:", cart.items.map(i => ({ id: i.produto._id || i.produto, qtd: i.quantidade })));

    const existingItem = cart.items.find(
      (item) => (item.produto._id || item.produto).toString() === productId
    );

    console.log("Item existente encontrado?", !!existingItem);

    // 3. Atualiza quantidade ou dá push usando nomes do Schema ('produto', 'quantidade')
    if (existingItem) {
      console.log("Atualizando quantidade. Antes:", existingItem.quantidade, "Adicionar:", quantity);
      existingItem.quantidade += quantity;
    } else {
      console.log("Adicionando novo item.");
      cart.items.push({ produto: productId, quantidade: quantity });
    }

    // 4. IMPORTANTE: Recalcular o total antes de salvar (pois é required no Schema)
    cart.total = await calcularTotalCarrinho(cart.items);

    return await cartRepository.updateCart(cart);
  },

  removerProduto: async (userId, productId) => {
    const cart = await cartService.pegarCarrinho(userId);

    // Filtra usando 'produto'
    cart.items = cart.items.filter(
      (item) => (item.produto._id || item.produto).toString() !== productId
    );

    // Recalcula total
    cart.total = await calcularTotalCarrinho(cart.items);

    return await cartRepository.updateCart(cart);
  }
};

// Exporta o objeto inteiro para funcionar com o seu Controller
export default cartService;