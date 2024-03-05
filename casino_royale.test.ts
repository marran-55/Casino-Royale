// blackjack.test.ts
import {
    black_jack_setup,
    draw_cards,
    dealer_cards,
    compare_hands,
    ace_check,
    evaluate_player
  } from './blackjack';
  import { player, dealer, deck, card, createDeck, array_to_stack } from './types';
  import { empty } from '../../lib/stack';
  import { evaluator } from './roulette';
  
  describe('Blackjack Functions', () => {
    let playerMock: player;
    let playerMock_ace: player;
    let dealerMock: dealer;
    let deckMock: deck;
    let initialBet: number;
  
    beforeEach(() => {
      playerMock =  {
                    balance: 900,
                cards: [{rank: 10,suit: '♥'},
                     {rank: 9,suit: '♥'}],
                name: 'Samir Vallentinsson',
                total_cards_value: 19,
                };
    playerMock_ace =  {
        balance: 50,
        cards: [{rank: 9,suit: '♥'},
                   {rank: 'A',suit: '♥'},
                   {rank: 3 ,suit: 'C'}],
        name: 'Samir Vallentinsson',
              total_cards_value: 23,
              };
      dealerMock =  {cards: [{rank: 9,suit: 'C',},
                             {rank: 3,suit: '♥'} ],
                     total_cards_value: 12};
      deckMock = array_to_stack(createDeck({
                                 stack: empty<card>(),
                                 Arr: []
                                }));
      initialBet = 100;
    });
  
    test('draw_cards should add a card to the playerMock', () => {
      draw_cards(playerMock, deckMock, 1)
      expect(playerMock.cards).toStrictEqual([{rank: 10,suit: '♥'},
      {rank: 9,suit: '♥'},{rank: 'K',suit: '♦'} ])
    });

    test('compare_hands should handle the dealer loses if the player has a better hand', () => {
      compare_hands(dealerMock, playerMock, initialBet)
      expect(playerMock.balance).toStrictEqual(1100)
    });

    test('dealer_cards should draw cards until the dealer has a total value of at least 16', () => {
      dealer_cards(dealerMock, deckMock);
      expect(dealerMock.total_cards_value).toBeGreaterThanOrEqual(16);
    });

    test('compare_hands should handle the dealer going bust', () => {
      dealerMock.total_cards_value = 22;
      compare_hands(dealerMock, playerMock, initialBet)
      expect(playerMock.balance).toStrictEqual(1100)
    });
    
    test('aceCheck should notice there is an ace, and use the right value in the player hand', () => {
       if (playerMock_ace.total_cards_value > 21) {
        if (ace_check(playerMock_ace) > 0) {
            playerMock_ace.total_cards_value = evaluate_player(playerMock_ace);
            }
        expect(playerMock_ace.total_cards_value).toStrictEqual(13);
        }
    });

    test('black_jack_setup should correctly add cards in hands', () => {
      const [dealer, player, deck] = black_jack_setup('Samir Vallentinsson', 1000, 100);
      expect(dealer.cards.length).toBe(1); 
      expect(player.cards.length).toBe(2); 
    });
});

describe('Roulette Evaluator', () => {
    let spinner: number;
    let choice: string;
    let bet: number;
    let balance: number;

    beforeEach(() => {
        bet = 50;
        balance = 1000;
    });

    test('Black bet wins if spinner result is black', () => {
        choice = "2";
        spinner = 10;
        balance = evaluator(spinner, choice, bet, balance);
        expect(balance).toBe(1100);
    });

    test('Black bet loses if spinner result is red', () => {
      choice = "2";
      spinner = 1;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1000);
    });

    test('Red bet loses if spinner result is black', () => {
        choice = "1";
        spinner = 10;
        balance = evaluator(spinner, choice, bet, balance);
        expect(balance).toBe(1000);
    });

    test('Red bet wins if spinner result is red', () => {
      choice = "1";
      spinner = 14;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1100);
    });

    test('Number range bet wins if spinner result is within the selected range', () => {
      choice = "4";
      spinner = 15;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1200);
    });

    test('Number range bet loses if spinner result isnt within the selected range', () => {
      choice = "4";
      spinner = 11;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1000);
    });

    test('Number range bet loses if spinner result isnt within the selected range', () => {
      choice = "5";
      spinner = 7;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1000);
    });

    test('Number range bet wins if spinner result isnt within the selected range', () => {
      choice = "5";
      spinner = 28;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1200);
    });

    test('Number range bet wins if spinner result is within the selected range', () => {
      choice = "3";
      spinner = 7;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1200);
    });

    test('Number range bet loses if spinner result isnt within the selected range', () => {
      choice = "3";
      spinner = 12;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1000);
    });

    test('Invalid input returns the same balance', () => {
        choice = "9";
        const initialBalance = balance;
        balance = evaluator(spinner, choice, bet, balance);
        expect(balance).toBe(initialBalance);
    });

    test('Number range bet wins if spinner result is outside the selected range', () => {
      choice = "6";
      spinner = 15;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1150);
    });

    test('Number range bet loses if spinner result isnt outside the selected range', () => {
      choice = "6";
      spinner = 25;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1000);
    });

    test('Number range bet wins if spinner result is outside the selected range', () => {
      choice = "7";
      spinner = 18;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1150);
    });

    test('Number range bet loses if spinner result is outside the selected range', () => {
      choice = "7"; 
      spinner = 13;
      balance = evaluator(spinner, choice, bet, balance);
      expect(balance).toBe(1000);
    });
});