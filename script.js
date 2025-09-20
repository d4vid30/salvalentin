// script.js
(function () {
    /* ---------- Lluvia de corazones (igual que antes) ---------- */
    const MAX_ON_SCREEN = 60;
    const SPAWN_INTERVAL = 220;
    const BODY = document.body;

    function random(min, max) { return Math.random() * (max - min) + min; }

    function createHeart() {
        if (document.querySelectorAll('.rain-heart').length >= MAX_ON_SCREEN) return;
        const heart = document.createElement('div');
        heart.className = 'rain-heart';
        heart.textContent = '❤';
        const size = Math.floor(random(14, 36));
        heart.style.fontSize = size + 'px';
        const purpleVariants = [
            'rgba(255,95,180,0.95)',
            'rgba(255,80,130,0.95)',
            'rgba(220,120,255,0.95)',
            'rgba(200,100,255,0.95)',
            'rgba(230,150,255,0.95)'
        ];
        heart.style.color = purpleVariants[Math.floor(random(0, purpleVariants.length))];
        const left = random(-5, 105);
        heart.style.left = left + 'vw';
        const duration = random(4.5, 8.0);
        heart.style.animation = `rainFall ${duration}s linear forwards`;
        heart.style.opacity = String(random(0.85, 1));
        heart.style.transform = `translateY(0) rotate(${Math.floor(random(-30, 30))}deg)`;
        BODY.appendChild(heart);
        setTimeout(() => { heart.remove(); }, (duration * 1000) + 200);
    }

    const spawnTimer = setInterval(createHeart, SPAWN_INTERVAL);
    window._heartInterval = spawnTimer;

    let raining = true;
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'h') {
            raining = !raining;
            if (raining) {
                if (!window._heartInterval) window._heartInterval = setInterval(createHeart, SPAWN_INTERVAL);
            } else {
                if (window._heartInterval) { clearInterval(window._heartInterval); window._heartInterval = null; }
            }
        }
    });

    /* ---------- Mensaje oculto (modal) ---------- */
    const flower = document.querySelector('.flower');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const hiddenClose = hiddenMessage.querySelector('.hidden-close');

    function showMessage() {
        hiddenMessage.classList.add('show');
        hiddenMessage.setAttribute('aria-hidden', 'false');
        // mover foco al contenido por accesibilidad
        const firstFocusable = hiddenMessage.querySelector('.hidden-close');
        if (firstFocusable) firstFocusable.focus();
    }

    function hideMessage() {
        hiddenMessage.classList.remove('show');
        hiddenMessage.setAttribute('aria-hidden', 'true');
        // devolver foco a la flor
        if (flower) flower.focus();
    }

    // Mostrar mensaje al hacer click en la flor
    flower.addEventListener('click', (e) => {
        // si quieres que también haga algo más, puedes combinar aquí
        showMessage();
    });

    // Cerrar con la X
    hiddenClose.addEventListener('click', hideMessage);

    // Cerrar al hacer click fuera del contenido
    hiddenMessage.addEventListener('click', (e) => {
        if (e.target === hiddenMessage) hideMessage();
    }); 

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hiddenMessage.classList.contains('show')) {
            hideMessage();
        }
    });

    // Prevent focus leaking when modal closed (simple)
    hiddenMessage.addEventListener('transitionend', () => {
        if (!hiddenMessage.classList.contains('show')) {
            hiddenMessage.style.pointerEvents = 'none';
        } else {
            hiddenMessage.style.pointerEvents = 'auto';
        }
    });

})();
