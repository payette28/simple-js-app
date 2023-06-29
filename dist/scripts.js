let pokemonRepository = (function () {

    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon == "object" &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {

        let pokemonList = document.querySelector(".list-group");
        let listpokemon = document.createElement("li");
        let btn = document.createElement("button");
        listpokemon.classList.add("list-group-item", "text-center");
        btn.setAttribute("data-toggle", "modal");
        btn.setAttribute("data-target", "#exampleModal");
        btn.innerText = pokemon.name;
        btn.classList.add("button-class");
        listpokemon.appendChild(btn);
        pokemonList.appendChild(listpokemon);

        btn.addEventListener("click", function (event) {
            showDetails(pokemon);
        });
    }


    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }
    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
            return pokemon;
        }).catch(() => {
        });
    }

    function showModal(pokemonName, pokemonHeight, pokemonImage) {
        let title = document.querySelector(".modal-title");
        title.innerText = pokemonName.toUpperCase();
        let height = document.querySelector(".pokemonHeight");
        let imgDetails = document.querySelector(".pokemonImg");
        height.innerText = "Height: " + pokemonHeight + "m";
        imgDetails.src = pokemonImage;
    }


    function hideModal() {
        let modalContainer = document.querySelector("#exampleModal");
        modalContainer.classList.remove("isVisible");
    }

    window.addEventListener("keydown", e => {

        let modalContainer = document.querySelector("#exampleModal");
        if (e.key === "Escape" && modalContainer.classList.contains("isVisible")) {
            hideModal();
        }
    });

    let modalContainer = document.querySelector("#exampleModal");
    modalContainer.addEventListener("click", e => {

        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });



    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal
    };

})();

pokemonRepository.loadList().then(function () {
    var newPokemonList = pokemonRepository.getAll();
    newPokemonList.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


