
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
      logo.src = '../../../img/logobranca.png'; // Retorna à imagem branca
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
  
  window.addEventListener('scroll', function() {
    const spotify = document.querySelector('.Spotify'); // Corrige a seleção do elemento
    if (window.scrollY > 50) { // Ajuste o valor conforme necessário
      spotify.style.top = '0'; // Fixa o Spotify no topo quando rola para baixo
    } else {
      spotify.style.top = '52px'; // Retorna ao deslocamento inicial
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

        // Altera o tamanho da fonte
        loginTextElement.style.fontSize = "20px"; // Font-size para quando o usuário não está autenticado
        registerTextElement.style.fontSize = "20px"; // Font-size padrão para o link de registro
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
                registerTextElement.href = "../../../paginas/minhaConta/profile.html"; // Link para a página de perfil

                separatorElement.style.display = "none"; // Remove "OU"

                // Altera o tamanho da fonte para quando o usuário está autenticado
                loginTextElement.style.fontSize = "20px"; // Tamanho maior para o nome de usuário
                registerTextElement.style.fontSize = "20px"; // Tamanho maior para o link de "Minha Conta"
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
