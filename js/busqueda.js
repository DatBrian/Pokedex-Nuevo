export default {
    all() {
        let ws = new Worker("./storage/wsBusqueda.js");
        let form = document.querySelector("#form");
        let input = document.querySelector(".input");
        let lista = document.querySelector("#listaPokemon");
        let buttons = document.querySelector("#buttons")

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let dato = input.value.trim().toLowerCase();
            if (!dato) return;

            let url = `https://pokeapi.co/api/v2/pokemon/${dato}`;

            ws.postMessage({ message: "submit", url: url });

        })

        input.addEventListener("keyup", (e) => {
            let dato = input.value.trim().toLowerCase();
            if (!dato) return;

            let url = `https://pokeapi.co/api/v2/pokemon/?limit=1000`

            ws.postMessage({ message: "typing", url: url, dato: dato });

        })

        ws.onmessage = (e) => {
            let { message, data } = e.data;
            if (message === "submit") {
                lista.innerHTML = data;
                buttons.style.display = "none";
            } else if (message === "typing") {
                lista.innerHTML = data;
                buttons.style.display = "none";
            }
        }

    }
}