import {createDeck, deck, card, player, shuffle, array_to_stack, dealer} from './types'
import { empty, top, pop} from '../../lib/stack';

/**
 * Checks the hand of a player or dealer for the presence of Aces and adjusts the total card value accordingly.
 * @param {dealer | player} to_check - An object representing either a dealer or a player.
 * @returns {boolean} - True if Aces were found and total card value was adjusted; otherwise, false.
 */
export function ace_check(to_check : dealer | player): number{
    let aceCount = 0;
    for(let i = 0; i < to_check.cards.length; i ++){
        if (to_check.cards[i].rank === "A"){
            aceCount ++;
        }    
    }
    return aceCount;
}

/**
 * Evaluates the total value of the player's hand, adjusting for Aces if necessary.
 * @param {player | dealer} player - An object representing either a player or a dealer.
 * @returns {number} - The total value of the player's hand.
 */
export function evaluate_player(player: player|dealer): number{
    let total = 0;
    let aceCount = 0;
    for (const card of player.cards) {
        const value = cards_value(card.rank);
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

/**
 * Decides the numerical value of a card rank.
 * @param {string | number} rank - The rank of the card, or a number
 * @returns {number} - The numerical value of the card rank
 */
export function cards_value(rank: number | string): number{
    if (typeof rank === 'number'){
        return rank;
    } else if (rank === 'J' || rank === 'Q' || rank === 'K'){
        return 10;
    } else {
        return 11;        
    }
} 

/**
 * Draws a specified number of cards from the deck and adds them to the active player's hand.
 * @param {player | dealer} active_player - An object representing the active player (either a player or a dealer).
 * @param {deck} deck - The deck of cards to draw from.
 * @param {number} cards_to_draw - The number of cards to draw, default number is 1.
 * @returns {void} - This function does not return any value.
 */
export function draw_cards(active_player: player | dealer,
                           deck: deck, cards_to_draw:number = 1): void{
    for(let i = 0; i < cards_to_draw; i++){
        if (deck.stack !== null){
            let drawn_card: card = top(deck.stack)
            active_player.total_cards_value += cards_value(drawn_card.rank)
            active_player.cards.push(drawn_card)
            deck.stack = pop(deck.stack)            
        }
    }
}

/**
 * Functions that draw cards to the dealer until the total hand value is 16 or more.
 * @param {dealer} dealer - An object representing the dealer.
 * @param {deck} deck - The deck of cards to draw from.
 * @returns {void} - This function does not return any value.
 */
export function dealer_cards(dealer: dealer, deck: deck ): void{
    while(dealer.total_cards_value < 16){
        draw_cards(dealer, deck)
        console.log(dealer.total_cards_value)
        console.log("dealer cards: ", dealer.cards)
    }
    if (ace_check(dealer) > 0 && dealer.total_cards_value > 21){
        dealer.total_cards_value = evaluate_player(dealer)
        dealer_cards(dealer, deck)
    }
}

/**
 * Compares the total value of the player's hand with the dealer's hand and prints out the messages
 * @param {dealer} dealer - An object representing the dealer's hand.
 * @param {player} player - An object representing the player's hand.
 * @param {number} bet - The bet amount. 
 * @returns {void} - This function does not return any value.
 */
export function compare_hands(dealer: dealer, player : player, bet: number): void{
    if (player.total_cards_value > 21) {
        console.log(player.name, " busts! Dealer wins.");
    } 
    else if (dealer.total_cards_value > 21) {
        console.log("Dealer bust!", player.name, "winner!");
        player.balance += bet *2;     
    } 
    else if (player.total_cards_value > dealer.total_cards_value){
        console.log(player.name, "winner!")
        player.balance += bet *2;        
    }
    else if (player.total_cards_value < dealer.total_cards_value){
        console.log("Dealer winner.")
    } else {
        console.log("Push, no winner!")
        player.balance += bet;       
    }
    console.log(player.name,"balance:", player.balance)
}

/**
 * Sets up the starting conditions for the black jack game.
 * @param {string} namn - The name of the player.
 * @param {number} money - The initial amount of money the player has.
 * @param {number} bet - The bet amount. 
 * @returns {[dealer, player, deck]} - An array containing objects representing the dealer, player, and deck.
 */
export function black_jack_setup(namn: string, money: number, bet: number): [dealer, player, deck]{
    let card_deck: deck = createDeck({stack : empty<card>(), Arr: []})
    card_deck.Arr = shuffle(card_deck.Arr);
    card_deck = array_to_stack(card_deck)
    const player:player = {
        balance : money - bet,
        cards : [],
        name : namn,
        total_cards_value: 0,
        
    }
        const dealer:dealer = {cards: [], total_cards_value: 0}
        draw_cards(dealer, card_deck)
        console.log("DEALER CARDS: ",dealer.cards)
        draw_cards(player, card_deck, 2)     
        return [dealer, player, card_deck];
    }