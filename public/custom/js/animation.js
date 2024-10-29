document.addEventListener('DOMContentLoaded', function () {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        },
        { threshold: 0.2 }
    );

    testimonialCards.forEach((card) => {
        testimonialObserver.observe(card);
    });

    const eventCards = document.querySelectorAll('.event-card');
    const eventObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.classList.add('in-view');
                }
            });
        },
        { threshold: 0.1 }
    );

    eventCards.forEach((card, index) => {
        card.style.setProperty('--delay', index);
        eventObserver.observe(card);
    });

    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
