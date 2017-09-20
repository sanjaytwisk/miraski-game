import baseUrl from '../helpers/baseUrl';

export default [
    {
        name: 'moveLeft',
        file: `${baseUrl}/audio/snowboard_move_left.mp3`,
        settings: {
            volume: .1,
            spatialSound: true
        },
        follow: true
    },
    {
        name: 'moveRight',
        file: `${baseUrl}/audio/snowboard_move_right.mp3`,
        settings: {
            volume: .1,
            spatialSound: true
        },
        follow: true
    },
    {
        name: 'background',
        file: `${baseUrl}/audio/wind_background_loop.mp3`,
        settings: {
            loop: true,
            volume: 1
        }
    },
    {
        name: 'scream',
        file: `${baseUrl}/audio/wilhelm-scream.mp3`,
        settings: {
            volume: .2
        }
    },
    {
        name: 'jager',
        file: `${baseUrl}/audio/jagermeister.mp3`,
        settings: {
            volume: .4
        }
    },
    {
        name: 'boost',
        file: `${baseUrl}/audio/turboboost.mp3`,
        settings: {
            volume: .2,
            spatialSound: true
        },
        follow: true
    },
];
