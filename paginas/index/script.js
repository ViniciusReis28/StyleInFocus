

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
    logo.src = '../../img/logobranca.png'; // Retorna à imagem branca
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


var radio = document.querySelector('.manual-btn')
var cont = 1

document.getElementById('radio1').checked = true

setInterval(() => {
    proximaimg()
}, 4000)

function proximaimg(){
    cont++

    if(cont > 3 ){
        cont = 1
    }

    document.getElementById('radio'+cont).checked = true
}


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

   // Função para verificar se a imagem de perfil está disponível
   function loadProfileImage() {
    fetch('/auth/check-session')
        .then(response => response.json())
        .then(data => {
            if (data.isAuthenticated) {
                // Verifica se há uma imagem de perfil
                if (data.profileImagePath) {
                    const profileImage = document.getElementById("profile-image");
                    const profileSvg = document.getElementById("profile-svg");

                    profileImage.src = data.profileImagePath;
                    profileImage.style.display = "block"; // Exibe a imagem
                    profileSvg.style.display = "none"; // Esconde o SVG
                }
            }
        })
        .catch(error => console.error("Erro ao carregar a imagem de perfil:", error));
}

// Carregar a imagem do perfil ao carregar a página
window.onload = loadProfileImage;