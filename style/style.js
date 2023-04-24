musicaFondo();

function musicaFondo() {
    let audio = document.querySelector("#theme");
    audio.volume = 0.2;
    audio.loop = true;
    audio.play();

    let switchMusic = document.querySelector(".switch");

    switchMusic.addEventListener('change', (e) => {
        if (e.target.checked) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    document.addEventListener('load', () => {
        audio.play();
    });

    document.addEventListener("reload", () => {
        audio.play();
    })
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("pokemon")) {
        let sound = document.querySelector("#click");
        sound.play();
        let animacion = e.target.children[1];
        animacion.style.display = "block";

        let promesaAnimacion = new Promise((resolve, reject) => {
            setTimeout(() => {
                quitarAnimation(animacion);
                resolve();
            }, 1400);
        });

        promesaAnimacion.then(() => {
            let modales = document.querySelectorAll(".poke-modal");
            modales.forEach((modal) => {
                modal.style.display = "none";
            })
            let modal = e.target.children[2];
            modal.style.display = "flex";
        });

        function quitarAnimation(animation) {
            animation.style.display = "none";
        }
    } else if (e.target.classList.contains("cerrar-modal")) {
        let modal = e.target.parentNode.parentNode.parentNode.parentNode;
        let sound = document.querySelector("#click");
        sound.play();
        modal.style.display = "none";
    }
});