"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../project/types");
var stack_1 = require("../lib/stack");
var PromptSync = require("prompt-sync");
var prompt = PromptSync();
function ace_check(to_check) {
    for (var i = 0; i < to_check.cards.length; i++) {
        if (to_check.cards[i].rank === "A") {
            to_check.total_cards_value -= 10;
            return true;
        }
    }
    return false;
}
function players_hand(deck, player, n_o_cards) {
    var counter = 0;
    while (!(0, stack_1.is_empty)(deck.stack) && n_o_cards > counter) {
        player.cards.push((0, stack_1.top)(deck.stack));
        deck.stack = (0, stack_1.pop)(deck.stack);
        counter++;
    }
    return player.cards;
}
function cards_value(rank, hand_value) {
    if (typeof rank === 'number') {
        return rank;
    }
    else if (rank === 'J' || rank === 'Q' || rank === 'K') {
        return 10;
    }
    else {
        if (hand_value <= 10) {
            return 11;
        }
        else {
            return 1;
        }
    }
}
function evaluate_hand(deck, dealer) {
    dealer.total_cards_value = 0;
    for (var i = 0; i < dealer.cards.length; i++) {
        dealer.total_cards_value += cards_value(dealer.cards[i].rank, dealer.total_cards_value);
    }
    if (dealer.total_cards_value > 21) {
        return;
    }
    else if (dealer.total_cards_value > 16) {
        return dealer;
    }
    else if (dealer.total_cards_value <= 21) {
        players_hand(deck, dealer, 1);
        console.log("Dealer cards", dealer.cards);
        evaluate_hand(deck, dealer);
    }
}
function compare_hands(player, dealer) {
    if (player.total_cards_value > 21) {
        console.log(player.name, " busts! Dealer wins.");
    }
    else if (dealer.total_cards_value > 21) {
        console.log("Dealer bust!", player.name, "winner");
        player.balance += pot * 2;
    }
    else if (player.total_cards_value > dealer.total_cards_value) {
        console.log(player.name, "winner");
        player.balance += pot * 2;
    }
    else if (player.total_cards_value < dealer.total_cards_value) {
        console.log("Dealer winner");
    }
    else {
        console.log("Push, no winner");
        player.balance += pot;
    }
    console.log(player.name, "balance:", player.balance);
}
function evaluate_player(player) {
    player.total_cards_value = 0;
    for (var i = 0; i < player.cards.length; i++) {
        player.total_cards_value += cards_value(player.cards[i].rank, player.total_cards_value);
    }
    if (player.total_cards_value > 21) {
        console.log(player.name, " bust!");
        return;
    }
    else {
        return player;
    }
}
function black_jack(card_deck, player, dealer) {
    console.log(player.name, player.cards);
    evaluate_player(player);
    if (player.total_cards_value <= 21) {
        var choice = prompt("1. Hit, 2. Stand, 3. Double Down?: ");
        if (choice === ("1")) {
            players_hand(card_deck, player, 1);
            black_jack(card_deck, player, dealer);
        }
        else if (choice === ("2")) {
            evaluate_hand(card_deck, dealer);
            compare_hands(player, dealer);
        }
        else if (choice === ("3")) {
            players_hand(card_deck, player, 1);
            evaluate_hand(card_deck, dealer);
            compare_hands(player, dealer);
        }
        else {
            console.log("Invalid input!");
            black_jack(card_deck, player, dealer);
        }
    }
    else {
        console.log(player.name, " bust, Dealer wins");
    }
}
function black_jack_setup() {
    var card_deck = { stack: (0, stack_1.empty)(), Arr: [] };
    (0, types_1.createDeck)(card_deck);
    card_deck.Arr = (0, types_1.shuffle)(card_deck.Arr);
    (0, types_1.array_to_stack)(card_deck);
    var namn = prompt("Vad heter du?: ");
    if (typeof namn === 'string') {
        var player = {
            balance: 100,
            cards: [],
            name: namn,
            total_cards_value: 0
        };
        var bet = prompt("Bet?: ");
        pot = Number(bet);
        player.balance -= Number(bet);
        var dealer = { cards: [], total_cards_value: 0 };
        players_hand(card_deck, player, 2);
        players_hand(card_deck, dealer, 1);
        console.log("dealer", dealer.cards);
        black_jack(card_deck, player, dealer);
    }
}
var pot = 0;
console.log(black_jack_setup());
