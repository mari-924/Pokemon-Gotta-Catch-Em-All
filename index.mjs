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

app.get('/RandomPokemon', async (req, res) => {
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

app.get('/PokemonSearch', async (req, res) => {
    const randomPokemonName = pokemon.random();
    let url = 'https://pokeapi.co/api/v2/pokemon/' + randomPokemonName.toLowerCase();
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    res.render('pokemonSearch', {
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

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

export default app;