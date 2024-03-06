import * as PromptSync from 'prompt-sync';
const prompt = PromptSync();

const red = [0,1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
const black = [0,2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]

/**
 * Evaluates the outcome of a roulette game based on the where the roulette ball stopped,
 * player's choice of game, bet, and current balance.
 * @param {number} spinner - where the ball stopped at
 * @example - evaluator(12, "1", 12, 900); returns balance = 924
 * @param {string} choice - The player's choice of game.
 * @param {number} bet - The amount of bet placed.
 * @param {number} balance - The players current balance.
 * @returns {number} - The updated balance after evaluating the game outcome.
 */
export function evaluator(spinner: number, choice: string,
                         bet : number, balance: number): number {
    if (choice === "1") {
        if (red.includes(spinner)) {
            balance = balance + bet * 2;
            console.log("Win! Balance:", balance) 
        } else {
            console.log("Lost. Balance: ", balance)           
        }
    } else if (choice === "2") {1
        if (black.includes(spinner)) {
            balance = balance + bet * 2;
            console.log("Win! Balance:", balance) 
        } else {            
            console.log("Lost. Balance: ", balance)
        }
    } else if (choice === "3") {
        if (spinner >= 0 && spinner <= 11) {
            balance = balance + bet * 4;
            console.log("Win! Balance:", balance) 
        } else {       
            console.log("Lost. Balance: ", balance)
        }
    } else if (choice === "4") {
        if (spinner >= 12 && spinner <= 24) {
            balance = balance + bet * 4;
            console.log("Win! Balance:", balance) 
        } else {            
            console.log("Lost. Balance: ", balance)
        }
    } else if (choice === "5") {
        if (spinner >= 25 && spinner <= 36) {
            balance = balance + bet * 4;
            console.log("Win! Balance:", balance) 
        } else {           
            console.log("Lost. Balance: ", balance)
        }
    } else if (choice === "6") {
        if (spinner >= 0 && spinner <= 17) {
            balance = balance + bet * 3;
            console.log("Win! Balance:", balance) 
        } else {        
            console.log("Lost. Balance: ", balance)
        }
    } else if (choice === "7") {
        if (spinner >= 18 && spinner <= 36) {
            balance = balance + bet * 3;
            console.log("Win! Balance:", balance) 
        } else {         
            console.log("Lost. Balance: ", balance)
        }
    } else if (choice === "8") {
        const chosen_number = parseInt(prompt("Choose a single digit (0-36): "));
        if (chosen_number === spinner) {
            balance = balance + bet * 30;
            console.log("Win! Balance:", balance) 
        } else {
            console.log("Lost. Balance: ", balance)
        }
    } else {
        console.log("Invalid input, returning home!")
        return balance;
    }
    console.log("Ball stopped at: ",spinner)
    return balance;
}