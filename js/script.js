// Seleção do ícone do hambúrguer 
const hamburgerBtn = document.getElementById("hamburger-btn");
const navMenu = document.getElementById("nav-menu");

// Quando o ícone do hambúrguer for clicado, alterna a visibilidade do menu
hamburgerBtn.addEventListener("click", function() {
    navMenu.classList.toggle("visible");
});
