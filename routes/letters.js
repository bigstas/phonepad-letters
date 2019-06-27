const express = require('express');
const router = express.Router();
const wordlist = require('wordlist-english');
const commonEnglishWords = new Set(wordlist['english/10']);

// Stolen from https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
// Not perfect as it returns a different type if you pass in one vs. many arguments.
// Awkward to edit that feature out as it is a recursive function.
// Super concise though! :)
function cartesianProduct(as, bs, ...cs) {
    const f = (as, bs) => [].concat(...as.map(a => bs.map(b => [].concat(a, b))));
    return bs ? cartesianProduct(f(as, bs), ...cs) : as;
}

function letterCombos(letterGroupStrings) {
    // ['abc','def'] -> [['a','b','c'],['d','e','f']]
    const letterGroups = letterGroupStrings.map(
        str => str.split(''));
    const productLists = cartesianProduct(...letterGroups);
    // [['a','d'], ['a','e'], ...] -> ['ad', 'ae', ...]
    if (productLists[0].length === 1) {
        // this is the funny case where cartesianProduct returns ['a','b','c'] instead of [['a'],['b'],['c']]
        return productLists.map(str => [str]);
    }
    const productStrings = productLists.map(
        lst => lst.reduce((prev,curr) => prev+curr));
    return productStrings;
}

function getWords(letterGroupStrings) {
    return letterCombos(letterGroupStrings).filter(
        str => commonEnglishWords.has(str)
    );
}

router.post('/', function(req, res, next) {
    let letters = req.body.letters;
    res.json({ "words": getWords(letters) });
});

module.exports = router;