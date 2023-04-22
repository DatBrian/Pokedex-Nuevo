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

            let urlSpecies = resultado.species.url;
            let respuestaSpecies = await fetch(urlSpecies);
            let resultadoSpecies = await respuestaSpecies.json();

            // Obtener la descripción del Pokemon
            let descripcion = resultadoSpecies.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;


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
                    <div class="info">
                        <div class="poke-types">
                        ${resultado.types.map(type => `<p class="tipo ${type.type.name}">${type.type.name}</p>`).join('')}
                        </div>
                        <p>
                        ${descripcion}
                        </p>
                    </div>
                    </div>
                    <div class="poke-info">
                        <div class="nombre-c">
                        <h2 class="pokemon-nombre">${resultado.name}</h2>
                        </div>
                        <div class="pokemon-stats">
                        <div class="progress-bar-container">
                        <span>HP</span>
                        <div class="progress-bar hp" style="width: ${Math.floor((resultado.stats[0].base_stat / 255) * 100)}%">
                            <p class="num">${resultado.stats[0].base_stat}</p>
                        </div>
                        </div>

                        <div class="progress-bar-container">
                        <span>ATK</span>
                        <div class="progress-bar ataque" style="width: ${Math.floor((resultado.stats[1].base_stat / 190) * 100)}%">
                            <p class="num">${resultado.stats[1].base_stat}</p></div>
                        </div>

                        <div class="progress-bar-container">
                        <span>DEF</span>
                        <div class="progress-bar defensa" style="width: ${Math.floor((resultado.stats[2].base_stat / 230) * 100)}%">
                            <p class="num">${resultado.stats[2].base_stat}</p>
                        </div>
                        </div>

                        <div class="progress-bar-container">
                        <span>SpA</span>
                        <div class="progress-bar ataque-especial" style="width: ${Math.floor((resultado.stats[3].base_stat / 194) * 100)}%">
                            <p class="num">${resultado.stats[3].base_stat}</p>
                        </div>
                        </div>

                        <div class="progress-bar-container">
                        <span>SpD</span>
                        <div class="progress-bar defensa-especial" style="width: ${Math.floor((resultado.stats[4].base_stat / 230) * 100)}%">
                            <p class="num">${resultado.stats[4].base_stat}</p>
                        </div>
                        </div>

                        <div class="progress-bar-container">
                        <span>Sp</span>
                        <div class="progress-bar velocidad" style="width: ${Math.floor((resultado.stats[5].base_stat / 180) * 100)}%">
                            <p class="num">${resultado.stats[5].base_stat}</p>
                        </div>
                        </div>

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