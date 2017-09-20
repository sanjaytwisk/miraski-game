/**
 * IIFE to get the base url
 * @return {String}
 */
export default (() => {
    return document.body.getAttribute('data-cdn');
})();
