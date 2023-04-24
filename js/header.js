export default {
    all() {
        let pokedexButton = document.querySelector('.pokedex');

        let sound = document.querySelector("#click");

        pokedexButton.addEventListener('click', () => {
            sound.play();
            window.location.href = pokedexButton.querySelector('a').href;
        });
    }
}