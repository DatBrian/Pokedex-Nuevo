export default {
    all() {
        let listaPokemon = document.querySelector('#listaPokemon')
        let buttons = document.querySelector('#buttons')
        let urlPokemon = 'https://pokeapi.co/api/v2/pokemon'
        let ws = new Worker("./storage/wsPaginacion.js");
        let buttonsType = document.querySelectorAll(".btn")

        ws.onmessage = (e) => {
            let { message, data } = e.data;

            switch (message) {
                case "pokemon":
                    clearHtml()
                    renderPokemon(data);
                    buttons.style.display = "flex";
                    break;
                case "pokemonType":
                    pokeType(data);
                case "buttons":
                    renderButtons(data);
                    buttons.style.display = "flex";
                    break;
                case "error":
                    console.error(data);
                    break;
            }
        }

        let renderPokemonPromise = (data) => {
            return new Promise((resolve, reject) => {
                renderPokemon(data);
                resolve();
            });
        };

        let pokeType = async (data) => {
            clearHtml();
            await renderPokemonPromise(data);
            buttons.style.display = "none";
        };

        let getPokemon = () => {
            ws.postMessage({ message: "getPokemon", url: urlPokemon });
        }

        let renderPokemon = (data) => {
            listaPokemon.innerHTML = data;
        }

        let renderButtons = (data) => {
            buttons.innerHTML = data;
        }

        function clearHtml() {
            listaPokemon.innerHTML = '';
        }

        buttons.addEventListener("click", (e) => {
            if (e.target.classList.contains('btnS')) {
                let value = e.target.dataset.url;
                let sound = document.querySelector("#click");
                sound.play();
                ws.postMessage({ message: "getPokemon", url: value });
            }
        })
        getPokemon();

        buttonsType.forEach((button) => {
            button.addEventListener("click", (e) => {
                let type = button.dataset.type;
                let sound = document.querySelector("#click");
                sound.play();
                let urlT = `https://pokeapi.co/api/v2/type/${type}`
                ws.postMessage({ message: "getPokemonT", url: urlT, type: type });
            })
        })

    }
}