
// FETCH DAS BOX BANCO DE DADOS

fetch('https://styleinfocusbackend.onrender.com/camisas')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na resposta da rede');
    }
    return response.json();
  })
  .then(data => {
    const camisas = data;

    // Seleciona a div onde as camisas serão exibidas
    const container = document.getElementById('produtos-camisas');

    // Para cada camisa, exibe o conteúdo
    camisas.forEach(camisa => {
      // Converte o preço de texto para número
      const precoOriginal = parseFloat(camisa.preco);

      // Calcula o preço com desconto de 20% (Pix)
      const precoComDesconto = precoOriginal * 0.90;

      // Formata os preços para o formato brasileiro (com vírgula)
      const precoComDescontoFormatado = precoComDesconto.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' });

      // Cria a div para a camisa
      const camisaDiv = document.createElement('div');
      camisaDiv.classList.add('box');

      // Adiciona o conteúdo da camisa
      camisaDiv.innerHTML = `
          <img src="${camisa.img}" alt="${camisa.nome}" class="camisa-img" />
          <h1>${camisa.nome}</h1>
          <h2>R$ ${camisa.preco}</h2>
          <h3>${precoComDescontoFormatado} no PIX</h3>
          <button onclick="window.location.href = '../produtoIndividual/paginaProdutoCamisa.html?id=${camisa.id}'">Comprar</button>
      `;

      // Adiciona a div ao container
      container.appendChild(camisaDiv);
    });
  })
  .catch(error => console.error('Erro ao buscar dados:', error));

















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
    fetch('https://styleinfocusbackend.onrender.com/auth/api/user', {
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
                ? `https://styleinfocusbackend.onrender.com/${data.profile_image}` 
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













