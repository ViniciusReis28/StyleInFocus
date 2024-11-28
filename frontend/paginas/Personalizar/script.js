
// Seleciona o modal e os botões
const modal = document.getElementById('sizeModal');
const sizeButtons = document.querySelectorAll('.glow-on-hover-size');

// Adiciona o evento de clique nos botões
sizeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedSize = button.dataset.size;

    // Opcional: Exibe o tamanho selecionado no console
    console.log(`Tamanho selecionado: ${selectedSize}`);

    // Fecha o modal
    modal.style.display = 'none';
  });
});

// Abre o modal automaticamente quando a página carrega
window.addEventListener('load', () => {
  modal.style.display = 'flex';
});


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


document.getElementById('image-upload').addEventListener('change', function () {
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
  }

  const clearButton = document.querySelector('.glow-on-hover-image-clear');
  clearButton.addEventListener('click', clearCustomImage);

  // Resto do código...
});



document.getElementById('image-upload').addEventListener('change', function () {
  if (this.files && this.files[0]) {
    document.querySelector('.position-options').classList.replace('invisible', 'visible');
    document.querySelector('.options-container').classList.replace('invisible', 'visible');
    document.querySelector('.glow-on-hover-image-clear').classList.remove('hidden'); // Mostra o botão de limpar
  }
});

document.querySelector('.glow-on-hover-image-clear').addEventListener('click', function () {
  document.getElementById('image-upload').value = ''; // Reseta o input
  document.querySelector('.position-options').classList.replace('visible', 'invisible');
  document.querySelector('.options-container').classList.replace('visible', 'invisible');
  this.classList.add('hidden'); // Esconde o botão de limpar com 'hidden'
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
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });


  // POSIÇÃO

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




document.addEventListener('DOMContentLoaded', () => {
  let customizationData = {
    shirtImage: '../../img-produtos/camisa-personalizada.jpg',
    shirtColor: null, // Inicialmente sem cor
    customImage: "SEM IMAGEM",
    imagePosition: "padrão",
    imageShape: "padrão",
    icon: 'SEM ÍCONE',
    shirtSize: null // Inicialmente sem tamanho
  };

  const shirtImg = document.getElementById('shirt-img');
  const customImage = document.getElementById('custom-image');
  const imageUpload = document.getElementById('image-upload');
  const iconButtons = document.querySelectorAll('.icon-btn');
  const positionButtons = document.querySelectorAll('.glow-on-hover');
  const shapeButtons = document.querySelectorAll('.glow-on-hover-shape');
  const sizeButtons = document.querySelectorAll('.glow-on-hover-size');
// Mapeamento de classes para nomes de cores
const colorMap = {
  preta: 'preta',
  red: 'vermelha',
  blue: 'azul',
  darkBlue: 'azul escuro',
  green: 'verde',
  yellow: 'amarela',
  pink: 'rosa',
  purple: 'roxa',
  white: 'branca',
  turquoise: 'turquesa'
};

// Mapeamento de classes para posições de imagem
const positionMap = {
  'center-center': 'centralizado',
  'small-left': 'peito esquerdo',
  'small-right': 'peito direito',
 
};

// Mapeamento de classes para formas da imagem
const shapeMap = {
  'round': 'redonda',
  'square': 'quadrada',
  'rounded': 'arredondada',
  'triangle': 'triangular'
};

// Mudar a imagem da camisa e armazenar a cor da camisa
const shirtButtons = document.querySelectorAll('.shirt-btn');
shirtButtons.forEach(button => {
  button.addEventListener('click', () => {
    const imageUrl = button.getAttribute('data-image');
    shirtImg.setAttribute('src', imageUrl);

    for (let color in colorMap) {
      if (button.classList.contains(color)) {
        customizationData.shirtColor = colorMap[color]; // Define a cor selecionada
        break;
      }
    }

    console.log('Cor selecionada:', customizationData.shirtColor); // Log para depuração
  });
});

sizeButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove a classe de seleção ativa dos outros botões
    sizeButtons.forEach(btn => btn.classList.remove('active-size'));
    
    // Adiciona a classe ao botão clicado
    button.classList.add('active-size');

    // Armazena o tamanho selecionado
    const size = button.getAttribute('data-size');
    customizationData.shirtSize = size;

    console.log('Tamanho selecionado:', customizationData.shirtSize); // Log para depuração
  });
});

// Fazer upload de imagem personalizada e armazenar
imageUpload.addEventListener('change', event => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    customImage.setAttribute('src', e.target.result);
    customImage.classList.remove('hidden');
    customizationData.customImage = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

positionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const position = button.getAttribute('data-position');
    customizationData.imagePosition = positionMap[position] || position; // Define a posição selecionada
  });
});

shapeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const shape = button.getAttribute('data-shape');
    customImage.classList.remove('round', 'square', 'rounded', 'triangle');

    if (shape) {
      customImage.classList.add(shape);
      customizationData.imageShape = shapeMap[shape] || shape; // Define a forma selecionada
    }
  });
});

iconButtons.forEach(button => {
  button.addEventListener('click', () => {
    const iconUrl = button.getAttribute('data-icon');
    customizationData.icon = iconUrl;
  });
});

// Função para adicionar ao carrinho
function addToCart() {
  if (!customizationData.shirtColor) {
    alert('Por favor, selecione uma cor antes de adicionar ao carrinho.');
    return;
  }

  // Armazena os dados no localStorage
  localStorage.setItem('customizationData', JSON.stringify(customizationData));
  alert('Sua personalização foi adicionada ao carrinho!');
}

// Adicionar evento de clique ao botão "Adicionar ao Carrinho"
document.querySelector('.glow-on-hover-personalizar').addEventListener('click', addToCart);})
