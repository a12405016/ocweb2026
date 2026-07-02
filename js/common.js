document.addEventListener('DOMContentLoaded', () => {

    const articles = document.querySelectorAll('.program-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    articles.forEach(el => observer.observe(el));
});