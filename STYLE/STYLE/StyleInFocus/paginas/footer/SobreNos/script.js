// function toggleInfo() {
//     const extraInfo = document.getElementById("extraInfo");
//     if (extraInfo.style.display === "block") {
//       extraInfo.style.display = "none"; // Oculta as informações
//     } else {
//       extraInfo.style.display = "block"; // Exibe as informações
//     }
//   }
  

  function toggleInfo() {
    const extraInfo = document.getElementById("extraInfo");
    extraInfo.classList.toggle("open"); // Adiciona ou remove a classe "open"
  }
  