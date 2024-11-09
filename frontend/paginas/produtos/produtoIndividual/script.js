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
  if (window.scrollY > 50) {
    // Ajuste o valor conforme necessário
    nav.style.top = "0"; // Fixa o nav no topo quando rola para baixo
  } else {
    nav.style.top = "40px"; // Retorna ao deslocamento inicial
  }
});

window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    // Ajuste o valor conforme necessário
    nav.classList.add("scrolled"); // Adiciona a classe quando rola para baixo
  } else {
    nav.classList.remove("scrolled"); // Remove a classe quando rola para cima
  }
});

window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  const logo = document.getElementById("logo");

  if (window.scrollY > 50) {
    // Ajuste o valor conforme necessário
    nav.classList.add("scrolled"); // Adiciona a classe quando rola para baixo
    logo.src = "../../img/logopreta.png"; // Altera para a imagem preta
  } else {
    nav.classList.remove("scrolled"); // Remove a classe quando rola para cima
    logo.src = "../../img/logobranca.png"; // Retorna à imagem branca
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










const urlParams = new URLSearchParams(window.location.search);
const produtoId = urlParams.get("id");

// Verifica se o ID do produto foi passado na URL
if (produtoId) {
  fetch(`http://localhost:3000/camisas/${produtoId}`)
    .then((response) => response.json())
    .then((data) => {
      // Preenche os dados na página
      document.querySelector(".produto-imagem").src = data.img;
      document.querySelector(".produto-nome").textContent = data.nome;
      document.querySelector(".produto-descricao").textContent = data.descricao;
      document.querySelector(".produto-cor").textContent = `Cor: ${data.cor}`;
      document.querySelector(".preco").textContent = `R$ ${data.preco}`;

      // Criação dos botões de tamanho
      const tamanhosContainer = document.getElementById("tamanhos-container");
      const tamanhosDisponiveis = data.tamanhos_disponiveis.split(",");
      let tamanhoSelecionado = ""; // Para armazenar o tamanho escolhido

      tamanhosDisponiveis.forEach((tamanho) => {
        const button = document.createElement("button");
        button.textContent = tamanho.trim();
        button.classList.add("tamanho-btn");

        // Adiciona evento de clique para selecionar o tamanho
        button.addEventListener("click", () => {
          // Remove a classe 'active' de todos os botões
          document.querySelectorAll(".tamanho-btn").forEach((btn) => {
            btn.classList.remove("active");
          });

          // Adiciona a classe 'active' ao botão clicado
          button.classList.add("active");
          tamanhoSelecionado = tamanho.trim(); // Define o tamanho selecionado
        });

        tamanhosContainer.appendChild(button);
      });

      // Adiciona evento ao botão de comprar
      document.querySelector(".comprar-btn").addEventListener("click", () => {
        if (!tamanhoSelecionado) {
          alert("Por favor, selecione um tamanho.");
          return;
        }

        // Dados do produto para armazenar
        const produtoCarrinho = {
          id: data.id,
          nome: data.nome,
          descricao: data.descricao,
          cor: data.cor,
          preco: data.preco,
          img: data.img,
          tamanho: tamanhoSelecionado,
        };

        // Armazena no localStorage
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinho.push(produtoCarrinho);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        // Redireciona para a página de carrinho
        window.location.href = "../../../paginas/carrinho/carrinho.html";
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar o produto:", error);
      alert("Produto não encontrado ou erro na requisição.");
    });
}

