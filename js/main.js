document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById('loading-screen');
    const heroVideo = document.getElementById('hero-video');
    const wipeBar = document.getElementById('wipe-bar');

    if (!loadingScreen || !heroVideo || !wipeBar) return;

    // 動画の再生
    heroVideo.play().catch(error => {
        console.warn("自動再生がブロックされました:", error);
    });

    // 【お好みのタイミングに調整してください】例：1.5秒後に自動ワイプ発火
    const autoWipeTimer = setTimeout(startWipe, 1500);

    // 画面タップでも即ワイプ発火
    loadingScreen.addEventListener('click', startWipe);

    let isWiping = false;

    function startWipe() {
        if (isWiping) return;
        isWiping = true;
        clearTimeout(autoWipeTimer);

        // 黒い棒の上昇アニメーションを開始
        loadingScreen.classList.add('is-hidden');

        // ★今回の核心：ワイプバーの位置をリアルタイムに監視して動画を削るループ関数
        function updateMask() {
            // 黒い棒の「現在の画面内での位置」を正確に取得（ピクセル単位）
            const barRect = wipeBar.getBoundingClientRect();
            const barTop = barRect.top; // 棒の上端のY座標

            // 画面全体の高さに対する、現在の棒の切り込み位置を計算
            const windowHeight = window.innerHeight;
            const maskBottomPercentage = ((windowHeight - barTop) / windowHeight) * 100;

            // 動画（およびローディング画面）に対して、棒の位置と1ピクセルの狂いもない正確なマスクを適用
            // （棒より下側をリアルタイムに透明化します）
            heroVideo.style.clipPath = `inset(0px 0px ${maskBottomPercentage}% 0px)`;
            loadingScreen.style.clipPath = `inset(0px 0px ${maskBottomPercentage}% 0px)`;

            // 棒が一番上（0以下）に到達するまで、超高速（1秒間に60回以上）でこの計算を繰り返す
            if (barTop > -40) {
                requestAnimationFrame(updateMask);
            } else {
                // ワイプが完全に終了したら、要素を消去して裏を触れるようにする
                loadingScreen.style.display = 'none';
            }
        }

        // 監視ループをスタート
        requestAnimationFrame(updateMask);
    }
});


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

