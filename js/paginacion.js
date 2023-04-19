export default {
    all() {
        let listaPokemon = document.getElementById('listaPokemon')
        let buttons = document.getElementById('buttons')
        let urlPokemon = 'https://pokeapi.co/api/v2/pokemon'
        let btnNext;
        let btnPrevious;
        let templateHtml;

        let GetPokemons = async (url) => {
            try {
                let response = await fetch(url)
                let results = await response.json();
                console.log(results)
                DataPokemons(results.results)

                btnNext = results.next ? `<button class="btn" data-url=${results.next}>⏩</button>` : ''
                btnPrevious = results.previous ? `<button class="btn" data-url=${results.previous}>⏮</button>` : ''
                buttons.innerHTML = btnPrevious + " " + btnNext


            } catch (error) {
                console.log(error)
            }
        }
        GetPokemons(urlPokemon)

        let DataPokemons = async (data) => {
            listaPokemon.innerHTML = '';
            try {
                for (let index of data) {

                    let resp = await fetch(index.url)
                    let resul = await resp.json();
                    console.log(resul)
                    templateHtml = `
            <div class="pokemon-imagen">
            <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name}/>
            <p>${resul.name}</p>
            </div>
            `
                    listaPokemon.innerHTML += templateHtml
                }

            } catch (error) {
                console.log(error)
            }
        }

        buttons.addEventListener('click', (e) => {
            if (e.target.matches('.btn')) {
                let value = e.target.dataset.url
                console.log(value)
                GetPokemons(value)
            }
        })
    }
}