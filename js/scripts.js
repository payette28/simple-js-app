let pokemonRepository = (function () {

    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 0.7,
            type: ["grass", "monster"]
        },

        {
            name: "Eevee",
            height: 0.3,
            type: ["normal", "field"]
        },

        {
            name: "Sandshrew",
            height: 1.2,
            type: ["ground", "field"]
        }

    ]
    

function getAll() {
    return pokemonList;
}

function add(pokemon) {
    pokemonList.push(pokemon);
}
function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener("click", function () {
        showDetails(pokemon);
        });
}

function showDetails(pokemon){
    console.log(pokemon)
}

return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
    
};

})();

var newPokemonList = pokemonRepository.getAll();    
newPokemonList.forEach(function (pokemon) {
   pokemonRepository.addListItem(pokemon);

    
    
    

        
});