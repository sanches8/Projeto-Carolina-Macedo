document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const html = document.documentElement;
    
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
            html.style.overflow = 'hidden'; 
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            html.style.overflow = ''; 
        }
    });

    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburgerBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            html.style.overflow = ''; 
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && e.target !== hamburgerBtn) {
            navMenu.classList.remove('active');
            hamburgerBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            html.style.overflow = ''; // Libera scroll
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            navMenu.classList.remove('active');
            hamburgerBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            html.style.overflow = ''; // Libera scroll
        }
    });
});