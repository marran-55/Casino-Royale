//Code written using the compiled TS functins from our terminal black jack code
//and rewritten to fit a HTML website. Some new functions added as well to make the code
//suitable for a HTML website. 

/**
 * Constructs a new Card object with the provided rank, suit, and image.
 * @param {string} rank - The rank of the card.
 * @param {string} suit - The suit of the card.
 * @param {string} image - The path or URL to the image of the card.
 */
class Card {
    constructor(rank, suit, image) {
        this.rank = rank;
        this.suit = suit;
        this.image = image;
    }
}

/**
 * Generates the suit of a card based on a number.
 * @param {number} num - The numeric representation of the suit.
 * @returns {string} - The suit of the card ('C' for clubs, 'H' for hearts, 'S' for spades, 'D' for diamonds).
 */
function make_suit(num) {
    var suit = num % 4;
    return suit === 0 ? "C" :
        suit === 1 ? "H" :
            suit === 2 ? "S" :
                "D";
}

/**
 * Generates the rank of a card based on a number.
 * @param {number} num - The numeric representation of the rank.
 * @returns {string} - The rank of the card ('A' for ace, 'J' for jack, 'Q' for queen, 'K' for king, or the number itself).
 */
function make_rank(num) {
    return num === 1 ? 'A' :
        num === 11 ? 'J' :
            num === 12 ? 'Q' :
                num === 13 ? 'K' :
                    num;
}

/**
 * Creates a card deck with 52 cards and pairs the cards with the right pictures.
 * @returns {Array} - An array containing Card objects representing the deck of cards.
 */
function createDeck() {
    let deck = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 13; j++) { 
            let cardImg = `./cards2/${make_rank(j)}-${make_suit(i)}.png`; //img name is for example 5-H
            deck.push(new Card(make_rank(j), make_suit(i), cardImg));
        }
    }
   return deck;
}

/**
 * Shuffles the array of cards.
 * @param {array} array - The array containing the deck of cards.
 * @returns {Array} - An array containing the shuffled cards.
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Displays the cards from the provided deck on the HTML page.
 * @param {Array} deck - An array containing Card objects representing the deck of cards.
 * @returns {void} - This function does not return any value.
 */
function displayCards(deck) {
    let cardContainer = document.getElementById("card-container");
    if (cardContainer) {
        cardContainer.innerHTML = ""; //Clears previous cards
        deck.forEach(card => { //Iterate through each card in the deck
            let img = document.createElement("img"); 
            img.src = card.image; //Image source
            cardContainer.appendChild(img); //Append image to the card container
        });
    }
}

/**
 * Displays the dealer's cards on the HTML page.
 * @param {Object} dealer - An object representing the dealer, containing an array of Card objects.
 * @returns {void} - This function does not return any value.
 */
function displayDealerCard(dealer) {
    let dealerCardContainer = document.getElementById("dealer-cards");
    if (dealerCardContainer && dealer.cards.length > 0) {
        dealerCardContainer.innerHTML = ""; //Clears previous cards
        dealer.cards.forEach(card => { //Iterate through each card in the deck
            let img = document.createElement("img");
            img.src = card.image; //Image source
            dealerCardContainer.appendChild(img); //Append image to the dealer card container
        });
    }
}

/**
* Function that deals a specified number of cards from the deck to a player or to the dealer.
 * @param {Array} deck - An array representing the deck of cards.
 * @param {Object} recipient - An object representing the player or the dealer who will receive the cards.
 * @param {number} number_of_cards - The number of cards to be dealt to the player or dealer.
 * @returns {void} - This function does not return any value.
 */
function dealCards(deck, recipient, number_of_cards) {
    for (let i = 0; i < number_of_cards; i++) {
        recipient.cards.push(deck.pop()); // Pop card from the deck after dealing
    }
}

/**
* Function that iterates through a hand and counts the amount of Aces
 * @param {Array} hand - An array representing the hand of cards to be checked
 * @returns {number} A number representing the amount of Aces in the hand.
 */
function ace_check(hand){
    let aceCount = 0;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].rank === 'A') {
            aceCount++;
        }
    }
    return aceCount;
}

/**
 * Evaluates the total value of the player's hand, considering the value of Aces.
 * @param {Array} hand - An array representing the hand of cards to be evaluated.
 * @returns {number} - The total value of the player's hand.
 */
function evaluateHand(hand) {
    let total = 0;
    let aceCount = 0;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].rank !== 'A') {
            total += cards_value(hand[i].rank);
        } else {
            aceCount++;
        }
    } while (aceCount > 0 && total + 11 <= 21) {
        total += 11;
        aceCount--;
    } while (aceCount > 0) {
        total += 1;
        aceCount--;
    }
    return total;
}

/**
 * Decides the numerical value of a card rank.
 * @param {string|number} rank - The rank of the card, or a number
 * @returns {number} - The numerical value of the card rank
 */
function cards_value(rank) {
    if (typeof rank === 'number') {
        return rank;
    } else if (rank === 'J' || rank === 'Q' || rank === 'K') {
        return 10;
    } else if (rank === 'A') {
        return 11;
    }
}

