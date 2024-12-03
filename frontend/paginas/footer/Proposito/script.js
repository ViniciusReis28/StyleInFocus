// Função para alternar a visibilidade do texto nos contêineres
function toggleText(id) {
    const textElement = document.getElementById(id);
    if (textElement.classList.contains('show')) {
        textElement.classList.remove('show');
    } else {
        // Ocultar todos os outros textos
        const allTextElements = document.querySelectorAll('.proposito-text');
        allTextElements.forEach(element => element.classList.remove('show'));

        // Mostrar o texto clicado
        textElement.classList.add('show');
    }
}


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
  
  
  // Simulação de produtos disponíveis com URLs
  const products = [
    { name: "Camiseta personalizada", url: "/produtos/camiseta-personalizada" },
    { name: "Camiseta preta", url: "/produtos/camiseta-preta" },
    { name: "Camiseta branca", url: "/produtos/camiseta-branca" },
    { name: "Camiseta azul", url: "/produtos/camiseta-azul" },
    { name: "Camiseta vermelha", url: "/produtos/camiseta-vermelha" },
    { name: "Camiseta listrada", url: "/produtos/camiseta-listrada" },
    { name: "Camiseta de algodão", url: "/produtos/camiseta-algodao" },
    { name: "Camiseta de manga longa", url: "/produtos/camiseta-manga-longa" }
  ];
  
  function showSuggestions() {
    const input = document.getElementById('query').value.toLowerCase();
    const suggestionsBox = document.getElementById('suggestions');
    
    // Limpa sugestões anteriores
    suggestionsBox.innerHTML = '';
    
    if (input) {
        // Filtra produtos que correspondem ao texto digitado
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(input));
        
        // Se houver resultados, mostra o dropdown
        if (filteredProducts.length > 0) {
            suggestionsBox.style.display = 'block';
            filteredProducts.forEach(product => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = product.name;
                
                // Adiciona um evento de clique para redirecionar para a página do produto
                suggestionItem.onclick = () => {
                    window.location.href = product.url;
                };
                
                suggestionsBox.appendChild(suggestionItem);
            });
        } else {
            suggestionsBox.style.display = 'none';
        }
    } else {
        suggestionsBox.style.display = 'none';
    }
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