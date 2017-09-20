import dotenv from 'dotenv';

const env = dotenv.load();
const base = {
    src: './src',
    dist: './dist',
    static: './dist/static'
};

const config = {
    dist: base.dist,
    baseUrl: env.BASE_URL || '',
    saveUrl: env.SAVE_URL || '',
    html: {
        src: `${base.src}/index.njk`,
        watch: `${base.src}/**/*.njk`,
        dist: `${base.dist}`
    },
    css: {
        src: `${base.src}/css/all.scss`,
        watch: `${base.src}/css/**/*.scss`,
        dist: `${base.static}/css`
    },
    js: {
        webpack: './webpack.config.js',
        src: {
            watch: `${base.src}/js/**/*.js`,
            vendor: `${base.src}/vendor/**/*.js`
        },
        dist: `${base.static}/js`
    },
    images: {
        src: `${base.src}/images/**/*`,
        dist: `${base.static}/images`
    },
    audio: {
        src: `${base.src}/audio/**/*`,
        dist: `${base.static}/audio`
    },
    models: {
        src: `${base.src}/models/**/*`,
        dist: `${base.static}/models`
    },
    fonts: {
        src: `${base.src}/fonts/**/*`,
        dist: `${base.static}/fonts`
    }
};

module.exports = config;
