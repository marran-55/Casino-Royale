import {createDeck, deck, card, player, shuffle, array_to_stack, dealer} from '../project/types'
import { Stack, empty, push, top, pop, display_stack, NonEmptyStack, is_empty} from '../lib/stack';
import * as readline from 'readline';
import * as PromptSync from 'prompt-sync';
const prompt = PromptSync();


function players_hand(deck : deck, player: player | dealer, n_o_cards : number): Array<card>{
    let counter = 0
    while (!is_empty(deck.stack) && n_o_cards > counter){
        player.cards.push(top(deck.stack))
        deck.stack = pop(deck.stack)
        counter ++
    }
    return player.cards;
}

function cards_value(rank: number | string, hand_value: number): number{
    if (typeof rank === 'number'){
        return rank;
    } else if (rank === 'J' || rank === 'Q' || rank === 'K'){
            return 10;
    } else {
        if (hand_value <= 10){
            return 11;
        } else {
            return 1;
        }
    } 
}

function evaluate_hand(deck: deck, dealer: dealer) {
    dealer.total_cards_value = 0
    for (let i = 0; i < dealer.cards.length; i++) {
        dealer.total_cards_value += cards_value(dealer.cards[i].rank,
                                         dealer.total_cards_value);
    }
    if (dealer.total_cards_value > 21) {
        return ;
    } else if (dealer.total_cards_value > 16) {
        return dealer;
    } else if (dealer.total_cards_value <= 21) {
        players_hand(deck, dealer, 1);
        console.log("Dealer cards", dealer.cards);
        evaluate_hand(deck, dealer); 
    }
}

function compare_hands(player: player, dealer: dealer){
    if (player.total_cards_value > 21) {
        console.log(player.name, " busts! Dealer wins.");
    } 
    else if (dealer.total_cards_value > 21) {
        console.log("Dealer bust!", player.name, "winner");
        player.balance += pot * 2
    } 
    else if (player.total_cards_value > dealer.total_cards_value){
        console.log(player.name, "winner")
        player.balance += pot * 2
    }
    else if (player.total_cards_value < dealer.total_cards_value){
        console.log("Dealer winner")
    } else {
        console.log("Push, no winner")
        player.balance += pot
    }
    console.log(player.name,"balance:", player.balance)
}

function evaluate_player(player: player){
    player.total_cards_value = 0
    for (let i = 0; i < player.cards.length; i++) {
        player.total_cards_value += cards_value(player.cards[i].rank, player.total_cards_value);
    }
    if ( player.total_cards_value > 21) {
        console.log(player.name, " bust!");
        return;
    }
    else{
        return player
    }
}
function black_jack(card_deck: deck, player : player, dealer: dealer){
    console.log(player.name, player.cards)
    evaluate_player(player)
    if (player.total_cards_value <= 21) {
        const choice = prompt("1. Hit, 2. Stand, 3. Double Down?: ")   
       if (choice === ("1")){
        players_hand(card_deck, player, 1)
        black_jack(card_deck, player, dealer)
        }
        else if (choice === ("2")) {
        evaluate_hand(card_deck, dealer)
        compare_hands(player, dealer)
        }
        else if (choice === ("3")){
        players_hand(card_deck, player, 1)
        evaluate_hand(card_deck, dealer)
        compare_hands(player, dealer)

        }
        else {
        console.log("Invalid input!")
        black_jack(card_deck, player, dealer)
        }
        
    }   else {
     console.log(player.name, " bust, Dealer wins")   
}}
 function black_jack_setup(): void {
    let card_deck: deck = {stack: empty<card>(), Arr: []};
    createDeck(card_deck);
    card_deck.Arr = shuffle(card_deck.Arr);
    array_to_stack(card_deck);

    const namn = prompt("Vad heter du?: ")

        if (typeof namn === 'string') {
            const player: player = {
                balance: 100,
                cards: [],
                name: namn,
                total_cards_value: 0
            };
            const bet = prompt("Bet?: ")
            pot = Number(bet)
            player.balance -= Number(bet)            
            let dealer: dealer = { cards: [], total_cards_value : 0 };

            players_hand(card_deck, player, 2);
            players_hand(card_deck, dealer, 1);

            console.log("dealer", dealer.cards);

            black_jack(card_deck, player, dealer);    
    } 
}
let pot :number = 0
console.log(black_jack_setup())