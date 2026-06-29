/* ==================================================
   ページトップに戻るボタンの制御
================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const pageTopBtn = document.getElementById('page-top');

    if (pageTopBtn) {
        // ① スクロールイベントを監視してボタンの表示・非表示を切り替える
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // 300px以上スクロールしたら
                pageTopBtn.classList.add('is-show'); // 表示クラスを追加
            } else {
                pageTopBtn.classList.remove('is-show'); // 表示クラスを削除
            }
        });

        // ② ボタンをクリックしたときにスムーズに一番上に戻る処理
        pageTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // スムーズスクロールを有効にする
            });
        });
    }
});