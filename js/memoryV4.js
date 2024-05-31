
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

 // Fonction pour mélanger les cartes, elle trie aléatoirement les cartes à l'aide de la méthode sort() et l'expression Math.random() génère un nombre aléatoire entre -0.5 et 0.5 qui est ensuite utilisé pour déterminer l'ordre des cartes. La fonction shuffleBoard est appelée à la fin du script pour initialiser le plateau de jeu avec les cartes mélangées.
 function shuffleBoard() {
    board.forEach(row =>{
     row.sort(() => Math.random() - 0.5);
    });
 }

/*Cette fonction est chargée de réinitialiser l'état du jeu et de réinitialiser le plateau de jeu. Voici la décomposition du code :
Ligne 41 : La fonction restartGame() est déclarée.
Ligne 42 : La fonction shuffleBoard() est appelée pour réarranger aléatoirement les cartes sur le plateau de jeu.
Ligne 43 : La variable counter est remise à 0, ce qui permet de comptabiliser le nombre de tentatives effectuées par le joueur.
Ligne 44 : Les variables firstCard et secondCard sont mises à zéro, représentant les deux cartes que le joueur sélectionnées.
Ligne 45 : La fonction renderBoard() est appelée pour mettre à jour le plateau de jeu avec le nouvel état.

La fonction restartGame() est appelée lorsque le joueur souhaite redémarrer le jeu. Elle s'assure que le plateau de jeu est mélangé, que les pions sont remis à zéro et que l'état du jeu est préparé pour un nouveau tour.*/

 function restartGame() {
    shuffleBoard();
    counter = 0;
    firstCard = null;
    secondCard = null;
    renderBoard();
    //how to init board = [] ?

}


/*la fonction renderBoard, qui est chargée de générer dynamiquement la structure HTML du plateau de jeu de mémoire en fonction de l'état actuel du jeu. Voici la décomposition du code :

1. La fonction commence par sélectionner l'élément conteneur dans lequel le plateau de jeu sera rendu en utilisant document.getElementById('container'). Elle efface ensuite le contenu existant du conteneur en définissant container.innerHTML = ''. */

 function renderBoard() {
    const container = document.getElementById('container');
    container.innerHTML = '';

/* 2. Le plateau de jeu est représenté sous la forme d'un tableau 2D appelé board. La fonction itère sur chaque ligne du tableau en utilisant board.forEach(row => {...}).

3. Pour chaque ligne, un nouvel élément de ligne de tableau (<tr>) est créé à l'aide de document.createElement('tr'). La classe "row" est ajoutée à l'élément row à l'aide de rowElement.classList.add('row').*/

    board.forEach(row => {
        const rowElement = document.createElement('tr');
        rowElement.classList.add('row');

/*4. Ensuite, la fonction itère sur chaque carte de la rangée en utilisant row.forEach(card => {...}).

5. Pour chaque carte, un nouvel élément de données de tableau (<td>) est créé à l'aide de document.createElement('td'). La classe "card" est ajoutée à l'élément card à l'aide de cardElement.classList.add('card'). L'identifiant de la carte est attribué en tant qu'attribut de données à l'aide de cardElement.dataset.id = card.id.*/

        row.forEach(card => {
            const cardElement = document.createElement('td');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id;

/* 6. À l'intérieur de l'élément card, un élément image (<img>) est créé à l'aide de document.createElement('img'). La source de l'image est définie en fonction de l'état de visibilité de la carte. Si la carte est visible, la source est définie sur l'URL de l'image (card.img). Dans le cas contraire, la source de l'image est définie sur l'URL de l'image arrière ('/memory-js/img/back.webp'). La classe "memory" est ajoutée à l'élément image en utilisant imgElement.classList.add('memory'). Une propriété de transition est ajoutée à l'élément image pour animer l'effet de retournement en utilisant imgElement.style.transition = 'transform 0.3s'. */
            
            const imgElement = document.createElement('img');
            imgElement.src = card.visible ? card.img : '/memory-js/img/back.webp';
            imgElement.classList.add('memory');
            imgElement.style.transition = 'transform 0.3s'; // ajouter la propriété transition à l'élément img

/*7. L'élément image est ajouté à l'élément carte à l'aide de cardElement.appendChild(imgElement)*/
            cardElement.appendChild(imgElement);

/*8. Un écouteur d'événement de clic est ajouté à l'élément card en utilisant cardElement.addEventListener('click', () => {...}). Cet écouteur appelle la fonction flip lorsque la carte est cliquée. La fonction vérifie s'il y a déjà deux cartes retournées ou si la carte cliquée est déjà visible. Si l'une de ces conditions est vraie, la fonction retourne sans effectuer aucune action.*/

            cardElement.addEventListener('click', () => {
                if (firstCard && secondCard || card.visible) {
                    return;
                }
                flip(card);
            });

/*9. L'élément carte est ajouté à l'élément ligne à l'aide de rowElement.appendChild(cardElement).*/
            rowElement.appendChild(cardElement);
        });
        
/*10. Une fois que toutes les cartes d'une rangée ont été traitées, l'élément de rangée est ajouté à l'élément de conteneur à l'aide de container.appendChild(rowElement).*/
        container.appendChild(rowElement);
    });

/*11. Lorsque toutes les lignes ont été traitées, la fonction vérifie si toutes les paires de cartes ont été trouvées (pairsFound === 8). Si c'est le cas, un message est affiché à l'utilisateur en utilisant setTimeout(() => {...}, 1000).*/
    if (pairsFound === 8) {
        setTimeout(() => {
            alert('GG tu es un winner ! Tu as trouvé toutes les paires de cartes en ' + counter + ' coups');
        }, 1000);
    }
    
/*12. L'élément de la valeur du compteur est sélectionné à l'aide de document.getElementById('counter-value') et la valeur du compteur est mise à jour à l'aide de counterValueElement.innerText = counter.*/
    const counterValueElement = document.getElementById('counter-value');
    counterValueElement.innerText = counter;
}

