import { Stack, empty, push, top, display_stack, NonEmptyStack} from '../../lib/stack';
/* Type declarations  */
//user record containing information about each user
export type user = {
    username: string
    password: string
    balance: number
}
//A card record with rank- and suit data
export type card = {
    rank: number | string
    suit : string
};
//Deck record in both array form and stack form
export type deck = {
    stack : Stack<card>
    Arr: Array<card>,

}
//Dealer record contining the dealers cards, card value and 
export type dealer = {
    cards : Array<card>,
    total_cards_value: number,
}
//Player record with the players balance, cards, name and value of the cards
export type player = {
    balance: number
    cards : Array<card>
    name : string
    total_cards_value: number,
}
/**
 * This function takes a number and converts it to the correct suit
 * @param {number} num - the number divides by four as the cards are in the order A♣, A♥, A♠, A♦, 1♣,(...)
 * @returns {string} - retuns the correct icon as a string which represents every suit
 */
export function make_suit(num : number): string{
    const suit = num % 4
    return suit === 0 ? "♣" :
           suit === 1 ? "♥" :
           suit === 2 ? "♠" :
                        "♦"
}
/**
 * This function takes a number and converts it to the correct rank
 * @param {number} num - the rank number of the card
 * @returns {string | number} - returns the correct rank of the card.
 * 2-10 remains numbers and 1,11,12,13 converts to the corr
 */
export function make_rank(num : number): string | number {
    return num === 1 ? 'A' :
           num === 11 ? 'J' : 
           num === 12 ? 'Q' :
           num === 13 ? 'K' :
           num;
}
/**
 * Creates a proper card deck with 52 cards.
 * @param {deck} init_deck - an empty deck to build upon
 * @returns {deck} - A deck containing Card objects representing the deck of cards.
 */
export function createDeck(init_deck: deck): deck{
    for(let i = 0; i < 4; i++) {
        for(let j = 1; j < 14; j++) {
            let new_card = {suit: make_suit(i), rank: make_rank(j)}
            init_deck.Arr.push(new_card);
        }
    }
    return init_deck;
}

/**
 * //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * Shuffles the array of cards. (Credit to the creator, see link)
 * @param {array} array - The array containing the unshuffled deck of cards.
 * @returns {Array} - An array containing the shuffled cards.
 */
export function shuffle(array : Array<card>): Array<card> { 
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) { // While there remain elements to shuffle. 
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex = currentIndex - 1;  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  /**
 * Converts an array of cards into a stack.
 * @param {deck} deck - The deck object containing an array of cards to be converted into a stack.
 * @returns {deck} - The deck object with the array of cards converted into a stack data structure.
 */
  export function array_to_stack(deck: deck): deck{
    for(let i = 0; i < deck.Arr.length; i++){
        deck.stack = push(deck.Arr[i], deck.stack) ;
    }   
    return deck;
  }

