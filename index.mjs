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

    res.render('home', {
        name: randomPokemonName,
        sprite: data.sprites.front_default,
        types: data.types.map(t => t.type.name)
    });
});


export default app;