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
        let modalContainer = document.querySelector('#modal-container');
        let modal = document.createElement('div');
        modal.classList.add('modal');
      
        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
      
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name
      
        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height : ' + (pokemon.height / 10) + ' m';

        
        pokemonImagesrc = pokemon.imageUrl;
        let myImage = document.createElement("img");
        myImage.src =pokemonImagesrc;
            
      
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(myImage);
        modalContainer.appendChild(modal);
        
      
        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
              hideModal();
            }
          });

      }
      
      document.querySelector('#show-modal').addEventListener('click', () => {
        showModal(pokemon);

        

      });

      function hideModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
        document.querySelector("img").remove();
        document.querySelector(".modal").remove();
      }
      window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
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
        showModal: showModal
    };

})();

pokemonRepository.loadList().then(function () {
    var newPokemonList = pokemonRepository.getAll();
    newPokemonList.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});