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

// Modal de confirmação de remoção (opcional)
let itemToRemove = null;

document.getElementById("remove-modal").style.display = "none";
document.getElementById("confirm-remove").onclick = () => {
  if (itemToRemove !== null) {
    removerItem(itemToRemove);
  }
  document.getElementById("remove-modal").style.display = "none";
};
document.getElementById("cancel-remove").onclick = () => {
  document.getElementById("remove-modal").style.display = "none";
};

document.getElementById("profile-icon").onclick = function () {
  document.getElementById("sidebar").style.width = "350px";
  document.getElementById("overlay").style.width = "100%";
};

document.querySelector(".close-btn").onclick = function () {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("overlay").style.width = "0";
};

document.getElementById("overlay").onclick = function () {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("overlay").style.width = "0";
};

function openLeftSidebar() {
  document.getElementById("leftSidebar").style.width = "380px";
}

function closeLeftSidebar() {
  document.getElementById("leftSidebar").style.width = "0";
}

// Fechar o sidebar ao clicar fora dele
document.addEventListener("click", function (event) {
  var sidebar = document.getElementById("leftSidebar");
  var btn = document.querySelector(".btn-filtrar");
  if (
    sidebar.style.width === "380px" &&
    !sidebar.contains(event.target) &&
    event.target !== btn
  ) {
    closeLeftSidebar();
  }
});

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

function toggleColor(color) {
  const button = document.querySelector(`.color-button[style*="${color}"]`);
  if (button.classList.contains("selected")) {
    button.classList.remove("selected");
  } else {
    button.classList.add("selected");
  }
}
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  const logo = document.getElementById("logo");

  if (window.scrollY > 50) {
    // Ajuste o valor conforme necessário
    nav.style.top = "0"; // Fixa o nav no topo quando rola para baixo
    nav.classList.add("scrolled"); // Adiciona a classe quando rola para baixo
    logo.src = "../../img/logopreta.png"; // Altera para a imagem preta
  } else {
    nav.style.top = "40px"; // Retorna ao deslocamento inicial
    nav.classList.remove("scrolled"); // Remove a classe quando rola para cima
    logo.src = "../../img/logob.png"; // Retorna à imagem branca
  }
});





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
      <img src="${produto.img}" alt="${produto.nome}" />
      <div>
        <h3>${produto.nome}</h3>
        <p>Tamanho: ${produto.tamanho}</p>
        <p>Quantidade: <span class="carrinho-quantidade">${
          produto.quantidade
        }</span></p>
        <p>Preço: R$ ${precoTotal.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}</p>
      </div>
    `;

    carrinhoItens.appendChild(itemDiv);
  }
  console.log(totalFinal);
  const finalPriceElement = document.getElementById("final-price");
  finalPriceElement.textContent = `R$ ${totalFinal.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
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
