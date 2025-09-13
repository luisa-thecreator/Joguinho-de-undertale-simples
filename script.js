const alma = document.querySelector('.alma');
const osso = document.querySelector('.osso');
const audio = document.querySelector('#megalovania');

const jump = () => {
    // Evita múltiplos pulos simultâneos
    if (!alma.classList.contains('jump')) {
        alma.classList.add('jump');

        setTimeout(() => {
            alma.classList.remove('jump');
        }, 600); // Aumentei o tempo do pulo para 600ms
    }
}

const loop = setInterval(() => {

    const ossoPosition = osso.offsetLeft;
    const almaPosition = +window.getComputedStyle(alma).bottom.replace('px', '');
    const isJumping = alma.classList.contains('jump');

    // Detecção de colisão mais precisa
    // Verifica se o osso está na área de colisão (entre 0 e 120px da esquerda)
    // e se a alma está no chão (não pulando) e na posição correta
    if (ossoPosition <= 120 && ossoPosition > 0 && almaPosition <= 50 && !isJumping) {
        
        console.log('COLISÃO DETECTADA! Osso:', ossoPosition, 'Alma:', almaPosition, 'Pulando:', isJumping);

        // Parar a música quando houver colisão
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        // Parar a animação do osso
        osso.style.animation = 'none';
        osso.style.left = `${ossoPosition}px`;

        // Iniciar efeito de desaparecimento sincronizado imediatamente
        const gameBoard = document.querySelector('.game-board');
        
        // Configurar transições simultâneas para todos os elementos
        gameBoard.style.transition = 'opacity 0.2s ease-out, background-color 0.2s ease-in';
        alma.style.transition = 'opacity 0.2s ease-out';
        osso.style.transition = 'opacity 0.2s ease-out';
        
        // Aplicar fade out simultâneo em todos os elementos
        alma.style.opacity = '0';
        osso.style.opacity = '0';
        gameBoard.style.opacity = '0';
        gameBoard.style.background = '#000000';
        
        // Após 0.2s, esconder completamente todos os elementos e redirecionar para index3
        setTimeout(() => {
            alma.style.display = 'none';
            osso.style.display = 'none';
            gameBoard.style.display = 'none';
            
            // Redirecionar para index3 após um pequeno delay
            setTimeout(() => {
                window.location.href = 'index3.html';
            }, 100);
        }, 200);

        clearInterval(loop);
        return; // Para a execução do loop após colisão

    }

}, 10);

document.addEventListener('keydown', jump);

    // Garantir que o vídeo sempre reproduza com som
    document.addEventListener('DOMContentLoaded', function () {
        const video = document.querySelector('video');

        // Garantir que o vídeo não esteja mutado
        video.muted = false;

        // Função para tentar reproduzir o vídeo
        function tryPlayVideo() {
            // Só reproduzir se a imagem não estiver visível
            if (document.getElementById('sans2Image').style.display !== 'block') {
                video.play().catch(function (error) {
                    console.log('Autoplay foi bloqueado:', error);
                    // Se autoplay falhar, tentar novamente após qualquer interação
                    document.addEventListener('click', tryPlayVideo, { once: true });
                    document.addEventListener('keydown', tryPlayVideo, { once: true });
                    document.addEventListener('touchstart', tryPlayVideo, { once: true });
                });
            }
        }

        // Tentar reproduzir o vídeo imediatamente
        tryPlayVideo();

        // Quando o vídeo terminar, mostrar a imagem do Sans2 e parar o som
        video.addEventListener('ended', function () {
            video.style.display = 'none';
            document.getElementById('sans2Image').style.display = 'block';

            // Parar o som do vídeo
            video.pause();
            video.currentTime = 0;
            video.muted = true;
        });

        // Não tentar reproduzir novamente se o vídeo pausar (vídeo só aparece uma vez)
    });

// Garantir que a música comece a tocar quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
    const audio = document.querySelector('#megalovania');
    if (audio) {
        audio.play().catch(function (error) {
            console.log('Autoplay de áudio foi bloqueado:', error);
            // Se autoplay falhar, tentar novamente após interação
            document.addEventListener('click', function () {
                audio.play();
            }, { once: true });
        });
    }
});