/**
 * Function to write messages on the HTML website
 * @param {string} message - The message to be displayed
 * @returns {void} - This function does not return any value
 */
function view_message(message) {
    document.getElementById("messages").innerText = message; //HTML element that represents message area
}

/**
 * Compares the total value of the player's hand with the dealer's hand and "prints" out the messages
 * @param {Object} player - An object representing the player's hand
 * @param {Object} dealer - An object representing the dealer's hand
 * @returns {void} - This function does not return any value.
 */
function compare_hands(player, dealer) {
    if (player.total_cards_value > 21) {
        view_message(player.name + " busts! Dealer wins.");
    }
    else if (dealer.total_cards_value > 21) {
        view_message("Dealer bust! " + player.name + " winner");
    }
    else if (player.total_cards_value > dealer.total_cards_value) {
        view_message(player.name + " wins!");
    }
    else if (player.total_cards_value < dealer.total_cards_value) {
        view_message("Dealer wins!");
    }
    else if (player.total_cards_value == dealer.total_cards_value) {
        view_message("Push, no winner");
    }
}

/**
 * Evaluates the total value of the player's hand and adjusts the value 
 * of Aces, depending on the total hand value
 * @param {Object} player - An object representing the player's hand.
 * @returns {Object} - An updated object representing the player's hand.
 */
function evaluate_player(player) {
    player.total_cards_value = 0;
    for (let i = 0; i < player.cards.length; i++) {
        player.total_cards_value += cards_value(player.cards[i].rank);
    }
    if (player.total_cards_value > 21) {
        if (ace_check(player.cards) > 0) { //There is an ace in hand, change its value
            player.total_cards_value = evaluateHand(player.cards);
        }
    }
return player;
}

/**
 * Evaluates the total value of the dealer's hand and implementing the "rules" for the dealer.
 * @param {Array} deck - An array representing the deck of cards.
 * @param {Object} dealer - An object representing the dealer's hand.
 * @returns {void} - This function does not return any value.
 */
function evaluate_dealer(deck, dealer) {
    dealer.total_cards_value = 0;
    for (let i = 0; i < dealer.cards.length; i++) {
        dealer.total_cards_value += cards_value(dealer.cards[i].rank);
    }
    while (dealer.total_cards_value < 17) {
        dealCards(deck, dealer, 1);
        displayDealerCard(dealer);
        dealer.total_cards_value = evaluateHand(dealer.cards); //Checking for Aces
    }
    if (dealer.total_cards_value > 21){
        return;
    }
}

/**
 * Function that is in charge of the black jack gameplay, including the player's actions
 * and how the dealer should respond.
 * @param {Array} card_deck - An array representing the deck of cards.
 * @param {Object} player - An object representing the player.
 * @param {Object} dealer - An object representing the dealer.
 * @param {string} choice - The player's choice (Hit, Stand, or Double Down).
 * @returns {void} - This function does not return any value.
 */
function black_jack(card_deck, player, dealer, choice) {
    evaluate_player(player);
    displayCards(player.cards);
    if (player.total_cards_value <= 21) {
        if (choice === "Hit") {
            dealCards(card_deck, player, 1);
            evaluate_player(player);
            displayCards(player.cards);
            if (player.total_cards_value > 21) {
                view_message(player.name + " busts! Dealer wins.");
            }
        } else if (choice === "Stand") {
            evaluate_dealer(card_deck, dealer);
            compare_hands(player, dealer);
        }
    }
    document.getElementById("dealer-sum").innerText = dealer.total_cards_value; //Displays total hand value
    document.getElementById("your-sum").innerText = player.total_cards_value; //Displays total hand value
}

/**
 * Sets up the starting conditions for the black jack game.
 * @returns {void} - This function does not return any value.
 */
function blackJackSetup() {
    let card_deck = createDeck();
    shuffle(card_deck);

    let player = {
        cards: [],
        total_cards_value: 0,
        name: "Player",
    };
    let dealer = {
        cards: [],
        total_cards_value: 0,
        name: "Dealer" 
    };

    dealCards(card_deck, player, 2); // Initializing starter implementations for dealer and player
    dealCards(card_deck, dealer, 1);
    displayDealerCard(dealer);
    displayCards(player.cards);
    document.getElementById("hit").addEventListener("click", function () { 
        black_jack(card_deck, player, dealer, "Hit"); //calling black jack function when hit is pressed
    });
    document.getElementById("stand").addEventListener("click", function () {
        black_jack(card_deck, player, dealer, "Stand"); //calling black jack function when stand is pressed
    });
    evaluate_player(player); //showing the right sum from start
    document.getElementById("your-sum").innerText = player.total_cards_value;
    dealer.total_cards_value = evaluateHand(dealer.cards); //showing the right sum from start
    document.getElementById("dealer-sum").innerText = dealer.total_cards_value;
}

//This will call the black jack setup function and start the game every time the website is updated.
window.onload = function () {
    blackJackSetup();
};