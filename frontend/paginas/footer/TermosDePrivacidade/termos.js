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
  