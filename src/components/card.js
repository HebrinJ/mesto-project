import { popupController } from './modal.js';

const cardGallery = document.querySelector('.gallery');
const templateCard = document.querySelector('#card-template').content;
const cardPicturePopup = document.querySelector('#pict-popup');
const fullSizePicture = document.querySelector('.popup__full-pict');

cardForm.addEventListener('submit', createUserCard);

export const cardController = {
    addCard,
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
    delBtn.addEventListener('click', function () {
        delBtn.parentElement.parentElement.remove();
    });
    
    return newCard;
}

function addCard(card) {    
    cardGallery.prepend(card);

    const cardPict = card.querySelector('.gallery-card__pict');
    addListenerToCard(cardPict);
}

function addListenerToCard(card) {
    card.addEventListener('click', function() {
        popupController.openPopup(cardPicturePopup);
        fullSizePicture.src = card.src;
        fullSizePicture.alt = 'Фотография места';
    });
}

function createUserCard(evt) {
    evt.preventDefault();

    const inputFieldPlace = document.querySelector('.popup__container-input_field_place');
    const inputFieldPict = document.querySelector('.popup__container-input_field_pict');

    const newCard = createCard(inputFieldPict.value, inputFieldPlace.value);

    addCard(newCard);
    popupController.submitClosePopup(popupController.popupAddCard);
    cardForm.reset();
}

function toggleLike(card) {
    card.classList.toggle('gallery-card__like_active');
}

