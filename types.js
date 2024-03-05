"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array_to_stack = exports.shuffle = exports.createDeck = exports.make_rank = exports.make_suit = void 0;
var stack_1 = require("../../lib/stack");
/**
 * This function takes a number and converts it to the correct suit
 * @param {number} num - the number divides by four as the cards are in the order A♣, A♥, A♠, A♦, 1♣,(...)
 * @returns {string} - retuns the correct icon as a string which represents every suit
 */
function make_suit(num) {
    var suit = num % 4;
    return suit === 0 ? "♣" :
        suit === 1 ? "♥" :
            suit === 2 ? "♠" :
                "♦";
}
exports.make_suit = make_suit;
/**
 * This function takes a number and converts it to the correct rank
 * @param {number} num - the rank number of the card
 * @returns {string | number} - returns the correct rank of the card.
 * 2-10 remains numbers and 1,11,12,13 converts to the corr
 */
function make_rank(num) {
    return num === 1 ? 'A' :
        num === 11 ? 'J' :
            num === 12 ? 'Q' :
                num === 13 ? 'K' :
                    num;
}
exports.make_rank = make_rank;
/**
 * Creates a proper card deck with 52 cards.
 * @param {deck} init_deck - an empty deck to build upon
 * @returns {deck} - A deck containing Card objects representing the deck of cards.
 */
function createDeck(init_deck) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 14; j++) {
            var new_card = { suit: make_suit(i), rank: make_rank(j) };
            init_deck.Arr.push(new_card);
        }
    }
    return init_deck;
}
exports.createDeck = createDeck;
/**
 * //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * Shuffles the array of cards. (Credit to the creator, see link)
 * @param {array} array - The array containing the unshuffled deck of cards.
 * @returns {Array} - An array containing the shuffled cards.
 */
function shuffle(array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    while (currentIndex > 0) { // While there remain elements to shuffle. 
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex = currentIndex - 1;
        // And swap it with the current element.
        _a = [
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
exports.shuffle = shuffle;
/**
* Converts an array of cards into a stack.
* @param {deck} deck - The deck object containing an array of cards to be converted into a stack.
* @returns {deck} - The deck object with the array of cards converted into a stack data structure.
*/
function array_to_stack(deck) {
    for (var i = 0; i < deck.Arr.length; i++) {
        deck.stack = (0, stack_1.push)(deck.Arr[i], deck.stack);
    }
    return deck;
}
exports.array_to_stack = array_to_stack;
