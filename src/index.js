import { Card } from './components/card.js';
import { handleCardClick } from './components/modal.js';
import { validationController } from './components/validate.js';
import { popupController } from './components/modal.js';
import { api } from './components/api.js';
import { handleSubmit } from './components/utils.js';
import { validationSetting } from './components/constants.js';
import './pages/index.css';

export let profileId = '';

const cardGallery = document.querySelector('.gallery');
const inputFieldPlace = document.querySelector('.popup__container-input_field_place');
const inputFieldPict = document.querySelector('.popup__container-input_field_pict');
const editBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__overlay');
const editAvatarField = document.querySelector('.popup__container-input_field_avatar');
const inputFieldName = document.querySelector('.popup__container-input_field_name');
const inputFieldMajor = document.querySelector('.popup__container-input_field_major');
const profileName = document.querySelector('.profile__name');
const profileMajor = document.querySelector('.profile__major');
const avatar = document.querySelector('.profile__pict');
const disabledButtons = document.querySelectorAll(validationSetting.submitButtonSelector+'.default-disabled');

cardForm.addEventListener('submit', createUserCard);
profileForm.addEventListener('submit', handleProfile);
avatarForm.addEventListener('submit', handleAvatar);

editBtn.addEventListener('click', function() {
    popupController.openPopup(popupController.popupProfile);
    fillProfileFieldsWhenOpen();
});

addCardBtn.addEventListener('click', function() {
    popupController.openPopup(popupController.popupAddCard);
});

editAvatarButton.addEventListener('click', function() {
    popupController.openPopup(popupController.popupAvatar);
})

validationController.enableValidation(validationSetting);
validationController.setDefaultButtonsState(disabledButtons);

Promise.all([api.getProfileData(), api.getCards()])
    .then(([profileData, cards]) => {
        setProfileData(profileData.name, profileData.about, profileData._id, profileData.avatar);
        setCards(cards); 
    })
    .catch((err) => console.log(err));

function createUserCard(evt) {
    function makeRequest() {
        return api.sendNewCard(inputFieldPict.value, inputFieldPlace.value)
        .then(function (card) {
            const newCard = new Card.createCard(card);
            addCard(newCard); 
            popupController.closePopup(popupController.popupAddCard);    
        })
    }
        
    handleSubmit(makeRequest, evt);
}

function handleAvatar(evt) {
    const avatarLink = editAvatarField.value;

    function makeRequest() {
        return api.changeAvatar(avatarLink)
        .then((data) => {
            setAvatar(data.avatar);
            popupController.closePopup(popupController.popupAvatar);
        })
    }

    handleSubmit(makeRequest, evt);
}

function handleProfile(evt) {
    function makeRequest() {
        return api.editProfileData(inputFieldName.value, inputFieldMajor.value)
            .then((data) => { 
                setProfileData(inputFieldName.value, inputFieldMajor.value, profileId, data.avatar);
                popupController.closePopup(popupController.popupProfile);
            })
    }

    handleSubmit(makeRequest, evt);
}

function setCards(cards) {
    cards = cards.reverse();

    // cards.forEach( function(cardData) {
    //     const newCard = cardController.createCard(cardData);
    //     addCard(newCard);
    // });
    cards.forEach( function(cardData) {
        const newCard = new Card(cardData,'gallery-card-list-element', handleCardClick).createCard();
        addCard(newCard);
    });
}

function setProfileData(name, major, id, avatarLink) {
    profileId = id;
    profileName.textContent = name;
    profileMajor.textContent = major;
    
    setAvatar(avatarLink);
}

function addCard(card) {    
    cardGallery.prepend(card);
}

function setAvatar(link) {   
    avatar.setAttribute('src', link);
}

function fillProfileFieldsWhenOpen() {
    inputFieldName.value = profileName.textContent;
    inputFieldMajor.value = profileMajor.textContent;
}