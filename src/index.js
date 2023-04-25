import { cardController } from './components/card.js';
import { validationController } from './components/validate.js'
import { popupController } from './components/modal.js';
import { apiController } from './components/api.js';
import './pages/index.css';

export const validationSetting = {
    formSelector: '.popup__container-form',
    inputSelector: '.popup__container-input',
    submitButtonSelector: '.popup__container-save-btn',
    errorContainerSelector: '.popup__container-input-error-message',
    inputErrorStyleSelector: 'popup__container-input_error'
}

export let profileId = '';

const cardGallery = document.querySelector('.gallery');
const inputFieldPlace = document.querySelector('.popup__container-input_field_place');
const inputFieldPict = document.querySelector('.popup__container-input_field_pict');
const editBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const inputFieldName = document.querySelector('.popup__container-input_field_name');
const inputFieldMajor = document.querySelector('.popup__container-input_field_major');
const profileName = document.querySelector('.profile__name');
const profileMajor = document.querySelector('.profile__major');
const disabledButtons = document.querySelectorAll(validationSetting.submitButtonSelector+'.default-disabled');

cardForm.addEventListener('submit', createUserCard);
profileForm.addEventListener('submit', profileSubmitHandler);

editBtn.addEventListener('click', function() {
    popupController.openPopup(popupController.popupProfile);
    fillProfileFieldsWhenOpen();
    validationController.setDefaultButtonsState(disabledButtons);
});

addCardBtn.addEventListener('click', function() {
    popupController.openPopup(popupController.popupAddCard);
    validationController.setDefaultButtonsState(disabledButtons);
});

validationController.enableValidation(validationSetting);
validationController.setDefaultButtonsState(disabledButtons);

apiController.getProfileData()
    .then((res) => {
        if(res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }})
    .then((data) => setProfileData(data.name, data.about, data._id))
    .catch(() => Promise.reject(`Ошибка: ${res.status}`));

apiController.getCards()
    .then((res) => {
        if(res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }})
    .then((cards) => setCards(cards))
    .catch()
    

function setCards(cards) {
    cards = cards.reverse();

    cards.forEach( function(cardData) {
        const newCard = cardController.createCard(cardData);
        addCard(newCard);
        cardController.setLikeCountToCard(newCard, cardData.likes.length);
        
        if(cardController.isItLikeOwner(cardData)) {
            cardController.renderLike(newCard, true)
        }
    });
}

function setProfileData(name, major, id) {
    profileName.textContent = name;
    profileMajor.textContent = major;
    profileId = id;
}

// function setLikeCountToCard(card, count) {
//     const countElement = card.querySelector('.gallery-card__like-count');

//     countElement.textContent = count;
// }



function addCard(card) {    
    cardGallery.prepend(card);
}

function createUserCard(evt) {
    evt.preventDefault();
    
    apiController.sendNewCard(inputFieldPict.value, inputFieldPlace.value)
        .then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }})
        .then(function (card) {
            const newCard = cardController.createCard(card.link, card.name);
            addCard(newCard);            
        })
        .catch()
        .finally(() => {
            popupController.closePopup(popupController.popupAddCard);
            cardForm.reset();
        })    
}

function profileSubmitHandler (evt) {
    evt.preventDefault(); 

    apiController.editProfileData(inputFieldName.value, inputFieldMajor.value)
        .then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }})
        .then(() => setProfileData(inputFieldName.value, inputFieldMajor.value))
    
    popupController.closePopup(popupController.popupProfile);
}

function fillProfileFieldsWhenOpen() {
    inputFieldName.value = profileName.textContent;
    inputFieldMajor.value = profileMajor.textContent;
}


