// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find(item => item.id === produto.id);

    if (produtoExistente) {
        // Se o produto já estiver no carrinho, apenas aumente a quantidade
        produtoExistente.quantidade += 1;
    } else {
        // Se o produto não estiver no carrinho, adicione com quantidade 1
        produto.quantidade = 1;
        carrinho.push(produto);
    }

    // Armazenar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Recarregar o carrinho na página
    carregarCarrinho();
}

// Função para carregar os itens do carrinho
function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    let total = 0;

    // Limpa o carrinho atual
    cartItemsContainer.innerHTML = '';

    // Cria os elementos para cada produto no carrinho
    carrinho.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="item-info">
                <h3>${item.nome}</h3>
                <p>R$ ${item.preco.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button onclick="alterarQuantidade(${index}, -1)">-</button>
                    <span id="quantidade-${index}">${item.quantidade}</span>
                    <button onclick="alterarQuantidade(${index}, 1)">+</button>
                </div>
            </div>
            <button onclick="removerItem(${index})">Remover</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.preco * item.quantidade;
    });

    // Calcular e exibir o total e frete
    const frete = total > 200 ? 0 : 15; // Frete grátis acima de R$ 200
    const totalFinal = total + frete;

    document.getElementById('total-price').innerText = `R$ ${total.toFixed(2)}`;
    document.getElementById('frete-price').innerText = `R$ ${frete.toFixed(2)}`;
    document.getElementById('final-price').innerText = `R$ ${totalFinal.toFixed(2)}`;

    // Habilitar ou desabilitar o botão de checkout
    document.getElementById('checkout-btn').disabled = carrinho.length === 0;
}

// Função para alterar a quantidade do item no carrinho
function alterarQuantidade(index, delta) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const item = carrinho[index];

    // Atualiza a quantidade
    item.quantidade += delta;

    // Evita quantidade negativa
    if (item.quantidade < 1) {
        item.quantidade = 1;
    }

    // Atualiza o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza a quantidade na tela
    document.getElementById(`quantidade-${index}`).innerText = item.quantidade;

    // Recalcula o carrinho
    carregarCarrinho();
}

// Função para remover item do carrinho
function removerItem(index) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1); // Remove o item pelo índice
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o carrinho no localStorage
    carregarCarrinho(); // Recarrega o carrinho
}

// Inicializa o carrinho ao carregar a página
window.onload = carregarCarrinho;
