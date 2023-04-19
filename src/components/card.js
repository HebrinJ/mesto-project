import { popupController } from './modal.js';

const templateCard = document.querySelector('#card-template').content;
const cardPicturePopup = document.querySelector('#pict-popup');
const fullSizePicture = document.querySelector('.popup__full-pict');

export const cardController = {    
    createCard,
}

function createCard(cardPic, cardName) {
    
    const newCard = templateCard.querySelector('.gallery-card-list-element').cloneNode(true);    
    const newCardPic = newCard.querySelector('.gallery-card__pict');

    newCardPic.src = cardPic;
    newCardPic.alt = `Фотография места: ${cardName}`;
    newCard.querySelector('.gallery-card__label-text').textContent = cardName;
    
    addListenerToCard(newCardPic);
    
    const likeBtn = newCard.querySelector('.gallery-card__like');
    const delBtn = newCard.querySelector('.gallery-card__delete');
    
    likeBtn.addEventListener('click', function () {
        toggleLike(likeBtn);
    });

    delBtn.addEventListener('click', function (event) {        
        let element = event.target;

        while (!element.classList.contains('gallery-card-list-element')) {
            element = element.parentElement;
        }
        
        element.remove();
    });
    
    return newCard;
}

function addListenerToCard(card) {
    card.addEventListener('click', function() {
        popupController.openPopup(cardPicturePopup);
        fullSizePicture.src = card.src;
        fullSizePicture.alt = 'Фотография места';
    });
}

function toggleLike(card) {
    card.classList.toggle('gallery-card__like_active');
}

