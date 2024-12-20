// Função para carregar os itens do carrinho
function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  let total = 0;

  // Limpa o carrinho atual
  cartItemsContainer.innerHTML = "";
}

// Função para alterar a quantidade do item no carrinho
function alterarQuantidade(index, delta) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const item = carrinho[index];

  // Atualiza a quantidade
  item.quantidade += delta;

  // Evita quantidade negativa
  if (item.quantidade < 1) {
    item.quantidade = 1;
  }

  // Atualiza o carrinho no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Atualiza a quantidade na tela
  document.getElementById(`quantidade-${index}`).innerText = item.quantidade;

  // Recalcula o carrinho
  carregarCarrinho();
}

// Função para remover item do carrinho
function removerItem(index) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1); // Remove o item pelo índice
  localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Atualiza o carrinho no localStorage
  carregarCarrinho(); // Recarrega o carrinho
}

// Inicializa o carrinho ao carregar a página
window.onload = carregarCarrinho;

function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  const arrow = dropdown.previousElementSibling.querySelector(".arrow");

  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
    arrow.classList.remove("up");
  } else {
    dropdown.style.display = "block";
    arrow.classList.add("up");
  }
}

function carregarCarrinho() {
  const carrinhoItens = document.getElementById("carrinho-itens");
  const mensagemVazio = document.getElementById("mensagem-vazio");
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Para armazenar os produtos únicos e somar quantidades quando necessário
  const produtosAgrupados = {};

  // Agrupando produtos iguais e respeitando a quantidade salva
  carrinho.forEach((produto) => {
    const key = `${produto.id}-${produto.tamanho}`; // Chave única baseada no ID e Tamanho

    if (produtosAgrupados[key]) {
      // Se o produto já existe, incrementa a quantidade com base no valor salvo
      produtosAgrupados[key].quantidade += produto.quantidade;
    } else {
      // Se não existe, adiciona ao agrupamento
      produtosAgrupados[key] = { ...produto };
    }
  });

  // Limpa a div antes de exibir os itens
  carrinhoItens.innerHTML = "";

  let totalFinal = 0;

  if (Object.keys(produtosAgrupados).length === 0) {
    // Se não há produtos, mostra a mensagem de carrinho vazio
    mensagemVazio.style.display = "block";
  } else {
    // Caso contrário, esconde a mensagem de carrinho vazio
    mensagemVazio.style.display = "none";

    // Exibindo os produtos agrupados
    for (const key in produtosAgrupados) {
      const produto = produtosAgrupados[key];

      produto.preco = parseFloat(produto.preco) || 0;

      const precoTotal = produto.preco * produto.quantidade;

      totalFinal += precoTotal;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("carrinho-item");

      itemDiv.innerHTML = `
        <div class="produto">
          <div class="produtoImg">
            <img src="${produto.img}" alt="${
        produto.nome
      }" style="height: 170px; width: 160px; border-radius: 2px;">
          </div>
          <div class="produtoInfo">
            <h2>${produto.nome}</h2>
            <p>Tamanho: ${produto.tamanho}</p>
            <p>Quantidade: <span class="carrinho-quantidade">${
              produto.quantidade
            }</span></p>
            <p>Preço: R$ ${precoTotal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}</p>
          </div>
          <div class="btn-produto">
            <button class="remover-produto" data-id="${key}">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg>
            </button>
          </div>
        </div>
      `;

      carrinhoItens.appendChild(itemDiv);
    }
  }

  const finalPriceElement = document.getElementById("final-price");
  finalPriceElement.textContent = `R$ ${totalFinal.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  // Adiciona evento para remover produtos
  const botoesRemover = document.querySelectorAll(".remover-produto");
  botoesRemover.forEach((botao) => {
    botao.addEventListener("click", () => {
      const key = botao.getAttribute("data-id");

      // Remover do carrinho no localStorage
      const novoCarrinho = carrinho.filter((produto) => {
        const produtoKey = `${produto.id}-${produto.tamanho}`;
        return produtoKey !== key;
      });

      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));

      // Recarregar o carrinho
      carregarCarrinho();
    });
  });
}

// Carrega o carrinho ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarCarrinho);

// Verificar se há itens no carrinho e ir para Identificação
function irParaIdentificacao() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio. Adicione itens para continuar.");
    return;
  }

  // Atualizar o progresso
  document.getElementById("step-1").classList.add("completed");
  document.getElementById("step-2").classList.add("completed");

  // Mostrar seção de Identificação e esconder Carrinho
  document.getElementById("section-carrinho").style.display = "none";
  document.getElementById("section-identificacao").style.display = "block";
}

function irParaConfirmacao() {
  // Captura os valores do formulário
  const nome = document.getElementById("nome-completo").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  const rua = document.getElementById("rua").value;
  const numero = document.getElementById("numero").value;
  const cidade = document.getElementById("cidade").value;
  const bairro = document.getElementById("bairro").value;
  const estado = document.getElementById("estado").value;
  const complemento = document.getElementById("complemento").value;
  const pontoDeReferencia = document.getElementById("pontoDeReferencia").value;
  const cep = document.getElementById("cep-destino").value;

  // Validar se os campos obrigatórios estão preenchidos
  if (
    !nome ||
    !cpf ||
    !email ||
    !telefone ||
    !rua ||
    !numero ||
    !cidade ||
    !bairro ||
    !estado ||
    !cep
  ) {
    alert("Por favor, preencha todas as informações obrigatórias.");
    return;
  }

  // Criar um objeto com os dados
  const dadosIdentificacao = {
    nome,
    cpf,
    email,
    telefone,
    freteSelecionado,
    endereco: {
      rua,
      numero,
      cidade,
      bairro,
      estado,
      complemento,
      pontoDeReferencia,
      cep,
    },
  };

  // Obter os itens do carrinho
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const produtosAgrupados = {};

  carrinho.forEach((produto) => {
    const key = `${produto.id}-${produto.tamanho}`;
    if (produtosAgrupados[key]) {
      produtosAgrupados[key].quantidade += produto.quantidade;
    } else {
      produtosAgrupados[key] = { ...produto };
    }
  });

  let totalCarrinho = 0;
  for (const key in produtosAgrupados) {
    const produto = produtosAgrupados[key];
    produto.preco = parseFloat(produto.preco) || 0;
    totalCarrinho += produto.preco * produto.quantidade;
  }

  // Criar objeto do pedido completo
  const pedidoCompleto = {
    dadosIdentificacao,
    produtos: produtosAgrupados,
    total: totalCarrinho,
  };

  // Salvar o pedido completo no localStorage
  localStorage.setItem("pedidoCompleto", JSON.stringify(pedidoCompleto));

  // Atualizar a exibição da confirmação
  exibirConfirmacao(pedidoCompleto);
}

function exibirConfirmacao(pedidoCompleto) {
  const divProdutos = document.querySelector(".pedido-produto-final");
  const divIdentificacao = document.querySelector(
    ".pedido-indentificacao-final"
  );

  // Garantir que o preço do frete seja tratado como número
  const precoFrete = parseFloat(freteSelecionado.price);

  // Extrair dados do pedido
  const { dadosIdentificacao, produtos, total } = pedidoCompleto;


  // Calcular o total final
  const totalComFrete = total + precoFrete;

  // Formatar o valor total com frete
  const totalComFreteFormatado = totalComFrete.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Gerar o HTML dos produtos
  let produtosHTML = "";
  for (const key in produtos) {
    const produto = produtos[key];
    const precoProduto = parseFloat(produto.preco);
    const qtdProduto = parseInt(produto.quantidade, 10);
    const totalProduto = precoProduto * qtdProduto;

    // Formatar o total do produto
    const totalProdutoFormatado = totalProduto.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    produtosHTML += `
      <div class="pedido-produto-final-por-produto">
        <img src="${produto.img}" alt="${produto.nome}"/>
          <div class="info-produto-final">
            <p><strong>Nome : </strong> ${produto.nome}</p>
            <p><strong>Tamanho : </strong> ${produto.tamanho}</p>
            <p><strong>Quantidade : </strong> ${produto.quantidade}</p>
            <p><strong>Preço : </strong> ${totalProdutoFormatado}</p>
          </div>
     </div>
    `;
  }

  // Gerar o HTML das informações de identificação
  const identificacaoHTML = `
    <div class="container-info-produtos">
      <h2>Informação Para Envio</h2>
      <div class="info-nome-cpf">
         <p><strong>Nome : </strong> ${dadosIdentificacao.nome}</p>
         <p><strong>CPF : </strong> ${dadosIdentificacao.cpf}</p>
      </div>
      <div class="info-contato">
        <p><strong>Email : </strong> ${dadosIdentificacao.email}</p>
        <p><strong>Telefone : </strong> ${dadosIdentificacao.telefone}</p>
      </div>
      <div class="info-para-entrega-cliente">
        <p><strong>Endereço : </strong> ${dadosIdentificacao.endereco.rua}, ${dadosIdentificacao.endereco.numero}, ${dadosIdentificacao.endereco.cidade} - ${dadosIdentificacao.endereco.estado}</p>
        <p><strong>CEP : </strong> ${dadosIdentificacao.endereco.cep}</p>
      </div>
      <div class="valores-produtos">
        <p><strong>Frete : </strong> R$ ${precoFrete.toLocaleString("pt-BR", {minimumFractionDigits: 2,})}</p>
        <p><strong>Total : </strong> ${totalComFreteFormatado}</p>
      </div>
    </div>
  `;

  // Adicionar os conteúdos às respectivas divs
  divProdutos.innerHTML = produtosHTML;
  divIdentificacao.innerHTML = identificacaoHTML;

  console.log(dadosIdentificacao.freteSelecionado);
  document.getElementById("step-2").classList.add("completed");
  document.getElementById("step-3").classList.add("completed");
  // Atualizar as seções visíveis
  document.getElementById("section-identificacao").style.display = "none";
  document.getElementById("section-confirmacao").style.display = "block";
}

function finalizarPedido() {
  document.getElementById("step-3").classList.add("completed");
  document.getElementById("step-4").classList.add("completed");
  // Atualizar as seções visíveis
  document.getElementById("section-confirmacao").style.display = "none";
  document.getElementById("section-pagamento").style.display = "block";
}

function toggleBox(tipo) {
  const box = document.getElementById(`box-${tipo}`);
  
  // Fecha todas as boxes antes de abrir a selecionada
  document.querySelectorAll(".form-detalhes").forEach((form) => {
    if (form !== box) {
      form.style.display = "none";
    }
  });

  // Alterna a exibição da box selecionada
  box.style.display = box.style.display === "block" ? "none" : "block";
}


// Carregar o carrinho ao abrir a página
document.addEventListener("DOMContentLoaded", carregarCarrinho);


function voltarParaPaginaConfirmaçao() {
  // Atualizar o progresso removendo a classe 'completed' da etapa atual
  document.getElementById("step-4").classList.remove("completed");
  document.getElementById("step-3").classList.add("completed");

  // Atualizar as seções visíveis
  document.getElementById("section-pagamento").style.display = "none";
  document.getElementById("section-confirmacao").style.display = "block";
}


function voltarParaPaginaIndentificacao() {
   // Atualizar o progresso removendo a classe 'completed' da etapa atual
   document.getElementById("step-3").classList.remove("completed");
   document.getElementById("step-2").classList.add("completed");
 
   // Atualizar as seções visíveis
   document.getElementById("section-confirmacao").style.display = "none";
   document.getElementById("section-identificacao").style.display = "block";
}

function voltarParaPaginaCarrinho() {
  // Atualizar o progresso removendo a classe 'completed' da etapa atual
  document.getElementById("step-2").classList.remove("completed");
  document.getElementById("step-1").classList.add("completed");

  // Atualizar as seções visíveis
  document.getElementById("section-identificacao").style.display = "none";
  document.getElementById("section-carrinho").style.display = "block";
}



// Captura o botão de calcular frete e o input de CEP
const calcularFreteBtn = document.getElementById("calcular-frete-btn");
const cepDestinoInput = document.getElementById("cep-destino");
const resultadoFrete = document.getElementById("resultadoFrete");

// Função para enviar o CEP e calcular o frete
calcularFreteBtn.addEventListener("click", async () => {
  const cepDestino = cepDestinoInput.value.trim();

  if (cepDestino.length !== 8) {
    mostrarMensagemErro("Insira um CEP válido para calcular o frete!");
    return;
  }

  try {
    const response = await fetch("https://styleinfocusbackend.onrender.com/frete/calcular-frete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cepDestino }),
    });

    const data = await response.json();

    if (data.error) {
      resultadoFrete.textContent = `Erro: ${data.error}`;
    } else {
      if (data.length > 0) {
        let htmlContent = "";

        data.slice(0, 3).forEach((service, index) => {
          if (service.price && service.time) {
            const precoFormatado = service.price.toString().replace(".", ",");

            htmlContent += `
              <div class="frete-container" onclick="selecionarFrete(${index})" data-index="${index}">
                <div class="repostaDb-frete">
                  <input type="radio" name="frete" id="frete-${index}" value='${JSON.stringify(
              service
            )}' class="radio-frete" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                  </svg>
                  <div class="box-infotransporte">
                    <div class="infoTransporte">
                      <p>${service.company}</p>
                      <p>${service.name}</p>
                      <p>Prazo da Entrega - ${service.time} dias úteis</p>
                    </div>
                    <div class="precoFrete">
                      R$${precoFormatado}
                    </div>
                  </div>
                </div>
              </div>
            `;
          }
        });

        resultadoFrete.innerHTML = htmlContent;

        // Armazena as opções de frete em uma variável global para facilitar a seleção
        window.opcoesFrete = data;
      } else {
        resultadoFrete.textContent = "Nenhum serviço disponível para este CEP.";
      }
    }
  } catch (error) {
    resultadoFrete.textContent =
      "Erro ao calcular o frete. Tente novamente mais tarde.";
  }
});

let freteSelecionado = null;

function selecionarFrete(index) {
  // Remove o destaque de todas as caixas
  document.querySelectorAll(".frete-container").forEach((box) => {
    box.style.border = "none";
  });

  // Destaca a caixa selecionada
  const selectedBox = document.querySelector(`[data-index="${index}"]`);
  selectedBox.style.border = "2px solid #000";

  // Armazena os dados do frete selecionado
  freteSelecionado = window.opcoesFrete[index];
  console.log("Frete selecionado:", freteSelecionado);
}



function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;

  // Adiciona a classe 'show' para exibir a notificação
  notification.classList.add("show");

  // Remove a notificação após 3 segundos
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

function finalizarCompraAAAAA() {
  const creditoBox = document.getElementById("box-credito");
  const pixBox = document.getElementById("box-pix");

  const mensagemCompra = document.getElementById("mensagemCompra");
  const qrcodeContainer = document.getElementById("qrcodeContainer");

  if (creditoBox.style.display === "block") {
    const numeroCartao = document.getElementById("numero-cartao").value;
    const nomeTitular = creditoBox.querySelector("input[placeholder='Nome no Cartão']").value;
    const dataValidade = document.getElementById("data-validade").value;
    const cvv = creditoBox.querySelector("input[placeholder='CVV']").value;

    if (numeroCartao && nomeTitular && dataValidade && cvv) {
      mensagemCompra.style.display = "flex"; // Exibe a mensagem de compra

      setTimeout(() => {
        localStorage.removeItem("carrinho"); // Limpa o carrinho do localStorage
        document.getElementById("numero-cartao").value = "";
        creditoBox.querySelector("input[placeholder='Nome no Cartão']").value = "";
        document.getElementById("data-validade").value = "";
        creditoBox.querySelector("input[placeholder='CVV']").value = "";
        window.location.href = "../../../index.html"; // Redireciona para a página inicial
      }, 3000);
    } else {
      alert("Por favor, preencha todos os campos do Cartão.");
    }
  } else if (pixBox.style.display === "block") {
    const nomeCompleto = pixBox.querySelector("input[placeholder='Nome Completo']").value;
    const cpf = pixBox.querySelector("input[placeholder='CPF']").value;

    if (nomeCompleto && cpf) {
      qrcodeContainer.style.display = "flex"; // Exibe o QR Code
      const contador = document.createElement("p");
      contador.id = "contador";
      contador.style.fontWeight = "bold";
      qrcodeContainer.appendChild(contador);

      // Inicia o cronômetro com 1 hora (3600 segundos)
      iniciarCronometro(3600, () => {
        qrcodeContainer.style.display = "none"; // Oculta o QR Code
        alert("O tempo para realizar o pagamento expirou. Por favor, tente novamente.");
      });

      setTimeout(() => {
        qrcodeContainer.style.display = "none"; // Oculta o QR Code
        mensagemCompra.style.display = "flex"; // Exibe a mensagem de compra

        setTimeout(() => {
          localStorage.removeItem("carrinho"); // Limpa o carrinho no localStorage
          pixBox.querySelector("input[placeholder='Nome Completo']").value = "";
          pixBox.querySelector("input[placeholder='CPF']").value = "";
          mensagemCompra.style.display = "none"; // Esconde a mensagem de compra
          window.location.href = "../../../index.html"; // Redireciona para a página inicial
        }, 4000);
      }, 10000);
    } else {
      alert("Por favor, preencha todos os campos do Pix.");
    }
  } else {
    alert("Selecione um método de pagamento.");
  }
}

function iniciarCronometro(duracaoEmSegundos, callbackExpiracao) {
  const contador = document.getElementById("contador");
  let tempoRestante = duracaoEmSegundos;

  const interval = setInterval(() => {
    const horas = Math.floor(tempoRestante / 3600);
    const minutos = Math.floor((tempoRestante % 3600) / 60);
    const segundos = tempoRestante % 60;

    contador.textContent = `Tempo restante: ${horas
      .toString()
      .padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;

    if (tempoRestante <= 0) {
      clearInterval(interval);
      callbackExpiracao(); // Chama a função de expiração
    }

    tempoRestante--;
  }, 1000);
}

//FORMATAR ALGUNS INPUT E COISAS DIGITADAS 
function formatarDataValidade(input) {
  let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (valor.length >= 3) {
    valor = valor.slice(0, 2) + '/' + valor.slice(2, 4);
  }
  input.value = valor;
}

function formatarNumeroCartao(input) {
  let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  valor = valor.replace(/(\d{4})(?=\d)/g, '$1 '); // Adiciona espaço a cada 4 dígitos
  input.value = valor.trim(); // Remove espaço extra no final, se houver
}

// Máscara para CPF
function mascaraCPF(cpf) {
  cpf.value = cpf.value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .slice(0, 11) // Limita o CPF a 11 números
    .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
    .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço
}

// Máscara para Telefone
function mascaraTelefone(telefone) {
  telefone.value = telefone.value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .slice(0, 11) // Limita o número a 11 dígitos
    .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona parênteses no DDD
    .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona o traço
    .replace(/(-\d{4})\d+?$/, "$1"); // Limita o tamanho
}