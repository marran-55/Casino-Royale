"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.black_jack_setup = exports.compare_hands = exports.dealer_cards = exports.draw_cards = exports.cards_value = exports.evaluate_player = exports.ace_check = void 0;
var types_1 = require("./types");
var stack_1 = require("../../lib/stack");
/**
 * Checks the hand of a player or dealer for the presence of Aces and adjusts the total card value accordingly.
 * @param {dealer | player} to_check - An object representing either a dealer or a player.
 * @returns {boolean} - True if Aces were found and total card value was adjusted; otherwise, false.
 */
function ace_check(to_check) {
    var aceCount = 0;
    for (var i = 0; i < to_check.cards.length; i++) {
        if (to_check.cards[i].rank === "A") {
            aceCount++;
        }
    }
    return aceCount;
}
exports.ace_check = ace_check;
/**
 * Evaluates the total value of the player's hand, adjusting for Aces if necessary.
 * @param {player | dealer} player - An object representing either a player or a dealer.
 * @returns {number} - The total value of the player's hand.
 */
function evaluate_player(player) {
    var total = 0;
    var aceCount = 0;
    for (var _i = 0, _a = player.cards; _i < _a.length; _i++) {
        var card = _a[_i];
        var value = cards_value(card.rank);
        if (value === 11) {
            aceCount++;
        }
        total += value;
    }
    while (aceCount > 0 && total > 21) {
        total -= 10;
        aceCount--;
    }
    return total;
}
exports.evaluate_player = evaluate_player;
/**
 * Decides the numerical value of a card rank.
 * @param {string | number} rank - The rank of the card, or a number
 * @returns {number} - The numerical value of the card rank
 */
function cards_value(rank) {
    if (typeof rank === 'number') {
        return rank;
    }
    else if (rank === 'J' || rank === 'Q' || rank === 'K') {
        return 10;
    }
    else {
        return 11;
    }
}
exports.cards_value = cards_value;
/**
 * Draws a specified number of cards from the deck and adds them to the active player's hand.
 * @param {player | dealer} active_player - An object representing the active player (either a player or a dealer).
 * @param {deck} deck - The deck of cards to draw from.
 * @param {number} cards_to_draw - The number of cards to draw, default number is 1.
 * @returns {void} - This function does not return any value.
 */
function draw_cards(active_player, deck, cards_to_draw) {
    if (cards_to_draw === void 0) { cards_to_draw = 1; }
    for (var i = 0; i < cards_to_draw; i++) {
        if (deck.stack !== null) {
            var drawn_card = (0, stack_1.top)(deck.stack);
            active_player.total_cards_value += cards_value(drawn_card.rank);
            active_player.cards.push(drawn_card);
            deck.stack = (0, stack_1.pop)(deck.stack);
        }
    }
}
exports.draw_cards = draw_cards;
/**
 * Functions that draw cards to the dealer until the total hand value is 16 or more.
 * @param {dealer} dealer - An object representing the dealer.
 * @param {deck} deck - The deck of cards to draw from.
 * @returns {void} - This function does not return any value.
 */
function dealer_cards(dealer, deck) {
    while (dealer.total_cards_value < 16) {
        draw_cards(dealer, deck);
        console.log(dealer.total_cards_value);
        console.log("dealer cards: ", dealer.cards);
    }
    if (ace_check(dealer) > 0 && dealer.total_cards_value > 21) {
        dealer.total_cards_value = evaluate_player(dealer);
        dealer_cards(dealer, deck);
    }
}
exports.dealer_cards = dealer_cards;
/**
 * Compares the total value of the player's hand with the dealer's hand and prints out the messages
 * @param {dealer} dealer - An object representing the dealer's hand.
 * @param {player} player - An object representing the player's hand.
 * @param {number} bet - The bet amount.
 * @returns {void} - This function does not return any value.
 */
function compare_hands(dealer, player, bet) {
    if (player.total_cards_value > 21) {
        console.log(player.name, " busts! Dealer wins.");
    }
    else if (dealer.total_cards_value > 21) {
        console.log("Dealer bust!", player.name, "winner!");
        player.balance += bet * 2;
    }
    else if (player.total_cards_value > dealer.total_cards_value) {
        console.log(player.name, "winner!");
        player.balance += bet * 2;
    }
    else if (player.total_cards_value < dealer.total_cards_value) {
        console.log("Dealer winner.");
    }
    else {
        console.log("Push, no winner!");
        player.balance += bet;
    }
    console.log(player.name, "balance:", player.balance);
}
exports.compare_hands = compare_hands;
/**
 * Sets up the starting conditions for the black jack game.
 * @param {string} namn - The name of the player.
 * @param {number} money - The initial amount of money the player has.
 * @param {number} bet - The bet amount.
 * @returns {[dealer, player, deck]} - An array containing objects representing the dealer, player, and deck.
 */
function black_jack_setup(namn, money, bet) {
    var card_deck = (0, types_1.createDeck)({ stack: (0, stack_1.empty)(), Arr: [] });
    card_deck.Arr = (0, types_1.shuffle)(card_deck.Arr);
    card_deck = (0, types_1.array_to_stack)(card_deck);
    var player = {
        balance: money - bet,
        cards: [],
        name: namn,
        total_cards_value: 0,
    };
    var dealer = { cards: [], total_cards_value: 0 };
    draw_cards(dealer, card_deck);
    console.log("DEALER CARDS: ", dealer.cards);
    draw_cards(player, card_deck, 2);
    return [dealer, player, card_deck];
}
exports.black_jack_setup = black_jack_setup;
