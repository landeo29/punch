
document.getElementById('colorMode').addEventListener('change', function() {
    const mode = this.value;
    document.body.className = '';
    if (mode !== 'normal') {
        document.body.classList.add(mode);
    }
});

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}


// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // menu


    // carrusel
    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 5000);
    showSlide(currentIndex);

    // contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", {
                    from_name: name,
                    from_email: email,
                    message: message
                }).then(function(response) {
                    alert(`¡Gracias ${name}! Tu mensaje ha sido enviado.`);
                    contactForm.reset();
                }, function(error) {
                    alert("Hubo un error al enviar el mensaje. Intenta de nuevo.");
                    console.error("Error: ", error);
                });
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }

    // burbujas
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        bubble.addEventListener('click', () => {
            bubble.style.backgroundColor = getRandomColor();
        });
    });

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // círculos flotantes
    const container = document.querySelector('.circle-container');
    if (container) {
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.classList.add('circle');
            const size = Math.random() * 100 + 50; // Tamaño aleatorio entre 50px y 150px
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            circle.style.top = `${Math.random() * 100}vh`;
            circle.style.left = `${Math.random() * 100}vw`;
            container.appendChild(circle);
        }
    }

    // Animaciones de entrada al hacer scroll
    const textLayers = document.querySelectorAll('.text-layer');
    const heading = document.querySelector('.heading');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        textLayers.forEach(layer => {
            const layerTop = layer.getBoundingClientRect().top;
            if (layerTop < windowHeight * 0.8) {
                layer.classList.add('show');
            }
        });

        if (heading) {
            const headingTop = heading.getBoundingClientRect().top;
            if (headingTop < windowHeight * 0.8) {
                heading.style.opacity = 1;
                heading.style.transform = 'translateY(0)';
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run on initial load
});

