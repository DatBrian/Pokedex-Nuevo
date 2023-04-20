export default {
    all() {
        const pokedexButton = document.querySelector('.pokedex');

        pokedexButton.addEventListener('click', () => {
            window.location.href = pokedexButton.querySelector('a').href;
        });
    }
}