const editBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const popupCloseBtns = document.querySelectorAll('.popup__container-close-btn');
const popupProfile = document.querySelector('#profile-popup');
const inputFieldName = document.querySelector('.popup__container-input_field_name');
const inputFieldMajor = document.querySelector('.popup__container-input_field_major');
const profileName = document.querySelector('.profile__name');
const profileMajor = document.querySelector('.profile__major');
const popupAddCard = document.querySelector('#add-card-popup');

import { validationController  } from "./validate";

export const popupController = {
    openPopup,
    closePopup,
    popupAddCard
}

editBtn.addEventListener('click', function() {
    openPopup(popupProfile);
    fillProfileFields();
});

addCardBtn.addEventListener('click', function() {
    openPopup(popupAddCard);
});

popupCloseBtns.forEach(function (btn) {    
    btn.addEventListener('mousedown', clickCloseHandler);    
});

const clickCloseHandler = function (event) {
    const popup = document.querySelector('.popup_opened');   
    
    const isItPopup = event.target.classList.contains('popup');
    const isItCloseButton = event.target.classList.contains('popup__container-close-btn');
        
    if(!isItPopup && !isItCloseButton) {        
        return;
    }    
    
    closePopup(popup);
}

const keyCloseHandler = function (event) {
    const popup = document.querySelector('.popup_opened');

    if(event.key === 'Escape') {
        closePopup(popup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');    
    popup.addEventListener('mousedown', clickCloseHandler);
    window.addEventListener('keydown', keyCloseHandler);

    validationController.setDefaultButtonsState();
}

function closePopup(popup) {    
    popup.removeEventListener('mousedown', clickCloseHandler);
    window.removeEventListener('keydown', keyCloseHandler);
    popup.classList.remove('popup_opened'); 
}

function fillProfileFields() {
    inputFieldName.value = profileName.textContent;
    inputFieldMajor.value = profileMajor.textContent;
}