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
    logo.src = "../../../img/logopreta.png"; // Altera para a imagem preta
  } else {
    nav.classList.remove("scrolled"); // Remove a classe quando rola para cima
    logo.src = "../../../img/logopreta.png"; // Retorna à imagem branca
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
  fetch(`https://styleinfocusbackend.onrender.com/camisas/${produtoId}`)
    .then((response) => response.json())
    .then((data) => {
      const precoOriginal = parseFloat(data.preco);

      const precoComDesconto = precoOriginal * 0.9;

      // Formata os preços para o formato brasileiro (com vírgula)

      const precoComDescontoFormatado = precoComDesconto.toLocaleString(
        "pt-BR",
        { style: "currency", currency: "BRL" }
      );

      console.log(precoComDescontoFormatado);
      // Preenche os dados na página
      document.querySelector(".produto-imagem").src = data.img;
      document.querySelector(".produto-nome").textContent = data.nome;
      document.querySelector(".produto-name").textContent = data.nome;
      document.querySelector(".produto-descricao").textContent = data.descricao;
      document.querySelector(".preco").textContent = `R$ ${data.preco}`;

      document.querySelector(
        ".precoComDesconto"
      ).textContent = `${precoComDescontoFormatado} no PIX`;

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
          mostrarMensagem("Por favor selecione um tamanho");
          return;
        }

        // Captura a quantidade escolhida pelo usuário
        const quantidadeInput = document.getElementById("quantidade-input");
        const quantidade = parseInt(quantidadeInput.value);

        // Dados do produto para armazenar
        const produtoCarrinho = {
          id: data.id,
          nome: data.nome,
          descricao: data.descricao,
          cor: data.cor,
          preco: data.preco,
          img: data.img,
          tamanho: tamanhoSelecionado,
          quantidade: quantidade, // Adiciona a quantidade ao objeto
        };

        // Armazena no localStorage
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinho.push(produtoCarrinho);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        // Exibe um alerta de confirmação
        mostrarMensagem("Produto adicionado ao carrinho com sucesso!");
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar o produto:", error);
      mostrarMensagemErro("produto não encontrado ou erro na requisição.");
    });
}

const incrementarBtn = document.getElementById("incrementar-btn");
const decrementarBtn = document.getElementById("decrementar-btn");
const quantidadeInput = document.getElementById("quantidade-input");

incrementarBtn.addEventListener("click", () => {
  let quantidade = parseInt(quantidadeInput.value);
  quantidadeInput.value = quantidade + 1;
});

decrementarBtn.addEventListener("click", () => {
  let quantidade = parseInt(quantidadeInput.value);
  if (quantidade > 1) {
    quantidadeInput.value = quantidade - 1;
  }
});

// Captura o botão de calcular frete e o input de CEP
const calcularFreteBtn = document.getElementById("calcular-frete-btn");
const cepDestinoInput = document.getElementById("cep-destino");
const resultadoFrete = document.getElementById("resultadoFrete");

// Função para enviar o CEP e calcular o frete
calcularFreteBtn.addEventListener("click", async () => {
  const cepDestino = cepDestinoInput.value.trim();

  if (cepDestino.length !== 8) {
    mostrarMensagemErro("insira um CEP para fazer o calculo!");
    return;
  }

  try {
    // Envia a requisição para o back-end
    const response = await fetch(
      "https://styleinfocusbackend.onrender.com/frete/calcular-frete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cepDestino }),
      }
    );

    const data = await response.json();
    console.log(data); // Verifique o que está sendo retornado

    if (data.error) {
      resultadoFrete.textContent = `Erro: ${data.error}`;
    } else {
      // Exibe até 3 opções de frete, considerando a estrutura correta dos dados
      if (data.length > 0) {
        let htmlContent = "";

        // Limita a 3 opções de frete e filtra os dados para exibir apenas aqueles que têm preço e prazo
        data.slice(0, 3).forEach((service) => {
          if (service.price && service.time) {
            // Verifica se as informações essenciais estão presentes

            let precoFormatado = service.price.toString().replace(".", ",");

            htmlContent += `
              <div class="frete-container">
                <div class="repostaDb-frete">
                    <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                      <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                    </svg></a>
                    <div class="box-infotransporte">
                      <div class="infoTransporte">
                        <p>${service.company}</p>
                        <p>${service.name}</p>
                        <p>Prazo da Entrega - ${service.time} dias uteis</p>
                      </div>
                      <div class="precoFrete">
                        R$${precoFormatado}
                      </div>
                    </div>
                </div>
              </div>
            `;
          }
        });

        // Exibe as opções de frete
        resultadoFrete.innerHTML = htmlContent;
      } else {
        resultadoFrete.textContent = "Nenhum serviço disponível para este CEP.";
      }
    }
  } catch (error) {
    resultadoFrete.textContent =
      "Erro ao calcular o frete. Tente novamente mais tarde.";
  }
});

