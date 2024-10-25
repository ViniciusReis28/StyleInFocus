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














// Parte da Paginga de perfil 
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

// Parte de trocar a foto de usuario da Pagina de Perfil
const inputFoto = document.getElementById('inputFoto');
const fotoPerfil = document.getElementById('fotoPerfil');

window.onload = function() {
  const fotoArmazenada = localStorage.getItem('fotoPerfil');
  if (fotoArmazenada) {
      fotoPerfil.src = fotoArmazenada; 
      fotoPerfilEmail.src = fotoArmazenada; 
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
        reader.readAsDataURL(file); 
    }
});

// Atualiza o nome ou email diretamente
function atualizarNome(novoNome) {
  // Atualiza todos os elementos com a classe nomeUsuario
  var nomes = document.querySelectorAll('.nomeUsuario');
  nomes.forEach(function(nome) {
      nome.textContent = novoNome;
  });
  // Atualiza o display específico se necessário
  document.getElementById('nomeUsuarioDisplay').textContent = novoNome;
}

function atualizarEmail(novoEmail) {
  // Atualiza todos os elementos com a classe emailUsuario
  var emails = document.querySelectorAll('.emailUsuario');
  emails.forEach(function(email) {
      email.textContent = novoEmail;
  });
  // Atualiza o display específico se necessário
  document.getElementById('emailUsuarioDisplay').textContent = novoEmail;
}


document.getElementById('editarPerfil').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  var form = event.target;
  var formData = new FormData(form);

  fetch('update.php', { // Certifique-se de que o caminho está correto
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro na resposta da rede: ' + response.statusText);
      }
      return response.json();
  })
  .then(data => {
      // Limpa mensagens de erro anteriores
      document.getElementById('password-error').textContent = '';

      if (data.success) {
          alert('Alterações salvas com sucesso!'); // Mensagem de sucesso

          // Atualiza nome e email no perfil
          const novoNome = document.getElementById('nome').value;
          const novoEmail = document.getElementById('email').value;

          atualizarNome(novoNome); // Chama a função para atualizar o nome
          atualizarEmail(novoEmail); // Chama a função para atualizar o email
          
          // Você pode adicionar redirecionamento aqui, se necessário
      } else {
          // Exibir erros
          if (data.errors.password) {
              document.getElementById('password-error').textContent = data.errors.password;
          }
          if (data.errors.email) {
              alert(data.errors.email); // Exibe mensagem de erro de e-mail
          }
      }
  })
  .catch(error => console.error('Erro:', error));
});



// Faz a chamada AJAX para obter os dados do usuário
function carregarDadosUsuario() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'dados.php', true);
  xhr.onload = function () {
      if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          if (response.success) {
              // Insere os dados do usuário nos campos de formulário
              document.getElementById('nome').value = response.username;
              document.getElementById('email').value = response.email;

              // Atualiza a imagem de perfil
              document.getElementById('fotoPerfil').src = response.foto || '../../img/icone-de-perfil-de-avatar-padrao-imagem-de-usuario-de-midia-social-icone-de-avatar-cinza-silhueta-de-perfil-em-branco-ilustracao-vetorial_561158-3408.avif';
          } else {
              alert(response.message);
          }
      } else {
          alert('Erro ao carregar os dados do usuário.');
      }
  };
  xhr.send();
}

// Chama a função ao carregar a página
window.onload = carregarDadosUsuario;
