
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
  

                                                    //CARRINHO
                                              

  function adicionarAoCarrinho(nome, preco, imagem) {
    // Cria um objeto para o produto, com quantidade inicial 1
    const produto = {
        nome: nome,
        preco: parseFloat(preco) || 0, // Garante que o preço seja um número válido
        imagem: imagem,
        quantidade: 1 // Define a quantidade inicial como 1
    };

    // Verifica se já há um carrinho no localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verifica se o produto já existe no carrinho
    const produtoExistente = carrinho.find(item => item.nome === produto.nome);

    if (produtoExistente) {
        // Se o produto já existe, aumenta a quantidade
        produtoExistente.quantidade += 1;
    } else {
        // Se o produto não existe, adiciona ao carrinho
        carrinho.push(produto);
    }

    // Atualiza o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Redireciona para a página do carrinho
    
}
