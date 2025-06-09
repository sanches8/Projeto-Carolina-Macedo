<<<<<<< HEAD
const hamburgerBtn = document.getElementById("hamburger-btn");
const navMenu = document.getElementById("nav-menu");

hamburgerBtn.addEventListener("click", function () {
  navMenu.classList.toggle("visible");
});

// Fechar o menu após clicar em um link

document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('visible');
  });
});
=======
const hamburgerBtn = document.getElementById("hamburger-btn");
const navMenu = document.getElementById("nav-menu");

hamburgerBtn.addEventListener("click", function () {
  navMenu.classList.toggle("visible");
});

// Fechar o menu após clicar em um link

document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('visible');
  });
});
>>>>>>> c1b5ac7a38619ca87750cb526ad96b3c7b237d99
