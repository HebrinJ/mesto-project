import { cardController } from './components/card.js';
import { initialCards } from './components/utils.js';
import { validationController } from './components/validate.js'
import { popupController } from './components/modal.js';
import './pages/index.css';

cardForm.addEventListener('submit', createUserCard);

const cardGallery = document.querySelector('.gallery');
const inputFieldPlace = document.querySelector('.popup__container-input_field_place');
const inputFieldPict = document.querySelector('.popup__container-input_field_pict');

initialCards.forEach( function(card) {
    const newCard = cardController.createCard(card.link, card.name);
    addCard(newCard);
});

validationController.setAllValidationListeners();
validationController.setDefaultButtonsState();

function addCard(card) {    
    cardGallery.prepend(card);
}

function createUserCard(evt) {
    evt.preventDefault();    

    const newCard = cardController.createCard(inputFieldPict.value, inputFieldPlace.value);

    addCard(newCard);
    popupController.submitClosePopup(popupController.popupAddCard);
    cardForm.reset();
}