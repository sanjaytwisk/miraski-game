import Game from './game';

/**
 * wait for DOM to load
 */
const ready = () =>
    document.readyState === 'interactive' || document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));

/**
 * main
 */
const main = () => {
    const element = document.querySelector('[data-module="Game"]');
    const options = JSON.parse(element.getAttribute('data-options'));
    const game = new Game(element, options);
};

/**
 * when ready, execute main
 */
ready().then(main);
