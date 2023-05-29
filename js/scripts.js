let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, type: ["grass", "monster"] },
    { name: "Eveee", height: 0.3, type: ["normal", "field"] },
    { name: "Sandshrew", height: 1.2, type: ["ground", "field"] }
];

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < 1 && pokemonList[i].height > 0.7) {
        document.write(pokemonList[i].name + " is an average sized pokemon");
    } else if (pokemonList[i].age < 0.7) {
        document.write(pokemonList[i].name + " is a small pokemon");
    } else {
        document.write(pokemonList[i].name + " Wow, that's big!");
    }
}