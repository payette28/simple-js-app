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
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener("click", function (event) {
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
            showModal(pokemon);
            console.log(pokemon);
        });
    }


    function showModal(pokemon) {
    
        let modalTitle = document.querySelector(".modal-title");
        modalTitle.innerText = pokemon.name
        let pokemonImage = document.querySelector(".pokemon-image");
        pokemonImagesrc = pokemon.imageUrl;
        let pokemonHeight = document.querySelector(".pokemon-height");
        pokemonHeight.innerText = 'Height : ' + (pokemon.height / 10) + ' m';
        let container = document.querySelector("#image-container");
        let myImage = document.createElement("img");
        myImage.src =pokemonImage;
            container.appendChild(myImage);
    }



    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    };

})();

pokemonRepository.loadList().then(function () {
    var newPokemonList = pokemonRepository.getAll();
    newPokemonList.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});