// Função para carregar os itens do carrinho
function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  let total = 0;

  // Limpa o carrinho atual
  cartItemsContainer.innerHTML = "";
}

// Função para alterar a quantidade do item no carrinho
function alterarQuantidade(index, delta) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const item = carrinho[index];

  // Atualiza a quantidade
  item.quantidade += delta;

  // Evita quantidade negativa
  if (item.quantidade < 1) {
    item.quantidade = 1;
  }

  // Atualiza o carrinho no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Atualiza a quantidade na tela
  document.getElementById(`quantidade-${index}`).innerText = item.quantidade;

  // Recalcula o carrinho
  carregarCarrinho();
}

// Função para remover item do carrinho
function removerItem(index) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1); // Remove o item pelo índice
  localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Atualiza o carrinho no localStorage
  carregarCarrinho(); // Recarrega o carrinho
}

// Inicializa o carrinho ao carregar a página
window.onload = carregarCarrinho;

function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  const arrow = dropdown.previousElementSibling.querySelector(".arrow");

  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
    arrow.classList.remove("up");
  } else {
    dropdown.style.display = "block";
    arrow.classList.add("up");
  }
}

function carregarCarrinho() {
  const carrinhoItens = document.getElementById("carrinho-itens");
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Para armazenar os produtos únicos e somar quantidades quando necessário
  const produtosAgrupados = {};

  // Agrupando produtos iguais e respeitando a quantidade salva
  carrinho.forEach((produto) => {
    const key = `${produto.id}-${produto.tamanho}`; // Chave única baseada no ID e Tamanho

    if (produtosAgrupados[key]) {
      // Se o produto já existe, incrementa a quantidade com base no valor salvo
      produtosAgrupados[key].quantidade += produto.quantidade;
    } else {
      // Se não existe, adiciona ao agrupamento
      produtosAgrupados[key] = { ...produto };
    }
  });

  // Limpa a div antes de exibir os itens
  carrinhoItens.innerHTML = "";

  let totalFinal = 0;

  // Exibindo os produtos agrupados
  for (const key in produtosAgrupados) {
    const produto = produtosAgrupados[key];

    produto.preco = parseFloat(produto.preco) || 0;

    precoTotal = produto.preco * produto.quantidade;

    totalFinal += precoTotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("carrinho-item");

    itemDiv.innerHTML = `
      <div class="produto">
        <div class="produtoImg">
          <img src="${produto.img}" alt="${produto.nome}"/ style="height: 170px; width: 160px; border-radius: 2px;">
        </div>
        <div class="produtoInfo">
          <h2>${produto.nome}</h2>
          <p>Tamanho: ${produto.tamanho}</p>
          <p>Quantidade: <span class="carrinho-quantidade">${
          produto.quantidade
          }</span></p>
          <p>Preço: R$ ${precoTotal.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          })}</p>
        </div>
      </div>
    `;

    carrinhoItens.appendChild(itemDiv);
  }
  const finalPriceElement = document.getElementById("final-price");
  finalPriceElement.textContent = `R$ ${totalFinal.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// Verificar se há itens no carrinho e ir para Identificação
function irParaIdentificacao() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio. Adicione itens para continuar.");
    return;
  }

  // Atualizar o progresso
  document.getElementById("step-1").classList.add("completed");
  document.getElementById("step-2").classList.add("completed");

  // Mostrar seção de Identificação e esconder Carrinho
  document.getElementById("section-carrinho").style.display = "none";
  document.getElementById("section-identificacao").style.display = "block";
}

// Coletar informações e ir para Pagamento
function irParaPagamento() {
  const rua = document.getElementById("rua").value;
  const numero = document.getElementById("numero").value;
  const cidade = document.getElementById("cidade").value;

  if (!rua || !numero || !cidade) {
    alert("Por favor, preencha todas as informações.");
    return;
  }

  // Salvar dados do usuário (opcional)
  const endereco = { rua, numero, cidade };
  localStorage.setItem("endereco", JSON.stringify(endereco));

  // Atualizar o progresso
  document.getElementById("step-2").classList.add("completed");
  document.getElementById("step-3").classList.add("completed");

  // Mostrar seção de Pagamento e esconder Identificação
  document.getElementById("section-identificacao").style.display = "none";
  document.getElementById("section-pagamento").style.display = "block";
}

// Função para finalizar compra (simplesmente limpando o carrinho por enquanto)
function finalizarCompra() {
  showNotification("Compra finalizada! Limpando o carrinho...");
  localStorage.removeItem("carrinho");
  carregarCarrinho(); // Atualiza o carrinho após limpar
}

// Carregar o carrinho ao abrir a página
document.addEventListener("DOMContentLoaded", carregarCarrinho);

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;

  // Adiciona a classe 'show' para exibir a notificação
  notification.classList.add("show");

  // Remove a notificação após 3 segundos
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}
