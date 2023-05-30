let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, type: ["grass", "monster"] },
    { name: "Eevee", height: 0.3, type: ["normal", "field"] },
    { name: "Sandshrew", height: 1.2, type: ["ground", "field"] }
];

for (let i = 0; i < pokemonList.length; i++){
    if (pokemonList[i].height < 1 && pokemonList[i].height > 0.6) {
        document.write(pokemonList[i].name + " height ", pokemonList[i].height +  " This is an average sized pokemon. ");
    } else if (pokemonList[i].height < 0.6){
        document.write(pokemonList[i].name + " height ", pokemonList[i].height + " This a small pokemon. ");
    } else {
        document.write(pokemonList[i].name + " height ", pokemonList[i].height + " Wow, that's big! "); 
    }
}