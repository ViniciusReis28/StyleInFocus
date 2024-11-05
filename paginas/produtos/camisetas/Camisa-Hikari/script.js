
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
    logo.src = '../../../../img/logopreta.png'; // Altera para a imagem preta
  } else {
    nav.classList.remove('scrolled'); // Remove a classe quando rola para cima
    logo.src = '../../../../img/logopreta.png'; // Retorna à imagem branca
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
};