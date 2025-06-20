// Variables globales
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let slideInterval;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initCarousel();
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    
    // Cargar Google Maps cuando sea necesario
    if (typeof initMap === 'undefined') {
        window.initMap = initGoogleMap;
    }
});

// Carousel Functionality
function initCarousel() {
    if (slides.length === 0) return;
    
    // Auto-play carousel
    startCarousel();
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetCarouselTimer();
        });
    });
    
    // Botones de navegaci?n
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            previousSlide();
            resetCarouselTimer();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetCarouselTimer();
        });
    }
    
    // Pausar en hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarousel);
        carouselContainer.addEventListener('mouseleave', startCarousel);
    }
    
    // Touch events para m?vil
    let startX = 0;
    let endX = 0;
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
            resetCarouselTimer();
        }
    }
}

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

function previousSlide() {
    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prevIndex);
}

function startCarousel() {
    slideInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
}

function stopCarousel() {
    clearInterval(slideInterval);
}

function resetCarouselTimer() {
    stopCarousel();
    startCarousel();
}

// Navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar men? al hacer click en un enlace (m?vil)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animaci?n especial para contadores si los hay
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animateElements = document.querySelectorAll('.service-card, .value-item, .team-member, .info-item');
    animateElements.forEach(el => observer.observe(el));
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validaci?n b?sica
            if (validateForm(form)) {
                // Simular env?o de formulario
                showFormSuccess();
                form.reset();
            }
        });
    }
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        
        // Remover clases de error previas
        field.classList.remove('error');
        
        if (!value) {
            field.classList.add('error');
            isValid = false;
            showFieldError(field, 'Este campo es obligatorio');
        } else if (field.type === 'email' && !validateEmail(value)) {
            field.classList.add('error');
            isValid = false;
            showFieldError(field, 'Ingrese un email v?lido');
        }
    });
    
    return isValid;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    // Remover mensaje de error previo
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Crear nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
    
    // Remover el error al escribir
    field.addEventListener('input', function() {
        this.classList.remove('error');
        const errorMsg = this.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }, { once: true });
}

function showFormSuccess() {
    // Crear notificaci?n de ?xito
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 2rem;
            border-radius: 9px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        ">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            ?Mensaje enviado correctamente! Nos pondremos en contacto pronto.
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover la notificaci?n despu?s de 5 segundos
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Google Maps
function initGoogleMap() {
    const mapElement = document.getElementById('map');
    
    if (mapElement) {
        // Coordenadas de Montevideo (ejemplo - ajustar seg?n ubicaci?n real)
        const estudioPanucci = { lat: -34.9011, lng: -56.1645 };
        
        const map = new google.maps.Map(mapElement, {
            zoom: 15,
            center: estudioPanucci,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "weight": "2.00"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#9c9c9c"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#7b7b7b"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#46bcec"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#c8d7d4"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#070707"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                }
            ]
        });
        
        // Marcador personalizado
        const marker = new google.maps.Marker({
            position: estudioPanucci,
            map: map,
            title: 'Estudio Panucci',
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" fill="#2c5aa0" stroke="#ffffff" stroke-width="4"/>
                        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="16" font-weight="bold">P</text>
                    </svg>
                `),
                scaledSize: new google.maps.Size(40, 40)
            }
        });
        
        // Info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 1rem; text-align: center;">
                    <h3 style="color: #2c5aa0; margin-bottom: 0.5rem;">Estudio Panucci</h3>
                    <p style="margin: 0; color: #666;">Av. 18 de Julio 1234<br>Montevideo, Uruguay</p>
                    <p style="margin: 0.5rem 0 0; color: #666;">+598 2123 4567</p>
                </div>
            `
        });
        
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    }
}

// Utilidades
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimizar scroll events
window.addEventListener('scroll', debounce(() => {
    // Aqu? puedes agregar efectos adicionales de scroll si es necesario
}, 10));

// Lazy loading para im?genes si es necesario
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// CSS para animaciones adicionales
const additionalStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;

// Agregar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Event listeners para mejorar la experiencia
window.addEventListener('load', () => {
    // Ocultar loading si existe
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
});

// Manejo de errores de im?genes
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        // Imagen placeholder en caso de error
        e.target.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f8f9fa"/>
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6c757d" font-family="Arial, sans-serif">Imagen no disponible</text>
            </svg>
        `);
    }
}, true);

console.log('? Estudio Panucci - Website cargado correctamente');