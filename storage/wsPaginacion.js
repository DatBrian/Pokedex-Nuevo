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
            <div class="pokemon">
                <div class = "pokemon-imagen">
                    <img src=${resultado['sprites']['versions']['generation-iv']['platinum']['front_default']} alt =${resultado.name}>
                    <div class="pokemon-info">
                        <div class="nombre-c">
                            <p class="pokemon-id">#${resultado.id}</p>
                            <h2 class="pokemon-nombre">${resultado.name}</h2>
                        </div>
                        <div class="pokemon-tipos">
                        ${resultado.types.map(type => `<p class="tipo ${type.type.name}">${type.type.name}</p>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="poke-animacion">
                    <div class="pokemon-imagen">
                        <img src=${resultado['sprites']['front_default']}>
                    </div>
                </div>

                <div class="poke-modal">
                    <div class="pokemon-imagen">
                    <img src=${resultado['sprites']['versions']['generation-v']['black-white']['animated']['front_default']}>
                    </div>
                    <div class="poke-info">
                        <div class="nombre-c">
                        <h2 class="pokemon-nombre">${resultado.name}</h2>
                        </div>
                        <div class="pokemon-tipos">
                        ${resultado.types.map(type => `<p class="tipo ${type.type.name}">${type.type.name}</p>`).join('')}
                        </div>
                        <div class="pokemon-stats">
                            <p>Hp:${resultado.stats["0"]["base_stat"]}</p>
                            <p>Attack:${resultado.stats["1"]["base_stat"]}</p>
                            <p>Defense:${resultado.stats["2"]["base_stat"]}</p>
                            <p>Special Attack:${resultado.stats["3"]["base_stat"]}</p>
                            <p>Special Defense:${resultado.stats["4"]["base_stat"]}</p>
                            <p>Speed:${resultado.stats["5"]["base_stat"]}</p>
                            <div class="poke-button"><button class="cerrar-modal">Cerrar</button></div>
                        </div>
                    </div>
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
    btnNext = resultados.next ? `<button class="btnP">
          <span class="button_top btnS" data-url=${resultados.next}>Next</span>
    </button>` : '';
    btnPrevious = resultados.previous ? `<button class="btnP" data-url=${resultados.previous}>
      <span class="button_top btnS" data-url=${resultados.previous}>Previous</span>
    </button>` : '';
    return btnPrevious + " " + btnNext;
}

onmessage = (e) => {
    let { message, url } = e.data;
    if (message === "getPokemon") {
        getPokemon(url)
    }
}

// ['sprites']['versions']['generation-v']['black-white']['animated']['front_default']