// Função para carregar os comentários do produto
function carregarComentarios() {
  fetch(
    `https://styleinfocusbackend.onrender.com/api/roupas/${produtoId}/comentarios`
  )
    .then((response) => response.json())
    .then((comentarios) => {
      const listaComentarios = document.getElementById("lista-comentarios");
      listaComentarios.innerHTML = ""; // Limpa os comentários atuais

      if (comentarios.length === 0) {
        listaComentarios.innerHTML = "<p>Seja o primeiro a comentar!</p>";
        return;
      }

      // Exibir os comentários
      comentarios.forEach((comentario) => {
        const divComentario = document.createElement("div");
        divComentario.classList.add("comentario-item");

        // Formatando a data
        const dataCriacao = new Date(comentario.data_criacao); // Criando o objeto Date
        const dataFormatada = dataCriacao.toLocaleString("pt-BR", {
          year: "numeric", // Ano completo (ex: "2024")
          month: "long", // Mês por extenso (ex: "novembro")
          day: "numeric", // Dia do mês (ex: "10")
        });

        // Atualizando o conteúdo com a data formatada
        divComentario.innerHTML = `
          <div class="container-comentarios">
            <h3>${comentario.titulocomentario}</h3>
            <p>${comentario.nome} - ${dataFormatada}</p>
            <p>"${comentario.comentario}"</p>
            <p>Recomendaria esse item? <strong>${comentario.recomenda}</strong></p>
          </div>
        `;
        listaComentarios.appendChild(divComentario);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar comentários:", error);
    });
}

// Carregar os comentários ao abrir a página
carregarComentarios();

// Função para abrir a modal
document.getElementById("btn-fazer-avaliacao").addEventListener("click", () => {
  document.getElementById("modal-comentario").style.display = "flex"; // Exibe a modal
});

// Função para fechar a modal
document.getElementById("fechar-modal").addEventListener("click", () => {
  document.getElementById("modal-comentario").style.display = "none"; // Oculta a modal
});

// Função para exibir a mensagem de sucesso e depois fechar o modal e a mensagem
function mostrarMensagemSucesso() {
  const mensagem = document.getElementById("mensagem-sucesso");
  const modal = document.getElementById("modal-comentario");

  // Exibe a mensagem de sucesso
  mensagem.classList.add("mostrar");

  // Espera 3 segundos antes de fechar o modal
  setTimeout(() => {
    modal.style.display = "none"; // Fecha o modal após 3 segundos
  }, 6000); // 3000ms = 3 segundos

  // Espera mais 3 segundos para remover a mensagem
  setTimeout(() => {
    mensagem.classList.remove("mostrar"); // Remove a classe para esconder a mensagem
  }, 5000); // 5000ms = 5 segundos
}

// Função para enviar o comentário
document
  .getElementById("comentario-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const titulocomentario = document
      .getElementById("titulocomentario")
      .value.trim();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const textoComentario = document
      .getElementById("comentario-texto")
      .value.trim();
    const recomenda = document.querySelector(
      'input[name="recomenda"]:checked'
    )?.value;
    if (!nome || !email || !textoComentario) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoComentario = {
      produtoId,
      nome,
      email,
      comentario: textoComentario,
      titulocomentario,
      recomenda,
    };

    // Enviar comentário ao backend
    fetch(
      `https://styleinfocusbackend.onrender.com/api/roupas/${produtoId}/comentarios`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoComentario),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        mostrarMensagemSucesso("Comentário enviado com sucesso!");
        carregarComentarios(); // Recarregar lista de comentários
        document.getElementById("comentario-form").reset(); // Limpar formulário
        document.getElementById("modal-comentario").style.display = "none"; // Fechar a modal
      })
      .catch((error) => {
        console.error("Erro ao enviar comentário:", error);
        alert("Erro ao enviar comentário. Tente novamente mais tarde.");
      });
  });

