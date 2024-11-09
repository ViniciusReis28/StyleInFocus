// Função para carregar os itens do carrinho
function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  let total = 0;

  // Limpa o carrinho atual
  cartItemsContainer.innerHTML = "";

  // Cria os elementos para cada produto no carrinho
  carrinho.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="item-info">
                <h3>${item.nome}</h3>
                <p>R$ ${item.preco.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="button-cart" onclick="alterarQuantidade(${index}, -1)">-</button>
                    <span id="quantidade-${index}">${item.quantidade}</span>
                    <button class="button-cart" onclick="alterarQuantidade(${index}, 1)">+</button>
                </div>
            </div>
            <button class="button-cart" onclick="removerItem(${index})">Remover</button>
        `;
    cartItemsContainer.appendChild(itemElement);
    total += item.preco * item.quantidade;
  });

  // Calcular e exibir o total e frete
  const frete = total > 200 ? 0 : 15; // Frete grátis acima de R$ 200
  const totalFinal = total + frete;

  document.getElementById("total-price").innerText = `R$ ${total.toFixed(2)}`;
  document.getElementById("frete-price").innerText = `R$ ${frete.toFixed(2)}`;
  document.getElementById("final-price").innerText = `R$ ${totalFinal.toFixed(
    2
  )}`;

  // Habilitar ou desabilitar o botão de checkout
  document.getElementById("checkout-btn").disabled = carrinho.length === 0;
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

//SLIDE TEXT

document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slideInterval = 3000; // Intervalo de 3 segundos para troca de slides

  function nextSlide() {
    const slides = document.querySelector(".slides-text");
    const totalSlides = slides.children.length;

    // Avançar para o próximo slide
    currentSlide = (currentSlide + 1) % totalSlides;

    // Atualizar a transformação do slide
    slides.style.transform = `translateY(-${currentSlide * 310}%)`;
  }

  function prevSlide() {
    const slides = document.querySelector(".slides-text");
    const totalSlides = slides.children.length;

    // Retroceder para o slide anterior
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;

    // Atualizar a transformação do slide
    slides.style.transform = `translateY(-${currentSlide * 310}%)`;
  }

  // Intervalo automático para troca de slides
  setInterval(nextSlide, slideInterval);

  // Funções para os botões
  document.querySelector(".next").addEventListener("click", nextSlide);
  document.querySelector(".prev").addEventListener("click", prevSlide);
});

//CAROUSEL DESTAQUES

let currentIndex = 0;
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;
const itemsPerPage = 3;

const carousel = document.querySelector(".carousel");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

function updateCarousel() {
  const offset = -currentIndex * (100 / itemsPerPage);
  carousel.style.transform = `translateX(${offset}%)`;
}

function showNext() {
  if (currentIndex < Math.ceil(totalItems / itemsPerPage) - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
}

function showPrev() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = Math.ceil(totalItems / itemsPerPage) - 1;
  }
  updateCarousel();
}

nextButton.addEventListener("click", showNext);
prevButton.addEventListener("click", showPrev);

setInterval(showNext, 8000); // Automatic slide every 3 seconds

// Initialize carousel
updateCarousel();

let currentSlide2 = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".slide-text-index");
  const totalSlides = slides.length;

  if (index >= totalSlides) {
    currentSlide2 = 0;
  } else if (index < 0) {
    currentSlide2 = totalSlides - 1;
  } else {
    currentSlide2 = index;
  }

  const newTransform = `translateX(${-currentSlide2 * 100}%)`;
  document.querySelector(".slides-text").style.transform = newTransform;
}

function nextSlideText() {
  showSlide(currentSlide2 + 1);
}

function prevSlide() {
  showSlide(currentSlide2 - 1);
}

// Mostrar o primeiro slide
showSlide(currentSlide2);

// Função para auto-slide
function startAutoSlide() {
  setInterval(nextSlideText, 5000); // Muda de slide a cada 3 segundos
}

// Iniciar o auto-slide
startAutoSlide();

window.addEventListener("load", function () {
  document.getElementById("preloader").style.display = "none";
});

// Código para exibir o preloader ao clicar em um link
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      if (!this.href.includes("#")) {
        // Evitar recarregar para links âncora
        document.getElementById("preloader").style.display = "flex";
      }
    });
  });
});

function carregarCarrinho() {
  const carrinhoItens = document.getElementById("carrinho-itens");
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Para armazenar os produtos únicos e contar quantos iguais existem
  const produtosAgrupados = {};

  // Agrupando produtos iguais
  carrinho.forEach((produto) => {
    const key = `${produto.id}-${produto.tamanho}`; // Chave única baseada no ID e Tamanho

    if (produtosAgrupados[key]) {
      // Se o produto já existe, incrementa a quantidade
      produtosAgrupados[key].quantidade += 1;
    } else {
      // Se não existe, adiciona ao agrupamento
      produtosAgrupados[key] = { ...produto, quantidade: 1 };
    }
  });

  // Limpa a div antes de exibir os itens
  carrinhoItens.innerHTML = "";

  // Exibindo os produtos agrupados
  for (const key in produtosAgrupados) {
    const produto = produtosAgrupados[key];

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
    <p>Preço: R$ ${(produto.preco * produto.quantidade).toFixed(2)}</p>
  </div>
`;

    carrinhoItens.appendChild(itemDiv);
  }
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
