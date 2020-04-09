const suits = ["Hearts", "Diamonds","Clubs" ,"Spades"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];

const blackJackMap = {
    'Ace': 1,
    'King': 10,
    'Queen': 10,
    'Jack': 10
}

class Card {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
    }
}

class Deck {
    constructor(){
        this.deck = [];
    }

    openDeck(suits, values){
        for(const suit of suits){
            for(const value of values){
                this.deck.push(new Card(value, suit));
            }
        }
    }

    shuffle() {
        let counter = this.deck.length;
        let temp = null;
        let i = 0;

        while(counter){
            i = Math.floor(Math.random() * counter--);
            temp = this.deck[counter];
            this.deck[counter] = this.deck[i];
        }
        
    }

    deal(amount){
        let dealtCards = [];
        while(dealtCards.length < amount){
            dealtCards.push(this.deck.pop());
        }

        return dealtCards;
    }
}


function count(hand){
    let currentCount = 0;
    for(const card of hand){
        if(card.value === "Jack" || card.value === "Queen"
         || card.value === "King" || card.value === "Ace"){
            currentCount += blackJackMap[card.value];
        } else {
            currentCount += card.value;
        }
    }

    return currentCount;
}

class Player {
    constructor(hand){
        this.hand = this.translate(hand);
        this.count = count(hand);
    }

    translate(hand){
        return hand.map(({value, suit}) => ` ${value} of ${suit}`).join()
    }

    addCard(newCard){
        this.hand = this.hand + ", " + this.translate(newCard);
        this.count += count(newCard);
    }
}

class Game {
    constructor(shuffledDeck){
        this.table = new Player(shuffledDeck.deal(2));
        this.me = new Player(shuffledDeck.deal(2));
    }

    pickWinner(){
        const myDif = 21 - this.me.count;
        const tableDif = 21 - this.table.count;
        if(myDif <= tableDif){
            return 'The contestant has won';
        } else {
            return 'The table has won';
        }
    }
}

let match = null;
let blackJackDeck = null;

function startGame(){
    blackJackDeck = new Deck();
    blackJackDeck.openDeck(suits, values);
    blackJackDeck.shuffle();

    match = new Game(blackJackDeck);
    return match;
}

function getCard(){
    match.me.addCard(blackJackDeck.deal(1));

    if(match.me.count > 21){
        console.log(match);
        return "You have lost";
    }
    
    return match;
}

function tablesTurn(){
    while(match.table.count <= match.me.count){
        match.table.addCard(blackJackDeck.deal(1));
        console.log(match);

        if(match.table.count > 21){
            return "The table has lost";
        }
    }
    return match.pickWinner();
}