
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const iconButtons = document.querySelectorAll('.icon-btn');
    const slideWidth = iconButtons[0].offsetWidth + 10; // largura do botão + espaçamento
    let currentSlide = 0;
  
    function updateCarousel() {
      track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
  
    nextBtn.addEventListener('click', () => {
      if (currentSlide < iconButtons.length - 1) {
        currentSlide++;
        updateCarousel();
      }
    });
  
    prevBtn.addEventListener('click', () => {
      // Verificando se o carrossel chegou no limite final
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
      }
    });
  });
  
  
  document.getElementById('image-upload').addEventListener('change', function() {
    const positionOptions = document.querySelector('.position-options');
    const shapeOptions = document.querySelector('.shape-options');
  
    // Verifica se um arquivo foi selecionado
    if (this.files && this.files.length > 0) {
      positionOptions.classList.remove('hidden');
      shapeOptions.classList.remove('hidden');
    } else {
      positionOptions.classList.add('hidden');
      shapeOptions.classList.add('hidden');
    }
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    const customImage = document.getElementById('custom-image'); // Definir customImage dentro do evento
  
    // Função para limpar a imagem personalizada
    function clearCustomImage() {
      customImage.setAttribute('src', ''); // Limpa a URL da imagem
      customImage.classList.add('hidden'); // Torna a imagem invisível
      clearButton.classList.add('hidden'); // Esconde o botão de limpar

      disableDrag(); // Desativa a função de arrastar (se houver)
    }
  
    const clearButton = document.querySelector('.glow-on-hover-image-clear');
    clearButton.addEventListener('click', clearCustomImage);
  
    // Resto do código...
  });
  

  
  document.getElementById('image-upload').addEventListener('change', function () {
    if (this.files && this.files.length > 0) {
      document.querySelector('.glow-on-hover-image-clear').classList.remove('hidden');
      document.querySelector('.position-options').classList.remove('hidden');
      
    }
  });
  
  
        document.addEventListener('DOMContentLoaded', () => {
          const shirtImg = document.getElementById('shirt-img');
          const shirtIcon = document.getElementById('shirt-icon');
          const customImage = document.getElementById('custom-image');
          const imageUpload = document.getElementById('image-upload');
          const shirtButtons = document.querySelectorAll('.shirt-btn');
          const iconButtons = document.querySelectorAll('.icon-btn');
          const clearButton = document.querySelector('.glow-on-hover-clear');
          const circles = document.querySelectorAll('.circles li');
          const positionButtons = document.querySelectorAll('.glow-on-hover');
          const shirtDisplay = document.getElementById('shirt-display'); // Seção da camisa
  
          // Mudar a imagem da camisa e o background dos círculos ao clicar em uma cor
          shirtButtons.forEach(button => {
            button.addEventListener('click', () => {
              const imageUrl = button.getAttribute('data-image');
              shirtImg.setAttribute('src', imageUrl);
  
              // Mudar o background dos círculos dependendo da cor da camisa
              circles.forEach(circle => {
                if (button.classList.contains('red')) {
                  circle.style.background = '#ff0000';
                } else if (button.classList.contains('blue')) {
                  circle.style.background = '#0000ff';
                } else if (button.classList.contains('green')) {
                  circle.style.background = '#008000';
                } else if (button.classList.contains('yellow')) {
                  circle.style.background = '#ffff84';
                } else if (button.classList.contains('pink')) {
                  circle.style.background = '#DA138E';
                } else if (button.classList.contains('purple')) {
                  circle.style.background = '#4B00D6';
                } else if (button.classList.contains('white')) {
                  circle.style.background = '#D3D3D3';
                } else if (button.classList.contains('turquoise')) {
                  circle.style.background = '#19B9A4';
                }
              });
            });
          });
  
  
const shapeButtons = document.querySelectorAll('.glow-on-hover-shape');
  shapeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const shape = button.getAttribute('data-shape');
  
      // Remove todas as classes de forma primeiro
      customImage.classList.remove('round', 'square', 'rounded', 'triangle');
  
      // Adiciona a classe correta baseada na forma selecionada
      switch (shape) {
        case 'round':
          customImage.classList.add('round');
          break;
        case 'square':
          customImage.classList.add('square');
          break;
        case 'rounded':
          customImage.classList.add('rounded');
          break;
        case 'triangle':
          customImage.classList.add('triangle');
          break;
      }
    });
  });
  
  iconButtons.forEach(button => {
      button.addEventListener('click', () => {
          const iconSrc = button.getAttribute('data-icon');
          shirtDisplay.src = iconSrc; // Ajuste para sua implementação
          
          // Adiciona estilo ativo
          iconButtons.forEach(btn => btn.classList.remove('active-icon'));
          button.classList.add('active-icon');
      });
  });
  
          // Adicionar o ícone à camisa
          iconButtons.forEach(button => {
            button.addEventListener('click', () => {
              const iconUrl = button.getAttribute('data-icon');
              shirtIcon.setAttribute('src', iconUrl);
              shirtIcon.classList.remove('hidden');
            });
          });
  
          // Limpar a imagem do ícone
          clearButton.addEventListener('click', () => {
            shirtIcon.classList.add('hidden');
          });
  
          // Fazer upload de imagem personalizada
          imageUpload.addEventListener('change', event => {
            const file = event.target.files[0];
            const reader = new FileReader();
  
            reader.onload = function (e) {
              customImage.setAttribute('src', e.target.result);
              customImage.classList.remove('hidden');
              enableDrag();
            };
  
            if (file) {
              reader.readAsDataURL(file);
            }
          });
  
          // Função para mover a imagem personalizada com o mouse
          let offsetX = 0, offsetY = 0, isDragging = false;
  
          customImage.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - customImage.offsetLeft;
            offsetY = e.clientY - customImage.offsetTop;
          });
  
          document.addEventListener('mousemove', (e) => {
            if (isDragging) {
              customImage.style.left = (e.clientX - offsetX) + 'px';
              customImage.style.top = (e.clientY - offsetY) + 'px';
            }
          });
  
          document.addEventListener('mouseup', () => {
            isDragging = false;
          });
  
          // Função para mudar a posição da imagem personalizada
         // Função para mudar a posição e o tamanho da imagem personalizada
  positionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const position = button.getAttribute('data-position');
  
      // Resetando transformações e tamanhos antes de cada posição
      customImage.style.transform = 'none';
      customImage.style.width = 'auto'; 
      customImage.style.height = 'auto';
  
      switch (position) {
        case 'center-center':
          customImage.style.left = '50%';
          customImage.style.top = '40%';
          customImage.style.transform = 'translate(-50%, -50%)';
          break;
        case 'small-right': // Nova posição para a imagem pequena
          customImage.style.left = '63%';
          customImage.style.top = '29%';
          customImage.style.transform = 'translate(-50%, -50%)';
          customImage.style.width = '50px'; // Define um tamanho pequeno
          customImage.style.height = '50px';
          break;
        case 'small-left': // Nova posição para a imagem pequena
          customImage.style.left = '35%';
          customImage.style.top = '29%';
          customImage.style.transform = 'translate(-50%, -50%)';
          customImage.style.width = '50px'; // Define um tamanho pequeno
          customImage.style.height = '50px';
          break;
      }
    });
  });
  });