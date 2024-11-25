// Carrossel de Cores
let corIndex = 0;
const coresContainer = document.getElementById('cores-container');
const corItems = document.querySelectorAll('.cor-item');
const btnPrevCor = document.getElementById('btn-prev-cor');
const btnNextCor = document.getElementById('btn-next-cor');

// Função para atualizar o carrossel de cores
function updateCorCarrossel() {
  const width = corItems[0].offsetWidth + 20; // Largura dos itens com margem
  coresContainer.style.transform = `translateX(-${corIndex * width}px)`;
}

// Botão de navegação anterior para o carrossel de cores
btnPrevCor.addEventListener('click', () => {
  corIndex = (corIndex - 1 + corItems.length) % corItems.length;
  updateCorCarrossel();
});

// Botão de navegação próximo para o carrossel de cores
btnNextCor.addEventListener('click', () => {
  corIndex = (corIndex + 1) % corItems.length;
  updateCorCarrossel();
});

// Carrossel de Imagens
let imgIndex = 0;
const imagemCarrossel = document.getElementById('imagem-carrossel');
const btnPrevImg = document.getElementById('btn-prev-img');
const btnNextImg = document.getElementById('btn-next-img');

// Lista de imagens (frente e costas)
const imagens = ['images/camiseta-frente.jpg', 'images/camiseta-costas.jpg'];

// Função para atualizar a imagem no carrossel
function updateImagemCarrossel() {
  imagemCarrossel.src = imagens[imgIndex];
}

// Botão de navegação anterior para o carrossel de imagens
btnPrevImg.addEventListener('click', () => {
  imgIndex = (imgIndex - 1 + imagens.length) % imagens.length;
  updateImagemCarrossel();
});

// Botão de navegação próximo para o carrossel de imagens
btnNextImg.addEventListener('click', () => {
  imgIndex = (imgIndex + 1) % imagens.length;
  updateImagemCarrossel();
});