//funçao de mostrar mais ou menos comentarios
document.getElementById("btn-ver-mais").addEventListener("click", function () {
  let comentariosOcultos = document.querySelectorAll(
    "#lista-comentarios .comentario-item:nth-child(n+4)"
  );
  const botao = document.getElementById("btn-ver-mais");

  // Verifica se os comentários extras estão visíveis
  if (
    comentariosOcultos[0].style.display === "none" ||
    comentariosOcultos[0].style.display === ""
  ) {
    // Exibe os comentários ocultos
    comentariosOcultos.forEach((comentario) => {
      comentario.style.display = "block"; // Exibe os comentários ocultos
    });
    botao.innerHTML =
      'Ver Menos <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/></svg>'; // Muda o texto do botão e adiciona o ícone
  } else {
    // Esconde os comentários extras novamente
    comentariosOcultos.forEach((comentario) => {
      comentario.style.display = "none"; // Esconde os comentários extras
    });
    botao.innerHTML =
      'Ver Mais <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/></svg>'; // Muda o texto do botão e adiciona o ícone
  }
});

// Função para exibir a mensagem de sucesso
function mostrarMensagem(mensagem) {
  const mensagemElemento = document.getElementById("mensagem-sucesso");
  const textoMensagem = document.getElementById("mensagem-texto");

  // Atualiza o texto da mensagem
  textoMensagem.textContent = mensagem;

  // Mostra a mensagem
  mensagemElemento.classList.add("mostrar");

  // Fechar a mensagem após 4 segundos
  setTimeout(() => {
    mensagemElemento.classList.remove("mostrar");
  }, 4000); // 4000ms = 4 segundos
}

function mostrarMensagemErro(mensagem) {
  const mensagemElemento = document.getElementById("mensagem-erro");
  const textoMensagem = document.getElementById("mensagem-text");

  // Atualiza o texto da mensagem
  textoMensagem.textContent = mensagem;

  // Mostra a mensagem
  mensagemElemento.classList.add("mostrar");

  // Fechar a mensagem após 4 segundos
  setTimeout(() => {
    mensagemElemento.classList.remove("mostrar");
  }, 4000); // 4000ms = 4 segundos
}



 
const token = localStorage.getItem('token'); // Obtém o token de autenticação

function carregarPerfilUsuario() {
    const profileImageElement = document.getElementById('profile-image');
    const profileSvgElement = document.getElementById('profile-svg');
    const loginTextElement = document.getElementById('login-text');
    const registerTextElement = document.getElementById('register-text');
    const separatorElement = document.getElementById('separator');

    if (!token) {
        // Usuário não está logado
        console.log("Usuário não autenticado.");
        
        // Exibe o SVG
        profileImageElement.style.display = "none";
        profileSvgElement.style.display = "block";

        // Mantém os textos padrão
        loginTextElement.textContent = "ENTRE";
        loginTextElement.href = "../../../paginas/login/login.html";

        registerTextElement.textContent = "CADASTRE-SE";
        registerTextElement.href = "../../../paginas/login/register.html";

        separatorElement.style.display = "inline"; // Exibe "OU"
        return;
    }

    // Se o token existe, tenta buscar os dados do usuário
    fetch('http://localhost:3000/auth/api/user', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados do usuário');
            }
            return response.json();
        })
        .then(data => {
            // Define a imagem de perfil (usa o padrão se não houver)
            const profileImage = data.profile_image 
                ? `http://localhost:3000/${data.profile_image}` 
                : null; // Não define imagem padrão se não existir no backend

            if (profileImage) {
                profileImageElement.src = profileImage;
                profileImageElement.style.display = "block";
                profileSvgElement.style.display = "none";
            } else {
                profileImageElement.style.display = "none";
                profileSvgElement.style.display = "block"; // Exibe o SVG se não houver imagem
            }

            // Atualiza os textos
            if (data.username) {
                loginTextElement.textContent = data.username; // Altera "ENTRE" para o nome do usuário
                loginTextElement.href = "#"; // Remove o link de login

                registerTextElement.textContent = "MINHA CONTA"; // Altera "CADASTRE-SE" para "MINHA CONTA"
                registerTextElement.href = "../../../paginas/minhaConta/profile.html"; // Link para a página de perfil

                separatorElement.style.display = "none"; // Remove "OU"
            } else {
                console.error("Nome de usuário não encontrado nos dados do servidor.");
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os dados do usuário:', error);

            // Em caso de erro, exibe o SVG
            profileImageElement.style.display = "none";
            profileSvgElement.style.display = "block";
        });
}

// Carrega os dados do usuário ao carregar a página
window.onload = carregarPerfilUsuario;

