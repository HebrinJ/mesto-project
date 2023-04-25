import { popupController } from './modal.js';
import { profileId } from '../index';
import { apiController } from './api.js';

const templateCard = document.querySelector('#card-template').content;
const cardPicturePopup = document.querySelector('#pict-popup');
const fullSizePicture = document.querySelector('.popup__full-pict');
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
    
    return newCard;
}

function setCardDataToTemplate(cardData) {
    const newCard = templateCard.querySelector('.gallery-card-list-element').cloneNode(true);    
    const newCardPic = newCard.querySelector('.gallery-card__pict');

    newCardPic.src = cardData.link;
    newCardPic.alt = `Фотография места: ${cardData.name}`;
    newCard.querySelector('.gallery-card__label-text').textContent = cardData.name;
    addListenerToCard(newCardPic);

    return newCard;
}

function deleteCard(cardData, card) {
    console.log(cardData);
    apiController.deleteCard(cardData._id)
        .then((res) => {
            if(res.ok) {
                card.remove();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
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

function toggleDeleteButton(element) {
    element.classList.remove('gallery-card__delete_restrict');
}

function likeHandler(card, cardId) {
    
    apiController.getCardData(cardId)
    
    .then ((newCardData) => {
        if(isItLikeOwner(newCardData) === false) {
            // Своего лайка нет - добавляем
            apiController.setLike(cardId)
            .then((res) => {
                if(res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((newCardData) => {
                renderLike(card, true);
                setLikeCountToCard(card, newCardData.likes.length);            
            })
        } else {
            //Свой лайк есть, удаляем его
            apiController.removeLike(cardId)
            .then((res) => {
                if(res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            }).then ((newCardData) => {
                setLikeCountToCard(card, newCardData.likes.length);
                renderLike(card, false);
            })
        }        
    })    
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
