const hamburgerBtn = document.getElementById("hamburger-btn");
const navMenu = document.getElementById("nav-menu");

// Alterar a visibilidade
hamburgerBtn.addEventListener("click", function () {
  navMenu.classList.toggle("visible");
});

// Fechar o menu após clicar em um link
document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('visible');
  });
});