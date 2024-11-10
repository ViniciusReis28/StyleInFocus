
  // FETCH DAS BOX BANCO DE DADOS

  fetch('http://localhost:3000/camisas')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }
        return response.json();
    })
    .then(data => {
        // Acessa diretamente os dados das camisas
        const camisas = data;  // Aqui você pega os dados das camisas

        console.log('Camisas recebidas do banco:', camisas);

        // Seleciona a div onde as camisas serão exibidas
        const container = document.getElementById('produtos-camisas');

        // Para exibir cada camisa de forma mais detalhada
        camisas.forEach(camisa => {
            // Cria um elemento div para cada camisa
            const camisaDiv = document.createElement('div');
            camisaDiv.classList.add('box'); // Adiciona uma classe para estilização

            // Adiciona o conteúdo da camisa ao elemento div
            camisaDiv.innerHTML = `
                <h3>${camisa.nome}</h3>
                <p>Descrição: ${camisa.descricao}</p>
                <p>Cor: ${camisa.cor}</p>
                <p>Data Adicionado: ${new Date(camisa.data_adicionado).toLocaleDateString()}</p>
                <img src="${camisa.img}" alt="${camisa.nome}" class="camisa-img" />
                <button onclick="window.location.href = '../produtoIndividual/paginaProdutoCamisa.html?id=${camisa.id}'">Comprar</button>
            `;

            // Adiciona a div da camisa ao container
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

// Função para verificar se a imagem de perfil está disponível
function loadUserProfile() {
  fetch('/auth/check-session')
      .then(response => response.json())
      .then(data => {
          const profileImage = document.getElementById("profile-image");
          const profileSvg = document.getElementById("profile-svg");
          const profileTextDiv = document.querySelector(".profile-text");

          // Verifica se o usuário está autenticado
          if (data.isAuthenticated) {
              // Atualiza a imagem de perfil
              if (data.profileImagePath && data.profileImagePath !== "/login/uploads/usuarioDefault.jpg") {
                  profileImage.src = data.profileImagePath;
                  profileImage.style.display = "block";
                  profileSvg.style.display = "none";
              } else {
                  profileImage.style.display = "none";
                  profileSvg.style.display = "block";
              }

              // Atualiza o texto de perfil para mostrar o nome do usuário e o link "Minha Conta"
              profileTextDiv.innerHTML = `
                  <a class="text-login" >${data.username}</a>
                  <br>
                  <a class="text-login" href="/profile" class="profile-link">MINHA CONTA</a>
              `;

              // Salva os dados no Local Storage
              localStorage.setItem('username', data.username);
              localStorage.setItem('profileImagePath', data.profileImagePath);
          } else {
              // Caso o usuário não esteja logado, exibe as opções padrão de "Entre" e "Cadastre-se"
              profileTextDiv.innerHTML = `
                  <a class="text-login" href="../login/login.html" class="profile-link">ENTRE</a>
                  <a class="text-login">OU</a>
                  <br>
                  <a class="text-login" href="../login/register.html" class="profile-link">CADASTRE-SE</a>
              `;

              // Limpa os dados do Local Storage, se não estiver logado
              localStorage.removeItem('username');
              localStorage.removeItem('profileImagePath');
          }
      })
      .catch(error => console.error("Erro ao carregar o perfil do usuário:", error));
}

// Função para carregar os dados do Local Storage ao carregar a página
function loadProfileFromLocalStorage() {
  const username = localStorage.getItem('username');
  const profileImagePath = localStorage.getItem('profileImagePath');
  const profileImage = document.getElementById("profile-image");
  const profileSvg = document.getElementById("profile-svg");
  const profileTextDiv = document.querySelector(".profile-text");

  if (username) {
      // Atualiza a imagem de perfil se houver
      if (profileImagePath && profileImagePath !== "/login/uploads/usuarioDefault.jpg") {
          profileImage.src = profileImagePath;
          profileImage.style.display = "block";
          profileSvg.style.display = "none";
      } else {
          profileImage.style.display = "none";
          profileSvg.style.display = "block";
      }

      // Atualiza o texto de perfil
      profileTextDiv.innerHTML = `
          <a class="text-login" >${username}</a>
          <br>
          <a class="text-login" href="/profile" class="profile-link">MINHA CONTA</a>
      `;
  } else {
      // Se não houver dados, exibe as opções padrão
      profileTextDiv.innerHTML = `
          <a class="text-login" href="../login/login.html" class="profile-link">ENTRE</a>
          <a class="text-login">OU</a>
          <br>
          <a class="text-login" href="../login/register.html" class="profile-link">CADASTRE-SE</a>
      `;
  }
}

// Carregar o perfil do usuário ao carregar a página
window.onload = function() {
  loadProfileFromLocalStorage(); // Primeiro, tenta carregar do Local Storage
  loadUserProfile(); // Depois, faz a chamada para verificar a sessão
}










