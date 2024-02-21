import { Stack, empty, push, top, display_stack, NonEmptyStack} from '../lib/stack';

export type card = {
    rank: number | string
    suit : "♣" |"♥" |"♠" |"♦"
};

export type deck = {
    stack : Stack<card>
    Arr: Array<card>

}
export type dealer = {
    cards : Array<card>,
    total_cards_value: number
}

export type player = {
    balance: number
    cards : Array<card>
    name : string
    total_cards_value: number
}

export function make_suit(num : number): ("♣" |"♥" |"♠" |"♦"){
    const suit = num % 4
    return suit === 0 ? "♣" :
           suit === 1 ? "♥" :
           suit === 2 ? "♠" :
                        "♦"
}
export function make_rank(num : number): string | number {
    return num === 1 ? 'A' :
           num === 11 ? 'J' : 
           num === 12 ? 'Q' :
           num === 13 ? 'K' :
           num;
}

export function createDeck(init_deck: deck): deck{
    for(let i = 0; i < 4; i++) {
        for(let j = 1; j < 14; j++) {
            let new_card = {suit: make_suit(i), rank: make_rank(j)}
            init_deck.Arr.push(new_card);
        }
    }
    return init_deck; //inte längre empty
}



export function shuffle(array : Array<card>) { //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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

  export function array_to_stack(deck: deck){
    
    for(let i = 0; i < deck.Arr.length; i++){
        deck.stack = push(deck.Arr[i], deck.stack) ;
    }   
    return deck;
  }


// kod nedanför här tack

let card_deck: deck = {stack: push({ suit: '♠', rank: 4 }, empty<card>()), Arr:[]}

// skapa deck/ initialisera deck
card_deck = array_to_stack(createDeck(card_deck))