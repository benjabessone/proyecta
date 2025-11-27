// JavaScript para el menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        mobileMenu.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            mobileMenu.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Smooth scroll robusto para enlaces del header (compensa header fijo)
    document.querySelectorAll('header a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });
    
    // Animación para elementos al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const elementsToAnimate = document.querySelectorAll('.feature-card, .gallery-item, .about-content');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Agregar estilos para animaciones
const style = document.createElement('style');
style.textContent = `
    .feature-card, .gallery-item, .about-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animate-in, 
    .gallery-item.animate-in, 
    .about-content.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .gallery-item:nth-child(even) {
        transition-delay: 0.2s;
    }
    
    .gallery-item:nth-child(odd) {
        transition-delay: 0.4s;
    }
`;
document.head.appendChild(style);