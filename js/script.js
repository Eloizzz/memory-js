const memoryBoard = document.querySelector('.memory-board');
const counterValue = document.querySelector('#counter-value');

let cards = [];
let hasFlippedCard = false;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let coups = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        coups++;
        counterValue.textContent = coups;
        if (document.querySelectorAll('.matched').length === cards.length) {
            setTimeout(() => {
                memoryBoard.classList.add('animate');
                setTimeout(() => {
                    alert('Bravo, vous avez gagné !');
                    location.reload();
                },
                1000);
}, 1000);
}
} else {
lockBoard = true;
setTimeout(() => {
firstCard.classList.remove('flipped');
secondCard.classList.remove('flipped');
lockBoard = false;
}, 1000);
}
}

function shuffle() {
cards = [
'card1.jpg', 'card1.jpg',
'card2.jpg', 'card2.jpg',
'card3.jpg', 'card3.jpg',
'card4.jpg', 'card4.jpg',
'card5.jpg', 'card5.jpg',
'card6.jpg', 'card6.jpg',
'card7.jpg', 'card7.jpg',
'card8.jpg', 'card8.jpg'
];

for (let i = cards.length - 1; i > 0; i--) {
let j = Math.floor(Math.random() * (i + 1));
[cards[i], cards[j]] = [cards[j], cards[i]];
}
}

function createBoard() {
shuffle();

for (let i = 0; i < cards.length; i++) {
const memoryCard = document.createElement('div');
memoryCard.classList.add('memory-card');
memoryCard.dataset.image = cards[i];

const memoryCardFront = document.createElement('div');
memoryCardFront.classList.add('memory-card-front');
memoryCardFront.style.backgroundImage = url(cards[i]);

const memoryCardBack = document.createElement('div');
memoryCardBack.classList.add('memory-card-back');

memoryCard.appendChild(memoryCardFront);
memoryCard.appendChild(memoryCardBack);
memoryCard.addEventListener('click', flipCard);
memoryBoard.appendChild(memoryCard);
}
}

createBoard();
