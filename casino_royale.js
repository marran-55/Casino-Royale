"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slots = exports.roulette = exports.black_jack = void 0;
var blackjack_1 = require("./blackjack");
var roulette_1 = require("./roulette");
var PromptSync = require("prompt-sync");
var fs = require("fs");
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
var prompt = PromptSync();
var filePath = './users.json';
/**
 * Function that allows the player to place a bet.
 * @returns {number} - numeric value of the bet.
 */
function make_bet() {
    var bet = parseInt(prompt("Make a bet: "));
    return bet;
}
/**
 * Finds a user by username in user data array.
 * @param {user[]} user_data - Array containing user data.
 * @param {string} username - The username to search for.
 * @returns {number | undefined} - Index of the user if found, otherwise nothing
 */
function find_user(user_data, username) {
    for (var i = 0; i < user_data.length; i++) {
        if (user_data[i].username === username) {
            return i;
        }
    }
    return undefined;
}
/**
 * Function that reads user data from a JSON file.
 * @returns {Array<number>} - Array with user data
 */
function view_users() {
    try {
        var data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (err) {
        console.error('Error reading user data:', err);
        return [];
    }
}
/**
 * Function that handles the user log in and sign up.
 * @returns {user} - The user object representing the logged in user.
 */
function login() {
    var user_data = view_users();
    console.log("Welcome to Casino Royale!");
    while (true) {
        var login_choice = prompt("1. Log in, 2. Sign up, 3. Quit: ");
        if (typeof login_choice === 'string') {
            while (login_choice !== '1' && login_choice !== '2' && login_choice !== "3") {
                login_choice = prompt('Try again: ');
            }
            if (login_choice === '2') {
                var username = prompt('Username: ');
                if (find_user(user_data, username) === undefined) {
                    var password = prompt('Password: ');
                    var new_user = { username: username, password: password, balance: 0 };
                    user_data.push(new_user);
                    fs.writeFileSync(filePath, JSON.stringify(user_data, null, 2), 'utf-8');
                    return new_user;
                }
                else {
                    console.log("Username already taken.");
                }
            }
            else if (login_choice === '1') {
                var username = prompt('Username: ');
                var password = prompt('Password: ');
                var index_1 = find_user(user_data, username);
                if (index_1 !== undefined && user_data[index_1].password === password) {
                    return user_data[index_1];
                }
                console.log('Incorrect password or username, try again');
            }
            else if (login_choice === "3") {
                process.exit(1);
            }
        }
        else {
            console.log('Only strings please');
        }
    }
}
/**
 * Displays the menu and handles the user choices for the different games.
 * @param {user} user - The user object representing the current user.
 * @returns {user} - The updated user object.
 */
function menu(user) {
    while (true) {
        console.log("What would you like to do?");
        var choice = prompt(" 1. Blackjack, 2. Roulette, 3. Slots, 4. Deposit, 5. Quit: ");
        if (choice === "1") {
            console.log("Balance;", user.balance);
            var bet = make_bet();
            var black_data = (0, blackjack_1.black_jack_setup)(user.username, user.balance, bet);
            user.balance = black_jack(black_data[0], black_data[1], black_data[2], bet);
        }
        else if (choice === "2") {
            user.balance = roulette(user.balance);
        }
        else if (choice === "3") {
            user.balance = slots(user.balance);
        }
        else if (choice === "5") {
            return user;
        }
        else if (choice === "4") {
            console.log("Balance:", user.balance);
            var balance = parseInt(prompt("Enter deposit amount: "));
            user.balance += balance;
        }
        else {
            console.log("Incorrect input.");
        }
    }
}
/**
* Function that handles the different choices from the player and simulates a game of black jack.
* @param {dealer} dealer - Object representing the dealer's hand.
* @param {player} player - Object representing the player's hand.
* @param {deck} card_deck - Object representing the deck of cards.
* @param {number} bet - The bet amount placed by the player.
* @returns {number} - The updated balance of the player.
*/
function black_jack(dealer, player, card_deck, bet) {
    while (player.total_cards_value <= 21) {
        console.log(player.name, "CARDS:", player.cards);
        var choice = prompt("1. Hit, 2. Stand, 3. Double down: ");
        if (choice === "1") {
            (0, blackjack_1.draw_cards)(player, card_deck);
            console.log(player.total_cards_value);
        }
        else if (choice === "2") {
            (0, blackjack_1.dealer_cards)(dealer, card_deck);
            dealer.total_cards_value = (0, blackjack_1.evaluate_player)(dealer);
            player.total_cards_value = (0, blackjack_1.evaluate_player)(player);
            (0, blackjack_1.compare_hands)(dealer, player, bet);
            return player.balance;
        }
        else if (choice === "3") {
            (0, blackjack_1.draw_cards)(player, card_deck);
            player.total_cards_value = (0, blackjack_1.evaluate_player)(player);
            (0, blackjack_1.dealer_cards)(dealer, card_deck);
            player.balance -= bet;
            bet *= 2;
            (0, blackjack_1.compare_hands)(dealer, player, bet);
            return player.balance;
        }
    }
    if (player.total_cards_value > 21) {
        if ((0, blackjack_1.ace_check)(player) > 0) {
            player.total_cards_value = (0, blackjack_1.evaluate_player)(player);
            black_jack(dealer, player, card_deck, bet);
        }
        else {
            console.log(player.name, player.cards);
            console.log(player.name, "busts, dealer wins.");
            return player.balance;
        }
    }
    return player.balance;
}
exports.black_jack = black_jack;
/**
* Simulates a game of roulette.
* @param {number} balance - The current balance of the player.
* @returns {number} - The updated balance of the player after the game.
*/
function roulette(balance) {
    while (balance > 0) {
        console.log("1. Red, 2. Black, 3. 0-11, 4. 12-24, 5. 24-36, 6. 0-17. 7. 18-36, 8. Choose single digit");
        var choice = prompt("Choose between options: ");
        var spinner = Math.floor(Math.random() * board.length);
        console.log("Balance:", balance);
        var bet = make_bet();
        balance = (0, roulette_1.evaluator)(spinner, choice, bet, balance - bet);
        var qplay = prompt("1. Play again, 2. Exit: ");
        if (qplay !== "1") {
            console.log("Returning home!");
            return balance;
        }
    }
    console.log("No more cash, returning home!");
    return balance;
}
exports.roulette = roulette;
/**
* Simulates a game of slots.
* @param {number} funds - The current funds of the player.
* @returns {number} - The updated funds of the player after the game.
*/
function slots(funds) {
    var arr = [["BAR", "7", "Cherry"], ["Cherry", "BAR", "7"], ["7", "Cherry", "BAR"]];
    while (funds >= 10) {
        console.log("Balance:", funds);
        var qplay = prompt("1. Play the slot machine, 2. Exit: ");
        if (qplay === "1") {
            var hej = arr.map(function (x) { return x[Math.floor(Math.random() * x.length)]; });
            if (hej[0] === hej[1] && hej[0] === hej[2]) {
                funds = funds + 50;
                console.log(hej, ": You won 50 bucks!");
            }
            else {
                funds = funds - 5;
                console.log(hej, ": You lost 5 bucks.");
            }
        }
        else if (qplay === "2") {
            return funds;
        }
        else {
            console.log("Invalid input, try again.");
            return funds;
        }
    }
    console.log("Out of funds, returning home!");
    return funds;
}
exports.slots = slots;
var user = login();
console.log("Balance:", user.balance);
var users = view_users();
user = menu(user);
var index = find_user(users, user.username);
if (index !== undefined) {
    users[index] = user;
}
fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
