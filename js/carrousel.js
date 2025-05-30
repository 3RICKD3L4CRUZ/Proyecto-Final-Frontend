document.addEventListener('DOMContentLoaded', function() {
    const slideContainer = document.getElementById('slide-container');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    const backButton = document.getElementById('back-button');
    const forwardButton = document.getElementById('forward-button');
    
    let currentSlide = 0;
    const slideWidth = 520; // 500px + 20px gap (ajustado para el nuevo tamaño)
    const slidesToShow = Math.floor(slideContainer.offsetWidth / slideWidth);
    const maxSlide = slides.length - slidesToShow;

    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        const scrollPosition = currentSlide * slideWidth;
        slideContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        updateIndicators();
        updateButtons();
    }

    // Función para actualizar los indicadores
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentSlide) {
                indicator.classList.add('active');
            }
        });
    }

    // Función para actualizar el estado de los botones
    function updateButtons() {
        backButton.disabled = currentSlide === 0;
        forwardButton.disabled = currentSlide >= maxSlide;
        
        // Estilos para botones deshabilitados
        if (backButton.disabled) {
            backButton.style.opacity = '0.5';
            backButton.style.cursor = 'not-allowed';
        } else {
            backButton.style.opacity = '1';
            backButton.style.cursor = 'pointer';
        }
        
        if (forwardButton.disabled) {
            forwardButton.style.opacity = '0.5';
            forwardButton.style.cursor = 'not-allowed';
        } else {
            forwardButton.style.opacity = '1';
            forwardButton.style.cursor = 'pointer';
        }
    }

    // Event listeners para los botones
    backButton.addEventListener('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    forwardButton.addEventListener('click', function() {
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    });

    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentSlide = Math.min(index, maxSlide);
            updateCarousel();
        });
    });

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            backButton.click();
        } else if (e.key === 'ArrowRight') {
            forwardButton.click();
        }
    });

    // Responsive: recalcular en resize
    window.addEventListener('resize', function() {
        const newSlidesToShow = Math.floor(slideContainer.offsetWidth / slideWidth);
        const newMaxSlide = slides.length - newSlidesToShow;
        
        if (currentSlide > newMaxSlide) {
            currentSlide = Math.max(0, newMaxSlide);
        }
        
        updateCarousel();
    });

    // Inicializar
    updateCarousel();
});