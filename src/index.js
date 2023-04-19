import { cardController } from './components/card.js';
import { initialCards } from './components/utils.js';
import { validationController } from './components/validate.js'
import { popupController } from './components/modal.js';
import './pages/index.css';

cardForm.addEventListener('submit', createUserCard);
profileForm.addEventListener('submit', profileSubmitHandler);

const cardGallery = document.querySelector('.gallery');
const inputFieldPlace = document.querySelector('.popup__container-input_field_place');
const inputFieldPict = document.querySelector('.popup__container-input_field_pict');
const profileName = document.querySelector('.profile__name');
const profileMajor = document.querySelector('.profile__major');
const inputFieldName = document.querySelector('.popup__container-input_field_name');
const inputFieldMajor = document.querySelector('.popup__container-input_field_major');
const popupProfile = document.querySelector('#profile-popup');

const validationSetting = {
    formSelector: '.popup__container-form',
    inputSelector: '.popup__container-input',
    submitButtonSelector: '.popup__container-save-btn',
    errorContainerSelector: '.popup__container-input-error-message'
}

initialCards.forEach( function(card) {
    const newCard = cardController.createCard(card.link, card.name);
    addCard(newCard);
});

validationController.enableValidation(validationSetting);
validationController.setDefaultButtonsState();

function addCard(card) {    
    cardGallery.prepend(card);
}

function createUserCard(evt) {
    evt.preventDefault();    

    const newCard = cardController.createCard(inputFieldPict.value, inputFieldPlace.value);

    addCard(newCard);
    popupController.closePopup(popupController.popupAddCard);
    cardForm.reset();
}

function profileSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = inputFieldName.value;
    profileMajor.textContent = inputFieldMajor.value;
    popupController.closePopup(popupProfile);
}

