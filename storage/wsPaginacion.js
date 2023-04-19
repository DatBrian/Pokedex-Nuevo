let urlPokemon = "https://pokeapi.co/api/v2/pokemon";
let btnNext;
let btnPrevious;
let plantilla;

let getPokemon = async (url) => {
    try {
        let respuesta = await fetch(url);
        let resultados = await respuesta.json();

        let pokemon = await Promise.all(resultados.results.map(async (index) => {
            let respuesta = await fetch(index.url);
            let resultado = await respuesta.json();
            plantilla = `
                <div class = "pokemon-imagen">
                    <img src=${resultado.sprites.other.dream_world.front_default} alt =${resultado.name}>
                    <div class="pokemon-info">
                        <div class="nombre-c">
                            <p class="pokemon-id">#${resultado.id}</p>
                            <h2 class="pokemon-nombre">${resultado.name}</h2>
                        </div>
                        <div class="pokemon-tipos">
                        ${resultado.types.map(type => `<p class="tipo ${type.type.name}">${type.type.name}</p>`).join('')}                    </div>
                </div>
                </div>
            `;
            return plantilla;
        }));
        let data = pokemon.join('');
        let buttons = generateButtons(resultados);
        postMessage({ message: "pokemon", data: data });
        postMessage({ message: "buttons", data: buttons });
    } catch (error) {
        postMessage({ message: "error", data: error });
    }
}

let generateButtons = (resultados) => {
    btnNext = resultados.next ? `<button class="btn" data-url=${resultados.next}>⏩</button>` : '';
    btnPrevious = resultados.previous ? `<button class="btn" data-url=${resultados.previous}>⏮</button>` : '';
    return btnPrevious + " " + btnNext;
}

onmessage = (e) => {
    let { message, url } = e.data;
    if (message === "getPokemon") {
        getPokemon(url)
    }
}