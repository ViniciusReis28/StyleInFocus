function openTab(tabId) {
    // Remove a classe "active" de todas as abas e conteúdos
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });

    // Adiciona a classe "active" ao botão e conteúdo selecionados
    document.querySelector(`.tab-button[onclick="openTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).style.display = 'block';
}