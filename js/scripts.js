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
    pokemonList.forEach(function (pokemon) {
        if (pokemon.height < 1 && pokemon.height > 0.6) {
            document.write(pokemon.name + " height ", pokemon.height + " this is an average sized pokemon ")
            document.write('<br>')
        }
        else if (pokemon.height < 0.6) {
            document.write(pokemon.name + " height ", pokemon.height + " This a small pokemon. ");
            document.write("<br>");
        } else {
            document.write(pokemon.name + " height ", pokemon.height + " Wow, that's big! ");
            document.write("<br>");
        
    }
    });

function getAll() {
    return pokemonList;
}

function add(pokemon) {
    pokemonList.push(pokemon);
}

return {
    getAll: getAll,
    add: add
}

}) ();

document.write(pokemonRepository.getAll().forEach(pokemonList));
