
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
    logo.src = '../../img/logopreta.png'; // Altera para a imagem preta
  } else {
    nav.classList.remove('scrolled'); // Remove a classe quando rola para cima
    logo.src = '../../img/logopreta.png'; // Retorna à imagem branca
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


document.addEventListener('DOMContentLoaded', () => {
  fetch('/auth/check-session')
      .then(response => response.json())
      .then(data => {
          const loginLink = document.getElementById('login-link');
          const registerLink = document.getElementById('register-link');
          const profileImageElement = document.getElementById('profile-image');
          const profileSvgElement = document.getElementById('profile-svg');
          
          if (loginLink && registerLink) {
              if (data.authenticated) {
                  // Quando o usuário está autenticado
                  loginLink.textContent = data.user.username;  // Exibe o nome do usuário
                  registerLink.textContent = 'MINHA CONTA';  // Muda o texto de "Cadastrar-se" para "MINHA CONTA"
                  
                  // Altera o link de "MINHA CONTA" para o perfil do usuário
                  registerLink.href = '../login/profile.html';  // Link para o perfil do usuário

                  const profileImage = data.user.profileImage || '/paginas/login/uploads/usuarioDefault.jpg';
                  
                  if (profileImageElement && profileSvgElement) {
                      if (data.user.profileImage) {
                          profileImageElement.src = profileImage;
                          profileImageElement.style.display = 'inline';
                          profileSvgElement.style.display = 'none';
                      } else {
                          profileSvgElement.style.display = 'inline';
                          profileImageElement.style.display = 'none';
                      }
                  }
              } else {
                  // Quando o usuário não está autenticado
                  loginLink.textContent = 'ENTRE';
                  registerLink.textContent = 'CADASTRE-SE';
                  
                  // Alterando os links de login e registro
                  loginLink.href = '/login';  // Link para login
                  registerLink.href = '/register';  // Link para registro
              }
          }
      })
      .catch(error => {
          console.error('Erro ao verificar a sessão:', error);
          const loginLink = document.getElementById('login-link');
          const registerLink = document.getElementById('register-link');
          if (loginLink && registerLink) {
              loginLink.textContent = 'ENTRE';
              registerLink.textContent = 'CADASTRE-SE';
              // Caso de erro, volta os links para login e registro
              loginLink.href = '../login/login.html';
              registerLink.href = '../login/register.html';
          }
      });
});
