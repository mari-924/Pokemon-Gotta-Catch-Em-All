import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const { default: pokemon } = await import('pokemon');
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const randomPokemonName = pokemon.random();
    let url = 'https://pokeapi.co/api/v2/pokemon/' + randomPokemonName.toLowerCase();
    let response = await fetch(url);
    let data = await response.json();

    console.log(data.sprites.front_default);

    res.render('home', {
        name: randomPokemonName,
        sprite: data.sprites.front_default,
        types: data.types.map(t => t.type.name)
    });
});

app.get('/randomPokemon', async (req, res) => {
    const randomPokemonName = pokemon.random();
    let url = 'https://pokeapi.co/api/v2/pokemon/' + randomPokemonName.toLowerCase();
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    res.render('randomPokemon', {
        name: randomPokemonName,
        sprite: data.sprites.front_default,
        types: data.types.map(t => t.type.name),
        shiny: data.sprites.front_shiny,
        weight: data.weight,
        height: data.height,
        base_xp: data.base_experience,
        id: data.id
    });
});

app.get('/pokemonSearch', async (req, res) => {
    res.render('pokemonSearch');


});

app.get('/getPokemon', async (req, res) => {
    let pokemonInput = req.query.pokemonInput; 

    if (!pokemonInput) {
        return res.send("Please provide a Pokémon name or ID.");
    } 

    pokemonInput = req.query.pokemonInput.toLowerCase(); 

    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonInput;
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    res.render('displayPokemon', {
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map(t => t.type.name),
        shiny: data.sprites.front_shiny,
        weight: data.weight,
        height: data.height,
        base_xp: data.base_experience,
        id: data.id
    });
});

function getEffect(data) {
    if (Array.isArray(data.effect_entries) && data.effect_entries.length > 0) {
        return data.effect_entries[0].effect;
    }
    return "No effect description available.";
}

app.get('/itemSearch', async (req, res) => {
    res.render('itemSearch');


});

app.get('/getItem', async (req, res) => {
    let itemInput = req.query.itemInput; 

    if (!itemInput) {
        return res.send("Please provide a Item.");
    } 

    itemInput = req.query.itemInput.toLowerCase(); 

    let url = 'https://pokeapi.co/api/v2/item/' + itemInput;
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    res.render('displayItem', {
        name: data.name,
        sprite: data.sprites.default,
        category: data.category.name,
        effect: getEffect(data),
        cost: data.cost
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

export default app;