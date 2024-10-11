document.getElementById("profile-icon").onclick = function () {
  document.getElementById("sidebar").style.width = "350px";
  document.getElementById("overlay").style.width = "100%";
};

document.querySelector(".close-btn").onclick = function () {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("overlay").style.width = "0";
};

document.getElementById("overlay").onclick = function () {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("overlay").style.width = "0";
};


function openLeftSidebar() {
  document.getElementById("leftSidebar").style.width = "380px";
}

function closeLeftSidebar() {
  document.getElementById("leftSidebar").style.width = "0";
}

// Fechar o sidebar ao clicar fora dele
document.addEventListener('click', function(event) {
  var sidebar = document.getElementById('leftSidebar');
  var btn = document.querySelector('.btn-filtrar');
  if (sidebar.style.width === "380px" && !sidebar.contains(event.target) && event.target !== btn) {
      closeLeftSidebar();
  }
});

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















                                             //Parte da Paginga de perfil 
function mostrarConteudo(tipo) {
  // Esconde todos os painéis
  const panels = document.querySelectorAll('.right-panel');
  panels.forEach(panel => panel.classList.remove('active'));

  // Mostra o painel correto
  const painelAtivo = document.getElementById(`conteudo-${tipo}`);
  if (painelAtivo) {
    painelAtivo.classList.add('active');
  }
}
//Parte de trocar a foto de usuario da Pagina de Perfil
const inputFoto = document.getElementById('inputFoto');
const fotoPerfil = document.getElementById('fotoPerfil');

window.onload = function() {
  const fotoArmazenada = localStorage.getItem('fotoPerfil');
  if (fotoArmazenada) {
      fotoPerfil.src = fotoArmazenada; // Atualiza a imagem do perfil
      fotoPerfilEmail.src = fotoArmazenada; // Atualiza a imagem do email
  }
};

inputFoto.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            fotoPerfil.src = event.target.result; 
            fotoPerfilEmail.src = event.target.result;
            localStorage.setItem('fotoPerfil', event.target.result);
        }
        reader.readAsDataURL(file); // Lê a imagem como URL
    }
});







function editarCampo(campo) {
  var textElement = document.getElementById(campo + 'Text');
  var valorAtual = textElement.textContent;

  // Substitui o texto atual por um campo de input
  textElement.innerHTML = `<input type='text' id='input-${campo}' value='${valorAtual}' />`;

  // Adiciona o listener para o evento de tecla (Enter)
  var inputElement = document.getElementById('input-' + campo);
  inputElement.focus(); // Coloca o foco no input automaticamente
  inputElement.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          salvarCampo(campo);
      }
  });
}

function salvarCampo(campo) {
  var inputElement = document.getElementById('input-' + campo);
  var novoValor = inputElement.value.trim(); // Remove espaços em branco

  // Verifica se o campo está vazio
  if (novoValor === "") {
      alert("O campo não pode ficar vazio. Por favor, insira um valor."); // Mensagem de erro
      // Volta o campo de input para o valor anterior
      var textElement = document.getElementById(campo + 'Text');
      inputElement.value = textElement.textContent; // Restaura o valor anterior
      return; // Interrompe a função
  }

  // Substitui o input pelo novo valor de texto
  var textElement = document.getElementById(campo + 'Text');
  textElement.textContent = novoValor;

  // Atualiza o nome ou email dependendo do campo editado
  if (campo === 'nome') {
      atualizarNome(novoValor);
  } else if (campo === 'email') {
      atualizarEmail(novoValor);
  }
}
function atualizarNome(novoNome) {
  // Seleciona todos os elementos com a classe "nomeUsuario"
  var nomes = document.querySelectorAll('.nomeUsuario');

  // Atualiza o texto de cada elemento
  nomes.forEach(function(nome) {
      nome.textContent = novoNome;
  });
}

function atualizarEmail(novoEmail) {
  // Seleciona todos os elementos com a classe "emailUsuario"
  var emails = document.querySelectorAll('.emailUsuario');

  // Atualiza o texto de cada elemento
  emails.forEach(function(email) {
      email.textContent = novoEmail;
  });
}


