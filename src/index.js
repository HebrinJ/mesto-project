import { cardController } from './components/card.js';
import { validationController } from './components/validate.js';
import { popupController } from './components/modal.js';
import { apiController } from './components/api.js';
import { removeLoadingText } from './components/utils.js';
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
const loadingText = 'Сохранение...';
let avatarLink = '';
let cachedLoadingText = '';

cardForm.addEventListener('submit', createUserCard);
profileForm.addEventListener('submit', handleProfileSubmit);
avatarForm.addEventListener('submit', handleAvatarSubmit);

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

Promise.all([apiController.getProfileData(), apiController.getCards()])
    .then(([profileData, cards]) => {
        setProfileData(profileData.name, profileData.about, profileData._id, profileData.avatar);
        setCards(cards); 
    })
    .catch((err) => console.log(err));    

function setCards(cards) {
    cards = cards.reverse();

    cards.forEach( function(cardData) {
        const newCard = cardController.createCard(cardData);
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

function createUserCard(evt) {
    evt.preventDefault();

    setLoadingStateText(evt.submitter, loadingText, evt.target.textContent);
    apiController.sendNewCard(inputFieldPict.value, inputFieldPlace.value)
        .then(function (card) {
            const newCard = cardController.createCard(card);
            addCard(newCard); 
            popupController.closePopup(popupController.popupAddCard);
            cardForm.reset();           
        })
        .catch((err) => console.log(err))
        .finally(() => {            
            removeLoadingText(evt.submitter);
        })    
}

function handleProfileSubmit (evt) {
    evt.preventDefault();

    setLoadingStateText(evt.submitter, loadingText, evt.target.textContent);
    apiController.editProfileData(inputFieldName.value, inputFieldMajor.value)
        .then(() => { 
            setProfileData(inputFieldName.value, inputFieldMajor.value, profileId, avatarLink);
            popupController.closePopup(popupController.popupProfile);
        })
        .catch((err) => console.log(err))
        .finally(() => {            
            removeLoadingText(evt.submitter);
        })    
}

function handleAvatarSubmit (evt) {
    evt.preventDefault(); 

    setLoadingStateText(evt.submitter, loadingText, evt.target.textContent);
    const avatarLink = editAvatarField.value;    
    apiController.changeAvatar(avatarLink)
        .then((data) => {
            setAvatar(data.avatar);
            popupController.closePopup(popupController.popupAvatar);
        })
        .catch((err) => console.log(err))
        .finally(() => {            
            removeLoadingText(evt.submitter);
        }) 
}

function setAvatar(link) {   
    avatar.setAttribute('src', link);
}

function fillProfileFieldsWhenOpen() {
    inputFieldName.value = profileName.textContent;
    inputFieldMajor.value = profileMajor.textContent;
}

function setLoadingStateText(element, newText, oldText) {
    cachedLoadingText = oldText;
    element.textContent = newText;
}
