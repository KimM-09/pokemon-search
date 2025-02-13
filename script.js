const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const pokeWeight = document.getElementById("weight");
const pokeHeight = document.getElementById("height");
const pokeTypes = document.getElementById("types");
const pokeHp = document.getElementById("hp");
const pokeAttack = document.getElementById("attack");
const pokeDefense = document.getElementById("defense");
const pokeSpAttack = document.getElementById("special-attack");
const pokeSpDef = document.getElementById("special-defense");
const pokeSpeed = document.getElementById("speed");
const pokemonContainer = document.getElementById("pokemon-container");


const fetchData = async () => {
  try {
    //get the data from the api
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value.toLowerCase()}`)
    //put the data into json format to use
    const data = await res.json()
    //use the data variable as the parameter when calling the displayDetails function
    displayDetails(data)
    //clear the search input
    searchInput.value = ''
  } catch (err) {
    //if an error occurs an alert will pop up
    alert('Pokémon not found')
  }
};



const displayDetails = (pokemon) => {
  //apply the information from the API to the HTML
  pokeName.textContent = pokemon.name.toUpperCase();
  pokeId.textContent = "#" + pokemon.id;
  pokeWeight.textContent = `Weight: ${pokemon.weight}`;
  pokeHeight.textContent = `Height: ${pokemon.height}`
  pokeHp.textContent = pokemon.stats[0].base_stat;
  pokeAttack.textContent = pokemon.stats[1].base_stat;
  pokeDefense.textContent = pokemon.stats[2].base_stat;
  pokeSpAttack.textContent = pokemon.stats[3].base_stat;
  pokeSpDef.textContent = pokemon.stats[4].base_stat;
  pokeSpeed.textContent = pokemon.stats[5].base_stat;

  const imgElement = document.getElementById('sprite');
  imgElement.src = `${pokemon.sprites.front_default}`
  imgElement.alt = `${pokemon.name}`

  //some pokemon have 2 types, if they do, apply type[0] in all caps to the firt p tag and apply type[1] to the second tag in all caps, otherwise only apply type[0]
  if(pokemon.types.length > 1) {
    pokeTypes.innerHTML = `<p>${pokemon.types[0].type.name.toUpperCase()}</p> <p>${pokemon.types[1].type.name.toUpperCase()}</p>`
  } else {
    pokeTypes.innerHTML = `<p>${pokemon.types[0].type.name.toUpperCase()}</p>`
  }
  typeBackgroundColor(pokemon);
}

const typeColors = {
  normal: '#ACAD99', 
  fighting: '#C45D4C',
  flying: '#90AAD7',
  poison: '#B369AF',
  ground: '#CEB250',
  rock: '#BAA85E',
  bug: '#ACC23E',
  ghost: '#816DB6',
  steel: '#9FA9AF',
  fire: '#E87A3D',
  water: '#639CE4',
  grass: '#82C95B',
  electric: '#E7C536',
  psychic: '#E96C95',
  ice: '#81CFD7',
  dragon: '#6900ec',
  dark: '79726B',
  fairy: '#E8B0EB'
}

const setStyles = (elements, property, value) => {
  elements.forEach(element => {
    element.style[property] = value;
  });
}

const typeBackgroundColor = (pokemon) => {
  const mainType = pokemon.types[0].type.name;
  const color = typeColors[mainType];

  setStyles([pokemonContainer], "backgroundColor", color);
}


searchBtn.addEventListener("click", () => {
  fetchData(searchInput.value)
})

searchInput.addEventListener("keydown", event => {
    if(event.key === "Enter") {
        fetchData(searchInput.value);
        searchInput.value = '';
    }
})