/*Cette fonction est chargée de gérer la logique de retournement des cartes dans le jeu de mémoire.
1. La fonction commence par vérifier s'il y a déjà deux cartes retournées ou si la carte sur laquelle on clique est déjà retournée. Si l'une de ces conditions est vraie, la fonction retourne sans rien faire.
*/

function flip(card) {
    if (firstCard && secondCard || card.flipped) {
        return;
    }

/*2. Si firstCard n'est pas définie, la fonction définit firstCard comme étant la carte actuellement cliquée et met à jour la source d'image pour révéler la face de la carte. Elle applique également une transition CSS pour faire pivoter la carte de 180 degrés. */

/*3. Si firstCard est déjà définie, la fonction définit secondCard comme étant la carte actuellement cliquée et met à jour la source de l'image pour révéler la face de la carte. Elle applique également une transition CSS pour faire pivoter la carte de 180 degrés. */

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

/*4. La fonction vérifie ensuite si les images de firstCard et secondCard sont identiques. Si c'est le cas, elle attribue la valeur true aux propriétés flipped et visible des deux cartes, ce qui indique qu'elles ont été trouvées. Elle réinitialise également firstCard et secondCard à null et incrémente pairsFound de 1.

5. Si les images de firstCard et secondCard ne sont pas identiques, la fonction attend 500 millisecondes en utilisant setTimeout pour simuler le délai entre le retournement des cartes. Pendant ce temps, elle applique une transition CSS pour faire pivoter les cartes de 180 degrés à nouveau.
*/
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

/*6. Après les 500 millisecondes, la fonction vérifie si firstCard et secondCard sont toujours définies et si leurs images sont identiques. Si ce n'est pas le cas, elle attribue la valeur false à la propriété visible des deux cartes, ce qui indique qu'elles ont été retournées. Elle réinitialise également firstCard et secondCard à null. */

            setTimeout(() => {
            if (firstCard && secondCard && firstCard.img === secondCard.img) {
            } else {
                    firstCard.visible = false;
                    secondCard.visible = false;
                    firstCard = null;
                    secondCard = null;
                }
/*7. La fonction incrémente le compteur de 1 pour garder une trace du nombre de tentatives effectuées par le joueur. */
                counter++;

/*8. Enfin, la fonction appelle la fonction renderBoard pour mettre à jour le plateau de jeu avec le nouvel état des cartes. */
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