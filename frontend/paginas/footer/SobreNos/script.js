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
document.addEventListener('click', function(event) {
  var sidebar = document.getElementById('leftSidebar');
  var btn = document.querySelector('.btn-filtrar');
  if (sidebar.style.width === "380px" && !sidebar.contains(event.target) && event.target !== btn) {
      closeLeftSidebar();
  }
});

function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  const arrow = dropdown.previousElementSibling.querySelector('.arrow');
  
  if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
      arrow.classList.remove('up');
  } else {
      dropdown.style.display = 'block';
      arrow.classList.add('up');
  }
}

function toggleColor(color) {
  const button = document.querySelector(`.color-button[style*="${color}"]`);
  if (button.classList.contains('selected')) {
      button.classList.remove('selected');
  } else {
      button.classList.add('selected');
  }
}

window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) { // Ajuste o valor conforme necessário
    nav.style.top = '0'; // Fixa o nav no topo quando rola para baixo
  } else {
    nav.style.top = '40px'; // Retorna ao deslocamento inicial
  }
});


window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) { // Ajuste o valor conforme necessário
    nav.classList.add('scrolled'); // Adiciona a classe quando rola para baixo
  } else {
    nav.classList.remove('scrolled'); // Remove a classe quando rola para cima
  }
});

window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  const logo = document.getElementById('logo');

  if (window.scrollY > 50) { // Ajuste o valor conforme necessário
    nav.classList.add('scrolled'); // Adiciona a classe quando rola para baixo
    logo.src = '../../../img/logopreta.png'; // Altera para a imagem preta
  } else {
    nav.classList.remove('scrolled'); // Remove a classe quando rola para cima
    logo.src = '../../../img/logopreta.png'; // Retorna à imagem branca
  }
});

window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) { // Ajuste o valor conforme necessário
    nav.classList.add('scrolled'); // Adiciona a classe quando rola para baixo
  } else {
    nav.classList.remove('scrolled'); // Remove a classe quando rola para cima
  }
});

window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) { // Ajuste o valor conforme necessário
    nav.classList.add('scrolled'); // Adiciona a classe quando rola para baixo
  } else {
    nav.classList.remove('scrolled'); // Remove a classe quando rola para cima
  }
});



                                                                                //SLIDE TEXT
                                                                                
document.addEventListener('DOMContentLoaded', function() {

let currentSlide = 0;
const slideInterval = 3000; // Intervalo de 3 segundos para troca de slides

function nextSlide() {
  const slides = document.querySelector('.slides-text');
  const totalSlides = slides.children.length;

  // Avançar para o próximo slide
  currentSlide = (currentSlide + 1) % totalSlides;

  // Atualizar a transformação do slide
  slides.style.transform = `translateY(-${currentSlide * 310}%)`;
}

function prevSlide() {
  const slides = document.querySelector('.slides-text');
  const totalSlides = slides.children.length;

  // Retroceder para o slide anterior
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;

  // Atualizar a transformação do slide
  slides.style.transform = `translateY(-${currentSlide * 310}%)`;
}

// Intervalo automático para troca de slides
setInterval(nextSlide, slideInterval);

// Funções para os botões
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);
});








                                                                    //CAROUSEL DESTAQUES



let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const itemsPerPage = 3;

const carousel = document.querySelector('.carousel');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

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

nextButton.addEventListener('click', showNext);
prevButton.addEventListener('click', showPrev);

setInterval(showNext, 8000); // Automatic slide every 3 seconds

// Initialize carousel
updateCarousel();

let currentSlide2 = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide-text-index');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentSlide2 = 0;
    } else if (index < 0) {
        currentSlide2 = totalSlides - 1;
    } else {
        currentSlide2 = index;
    }

    const newTransform = `translateX(${-currentSlide2 * 100}%)`;
    document.querySelector('.slides-text').style.transform = newTransform;
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

window.addEventListener('load', function() {
  document.getElementById('preloader').style.display = 'none';
});

// Código para exibir o preloader ao clicar em um link
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
      link.addEventListener('click', function(event) {
          if (!this.href.includes('#')) { // Evitar recarregar para links âncora
              document.getElementById('preloader').style.display = 'flex';
          }
      });
  });
});







                                             //Parte da Paginga de perfil 
function mostrarConteudo(tipo) {
  // Esconde todos os painéis
  const panels = document.querySelectorAll('.right-panel');
  panels.forEach(panel => panel.classList.remove('active'));

  // Mostra o painel correto
  const painelAtivo = document.getElementById(`conteudo-${tipo}`);
  if (painelAtivo) {
    painelAtivo.classList.add('active');
  }
}
//Parte de trocar a foto de usuario da Pagina de Perfil
const inputFoto = document.getElementById('inputFoto');
const fotoPerfil = document.getElementById('fotoPerfil');

window.onload = function() {
  const fotoArmazenada = localStorage.getItem('fotoPerfil');
  if (fotoArmazenada) {
      fotoPerfil.src = fotoArmazenada; // Atualiza a imagem do perfil
      fotoPerfilEmail.src = fotoArmazenada; // Atualiza a imagem do email
  }
};

inputFoto.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            fotoPerfil.src = event.target.result; 
            fotoPerfilEmail.src = event.target.result;
            localStorage.setItem('fotoPerfil', event.target.result);
        }
        reader.readAsDataURL(file); // Lê a imagem como URL
    }
});







function editarCampo(campo) {
  var textElement = document.getElementById(campo + 'Text');
  var valorAtual = textElement.textContent;

  // Substitui o texto atual por um campo de input
  textElement.innerHTML = `<input type='text' id='input-${campo}' value='${valorAtual}' />`;

  // Adiciona o listener para o evento de tecla (Enter)
  var inputElement = document.getElementById('input-' + campo);
  inputElement.focus(); // Coloca o foco no input automaticamente
  inputElement.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          salvarCampo(campo);
      }
  });
}

function salvarCampo(campo) {
  var inputElement = document.getElementById('input-' + campo);
  var novoValor = inputElement.value.trim(); // Remove espaços em branco

  // Verifica se o campo está vazio
  if (novoValor === "") {
      alert("O campo não pode ficar vazio. Por favor, insira um valor."); // Mensagem de erro
      // Volta o campo de input para o valor anterior
      var textElement = document.getElementById(campo + 'Text');
      inputElement.value = textElement.textContent; // Restaura o valor anterior
      return; // Interrompe a função
  }

  // Substitui o input pelo novo valor de texto
  var textElement = document.getElementById(campo + 'Text');
  textElement.textContent = novoValor;

  // Atualiza o nome ou email dependendo do campo editado
  if (campo === 'nome') {
      atualizarNome(novoValor);
  } else if (campo === 'email') {
      atualizarEmail(novoValor);
  }
}
function atualizarNome(novoNome) {
  // Seleciona todos os elementos com a classe "nomeUsuario"
  var nomes = document.querySelectorAll('.nomeUsuario');

  // Atualiza o texto de cada elemento
  nomes.forEach(function(nome) {
      nome.textContent = novoNome;
  });
}

function atualizarEmail(novoEmail) {
  // Seleciona todos os elementos com a classe "emailUsuario"
  var emails = document.querySelectorAll('.emailUsuario');

  // Atualiza o texto de cada elemento
  emails.forEach(function(email) {
      email.textContent = novoEmail;
  });
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
        loginTextElement.href = "../../login/login.html";

        registerTextElement.textContent = "CADASTRE-SE";
        registerTextElement.href = "../../login/register.html";

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
                registerTextElement.href = "../../minhaConta/profile.html"; // Link para a página de perfil

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
