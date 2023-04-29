import { popupController } from './modal.js';
import { profileId } from '../index';
import { apiController } from './api.js';

const templateCard = document.querySelector('#card-template').content;
const cardPicturePopup = document.querySelector('#pict-popup');
const fullSizePicture = document.querySelector('.popup__full-pict');
const pictureLabel = document.querySelector('.popup__pict-label');
const likeActiveSelector = 'gallery-card__like_active';
const likeSelector = 'gallery-card__like';

export const cardController = {    
    createCard,
    setLikeCountToCard,
    renderLike,
    isItLikeOwner
}

function createCard(cardData) {        
    const newCard = setCardDataToTemplate(cardData);    
    const likeBtn = newCard.querySelector(`.${likeSelector}`);
    
    likeBtn.addEventListener('click', function () {        
        likeHandler(newCard, cardData._id);
    });

    if(availableToDelete(cardData)) {
        const delBtn = newCard.querySelector('.gallery-card__delete');
        toggleDeleteButton(delBtn);
        
        delBtn.addEventListener('click', function () {            
            deleteCard(cardData, newCard);
        });
    }    

    setLikeCountToCard(newCard, cardData.likes.length);
        
        if(isItLikeOwner(cardData)) {
            renderLike(newCard, true)
        }
    
    return newCard;
}

function setCardDataToTemplate(cardData) {
    const newCard = templateCard.querySelector('.gallery-card-list-element').cloneNode(true);    
    const newCardPic = newCard.querySelector('.gallery-card__pict');

    newCardPic.src = cardData.link;
    newCardPic.alt = `Фотография места: ${cardData.name}`;
    newCard.querySelector('.gallery-card__label-text').textContent = cardData.name;
    addListenerToCard(newCardPic, cardData);

    return newCard;
}

function deleteCard(cardData, card) {    
    apiController.deleteCard(cardData._id)
        .then(() => card.remove())
        .catch((err) => console.log(err));
}

function availableToDelete(cardData) {         
    if(cardData.owner._id === profileId) {        
        return true;
    }

    return false;
}

function addListenerToCard(card, cardData) {
    card.addEventListener('click', function() {
        popupController.openPopup(cardPicturePopup);
        fullSizePicture.src = card.src;
        fullSizePicture.alt = cardData.name;
        pictureLabel.textContent = cardData.name;
    });
}

function toggleDeleteButton(element) {
    element.classList.remove('gallery-card__delete_restrict');
}

function likeHandler(card, cardId) {
    const likeButton = card.querySelector(`.${likeSelector}`);
    
    if(!likeButton.classList.contains(likeActiveSelector)) {
        // Своего лайка нет - добавляем
        apiController.setLike(cardId)
        .then((newCardData) => {
            renderLike(card, true);
            setLikeCountToCard(card, newCardData.likes.length);            
        })
        .catch((err) => console.log(err))
    } else {
        //Свой лайк есть, удаляем его
        apiController.removeLike(cardId)
        .then ((newCardData) => {
            setLikeCountToCard(card, newCardData.likes.length);
            renderLike(card, false);
        })
        .catch((err) => console.log(err))
    }   
}

function isItLikeOwner(cardData) {    
    const likes = cardData.likes;

    if(cardData.likes.length === 0) {
        return false;
    }

    for (let i = 0; i < likes.length; i++) {
        if(likes[i]._id === profileId) {                      
            return true;
        }
    }

    return false;
}

function setLikeCountToCard(card, count) {
    const countElement = card.querySelector('.gallery-card__like-count');
    countElement.textContent = count;
}

function renderLike (card, state) {
    const like = card.querySelector(`.${likeSelector}`);  

    if(state) {
        like.classList.add(likeActiveSelector);
    } else {
        like.classList.remove(likeActiveSelector);
    }
}
