import { popupController } from './modal.js';
import { profileId } from '../index';

const templateCard = document.querySelector('#card-template').content;
const cardPicturePopup = document.querySelector('#pict-popup');
const fullSizePicture = document.querySelector('.popup__full-pict');

export const cardController = {    
    createCard
}

function createCard(cardData) {
    
    const newCard = templateCard.querySelector('.gallery-card-list-element').cloneNode(true);    
    const newCardPic = newCard.querySelector('.gallery-card__pict');

    newCardPic.src = cardData.link;
    newCardPic.alt = `Фотография места: ${cardData.name}`;
    newCard.querySelector('.gallery-card__label-text').textContent = cardData.name;
    
    addListenerToCard(newCardPic);
    
    const likeBtn = newCard.querySelector('.gallery-card__like');
    
    likeBtn.addEventListener('click', function () {
        toggleLike(likeBtn);
    });

    if(availableToDelete(cardData)) {
        const delBtn = newCard.querySelector('.gallery-card__delete');
        toggleDeleteButton(delBtn);

        delBtn.addEventListener('click', function (event) {        
            let element = event.target;
    
            while (!element.classList.contains('gallery-card-list-element')) {
                element = element.parentElement;
            }
            
            element.remove();
        });
    }    
    
    return newCard;
}

function availableToDelete(cardData) {    
    if(cardData.owner._id === profileId) {        
        return true;
    }

    return false;
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

function toggleDeleteButton(element) {
    element.classList.remove('gallery-card__delete_restrict');
}

