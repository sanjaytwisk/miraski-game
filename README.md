# MiraSki Game
3D Ski game developed for the annual [Mirabeau](https://github.com/mirabeau-nl) ski trip.
Uses the [BabylonJS](https://www.babylonjs.com/) framework as WebGL engine.
Play the game [here](https://mira.ski/game)

## Setup
Make sure NodeJS and Gulp are installed on your machine.
To install all dependencies run either

```
npm install
# or
yarn
```

## Development
To start the development server at `http://localhost:3000` run

```
npm run dev
```

## Build
To create a minified build run
```
npm run dist
```

## Settings

### Environment
By default all statics are loaded from the `/static` folder. If your static files will be stored in a subfolder please change the `BASE_URL` options in `.env.example` accordingly.
If you want to save the score to a database, please provide the `SAVE_URL` in `.evn.example`. To use these environment variables, please rename `.env.example` to `.env`

The score data will be posted using `window.fetch` and looks like this:
```JavaScript
const data = {
    name: String,
    score: Number,
    scoreValues: {
        obstacles: {
            amount: Number,
            multiplier: Number
        },
        points: {
            amount: Number,
            multiplier: Number
        },
        sections: {
            amount: Number,
            multiplier: Number
        },
        jagers: {
            amount: Number,
            multiplier: Number
        }
    }
}
```

### Game
The game settings can be altered setting the modifiers in the `data-options` attribute on the game's HTMLElement. The modifiers have 6 levels, improving the game experience with each level. If you want to use the default settings provide a `0` for all modifiers. The available modifiers are `jagers`, `agility` and `boost`.
```HTML
<section
    class="game"
    data-module="Game"
    data-options='{ "modifiers": { "jagers": 2, "agility": 2, "boost": 2} }'>
```
