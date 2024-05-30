const board = [
    [
        { id: '0', img:'/memory-js/img/card1.webp', visible: false, flipped: false },
        { id: '1', img:'/memory-js/img/card2.webp', visible: false, flipped: false },
        { id: '2', img:'/memory-js/img/card3.webp', visible: false, flipped: false },
        { id: '3', img:'/memory-js/img/card4.webp', visible: false, flipped: false }
    ],
    [
        { id: '4', img:'/memory-js/img/card5.webp', visible: false, flipped: false },
        { id: '5', img:'/memory-js/img/card6.webp', visible: false, flipped: false },
        { id: '6', img:'/memory-js/img/card7.webp', visible: false, flipped: false },
        { id: '7', img:'/memory-js/img/card8.webp', visible: false, flipped: false }
    ],
    [
        { id: '8', img:'/memory-js/img/card1.webp', visible: false, flipped: false },
        { id: '9', img:'/memory-js/img/card2.webp', visible: false, flipped: false },
        { id: '10', img:'/memory-js/img/card3.webp', visible: false, flipped: false },
        { id: '11', img:'/memory-js/img/card4.webp', visible: false, flipped: false }
    ], 
    [
        { id: '12', img:'/memory-js/img/card5.webp', visible: false, flipped: false },
        { id: '13', img:'/memory-js/img/card6.webp', visible: false, flipped: false },
        { id: '14', img:'/memory-js/img/card7.webp', visible: false, flipped: false },
        { id: '15', img:'/memory-js/img/card8.webp', visible: false, flipped: false }
    ]
 ]; 

 let firstCard = null;
 let secondCard = null;
 let counter = 0;
 let pairsFound = 0;

 function shuffleBoard() {
    board.forEach(row =>{
     row.sort(() => Math.random() - 0.5);
    });
 }


 function restartGame() {
    shuffleBoard();
    counter = 0;
    firstCard = null;
    secondCard = null;
    renderBoard();
}

 function renderBoard() {
    const container = document.getElementById('container');
    container.innerHTML = '';

    board.forEach(row => {
        const rowElement = document.createElement('tr');
        rowElement.classList.add('row');

        row.forEach(card => {
            const cardElement = document.createElement('td');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id;

            const imgElement = document.createElement('img');
            imgElement.src = card.visible ? card.img : '/memory-js/img/back.webp';
            imgElement.classList.add('memory');
            imgElement.style.transition = 'transform 0.3s'; // ajouter la propriété transition à l'élément img
            cardElement.appendChild(imgElement);

            cardElement.addEventListener('click', () => {
                if (firstCard && secondCard || card.visible) {
                    return;
                }
                flip(card);
            });

            rowElement.appendChild(cardElement);
        });

        container.appendChild(rowElement);
    });

    if (pairsFound === 8) {
        setTimeout(() => {
            alert('GG tu es un winner ! Tu as trouvé toutes les paires de cartes en ' + counter + ' coups');
        }, 1000);
    }
    const counterValueElement = document.getElementById('counter-value');
    counterValueElement.innerText = counter;
}


function flip(card) {
    if (firstCard && secondCard || card.flipped) {
        return;
    }

    if (!firstCard) {
        firstCard = card;
        const imgElement = document.querySelector(`td[data-id="${firstCard.id}"] img`);
        imgElement.src = firstCard.img;
        imgElement.style.transform = 'rotateY(180deg)'; // appliquer la première étape de la transition
    } else {
        secondCard = card;
        const imgElement = document.querySelector(`td[data-id="${secondCard.id}"] img`);
        imgElement.src = secondCard.img;
        imgElement.style.transform = 'rotateY(180deg)'; // appliquer la première étape de la transition

        if (firstCard.img === secondCard.img) {
            firstCard.flipped = true;
            secondCard.flipped = true;
            firstCard.visible = true;
            secondCard.visible = true;
            firstCard = null;
            secondCard = null;
            pairsFound++;
        } else {
            setTimeout(() => {
                // appliquer la deuxième étape de la transition
                const firstImgElement = document.querySelector(`td[data-id="${firstCard.id}"] img`);
                firstImgElement.style.transform = 'rotateY(180deg)';
                const secondImgElement = document.querySelector(`td[data-id="${secondCard.id}"] img`);
                secondImgElement.style.transform = 'rotateY(180deg)';
            }, 500); // utiliser un délai de 0,5 seconde pour correspondre à la durée de la transition

            setTimeout(() => {
            if (firstCard && secondCard && firstCard.img === secondCard.img) {
            } else {
                    firstCard.visible = false;
                    secondCard.visible = false;
                    firstCard = null;
                    secondCard = null;
                }
                counter++;
                renderBoard(); // appeler renderBoard pour mettre à jour l'affichage
            }, 600);
        }
    }

}


document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
      event.preventDefault();
      shuffleBoard();
      firstCard = null;
      secondCard = null;
      counter = 0;
      pairsFound = 0;
      restartGame();
      renderBoard();
    }
});

shuffleBoard();
renderBoard();