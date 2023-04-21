export default {
    all() {
        let listaPokemon = document.getElementById('listaPokemon')
        let buttons = document.getElementById('buttons')
        let urlPokemon = 'https://pokeapi.co/api/v2/pokemon'
        let ws = new Worker("./storage/wsPaginacion.js");

        ws.onmessage = (e) => {
            let { message, data } = e.data;

            switch (message) {
                case "pokemon":
                    renderPokemon(data);
                    break;
                case "buttons":
                    renderButtons(data);
                    break;
                case "error":
                    console.error(data);
                    break;
            }
        }

        let getPokemon = () => {
            ws.postMessage({ message: "getPokemon", url: urlPokemon });
        }

        let renderPokemon = (data) => {
            listaPokemon.innerHTML = data;
        }

        let renderButtons = (data) => {
            buttons.innerHTML = data;
        }

        buttons.addEventListener("click", (e) => {
            if (e.target.classList.contains('btnS')) {
                let value = e.target.dataset.url;

                ws.postMessage({ message: "getPokemon", url: value });
            }
        })


        getPokemon();

        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("pokemon")) {
                let animacion = e.target.children[1];
                animacion.style.display = "block";

                let promesaAnimacion = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        quitarAnimation(animacion);
                        resolve();
                    }, 1000);
                });

                promesaAnimacion.then(() => {
                    let modal = e.target.children[2];
                    modal.style.display = "flex";
                });
                
                function quitarAnimation(animation) {
                    animation.style.display = "none";
                }
            } else if (e.target.classList.contains("cerrar-modal")) {
                let modal = e.target.parentNode.parentNode.parentNode.parentNode;

                modal.style.display = "none";
            }
        })

    }
}