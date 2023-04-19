export default {
    all() {
        let listaPokemon = document.getElementById('listaPokemon')
        let buttons = document.getElementById('buttons')
        let urlPokemon = 'https://pokeapi.co/api/v2/pokemon'
        let btnNext;
        let btnPrevious;
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
            if (e.target.classList.contains('btn')) {
                let value = e.target.dataset.url;

                ws.postMessage({ message: "getPokemon", url: value });
            }
        })

        getPokemon();

    }
}