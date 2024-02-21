"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stack_1 = require("../lib/stack");
function make_suit(num) {
    var suit = num % 4;
    return suit === 0 ? "♣" :
        suit === 1 ? "♥" :
            suit === 2 ? "♠" :
                "♦";
}
function make_rank(num) {
    return num === 1 ? 'A' :
        num === 11 ? 'J' :
            num === 12 ? 'Q' :
                num === 13 ? 'K' :
                    num;
}
function createDeck(init_deck) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 14; j++) {
            var new_card = { suit: make_suit(i), rank: make_rank(j) };
            init_deck.Arr.push(new_card);
        }
    }
    return init_deck; //inte längre empty
}
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
function array_to_stack(deck) {
    for (var i = 0; i < deck.Arr.length; i++) {
        deck.stack = (0, stack_1.push)(deck.Arr[i], deck.stack);
    }
    return deck;
}
// koda nedanför här tack
var card_deck = { stack: (0, stack_1.empty)(), Arr: [] };
// skapa deck/ initialisera deck
card_deck = createDeck(card_deck);
card_deck = array_to_stack(card_deck);
console.log(shuffle(card_deck.Arr));
console.log((0, stack_1.display_stack)(card_deck.stack));
