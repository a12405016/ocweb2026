document.addEventListener('DOMContentLoaded', () => {

    /* ── 背景位置の調整 ── */
    const bgLeft = document.querySelector('.bg-left');
    const bgRight = document.querySelector('.bg-right');

    function adjustBg() {
        const vw = window.innerWidth;
        const base = 1600;

        if (bgLeft) {
            bgLeft.style.left = vw > base ? `-${(vw - base) * 0.15}px` : '0px';
        }
        if (bgRight) {
            const push = vw > base ? -100 : Math.min(100, 100 + (base - vw) * 0.08);
            bgRight.style.right = vw <= 1600 ? '0px' : `${push}px`;
        }
    }

    adjustBg();
    window.addEventListener('resize', adjustBg);

    /* ── スクロールアニメーション ── */
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(el => observer.observe(el));
});
