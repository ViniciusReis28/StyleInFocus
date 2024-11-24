// function toggleInfo() {
//     const extraInfo = document.getElementById("extraInfo");
//     if (extraInfo.style.display === "block") {
//       extraInfo.style.display = "none"; // Oculta as informações
//     } else {
//       extraInfo.style.display = "block"; // Exibe as informações
//     }
//   }
  

  


  function toggleInfo(cardId) {
    const extraInfo = document.getElementById(cardId);
    extraInfo.classList.toggle("open"); // Alterna a exibição do card correspondente
  }
  