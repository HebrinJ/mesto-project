<<<<<<< HEAD
import { Card } from './components/card.js';
import { handleCardClick } from './components/modal.js';
import { FormValidator } from './components/formValidator.js';
import { popupController } from './components/modal.js';
import { api } from './components/api.js';
import { handleSubmit } from './components/utils.js';
import { validationSetting } from './components/constants.js';
import './pages/index.css';
import { Section } from './components/section.js';

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
const forms = Array.from(document.querySelectorAll('.popup__container-form'));
//const disabledButtons = document.querySelectorAll(validationSetting.submitButtonSelector+'.default-disabled');

cardForm.addEventListener('submit', createUserCard);
profileForm.addEventListener('submit', handleProfile);
avatarForm.addEventListener('submit', handleAvatar);

editBtn.addEventListener('click', function() {
    popupController.openPopup(popupController.popupProfile);
=======
import { Card } from "./components/card.js";
import { FormValidator } from "./components/formValidator.js";
import { PopupWithForm, PopupWithImage } from "./components/modal.js";
import { api } from "./components/api.js";
import { handleSubmit } from "./components/utils.js";
import { validationSetting } from "./components/constants.js";
import "./pages/index.css";

export let profileId = "";

const popupController = {
    popupProfile: new PopupWithForm("#profile-popup", handleProfile),
    popupAddCard: new PopupWithForm("#add-card-popup", createUserCard),
    popupAvatar: new PopupWithForm("#change-avatar", handleAvatar),
    popupWithPicture: new PopupWithImage("#pict-popup"),
};
console.log(popupController.popupWithPicture.popupElement);
const cardGallery = document.querySelector(".gallery");
const editBtn = document.querySelector(".profile__edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__overlay");
const inputFieldName = document.querySelector(
    ".popup__container-input_field_name"
);
const inputFieldMajor = document.querySelector(
    ".popup__container-input_field_major"
);
const profileName = document.querySelector(".profile__name");
const profileMajor = document.querySelector(".profile__major");
const avatar = document.querySelector(".profile__pict");
const forms = Array.from(document.querySelectorAll(".popup__container-form"));

editBtn.addEventListener("click", function () {
    popupController.popupProfile.open();
>>>>>>> origin/feature/popup-oop
    fillProfileFieldsWhenOpen();
});

addCardBtn.addEventListener("click", function () {
    popupController.popupAddCard.open();
});

editAvatarButton.addEventListener("click", function () {
    popupController.popupAvatar.open();
});

forms.forEach((form) => {
    new FormValidator(validationSetting, form).enableValidation();
});

Promise.all([api.getProfileData(), api.getCards()])
    .then(([profileData, cards]) => {
        setProfileData(
            profileData.name,
            profileData.about,
            profileData._id,
            profileData.avatar
        );
        setCards(cards);
    })
    .catch((err) => console.log(err));

function createUserCard(evt, inputsValues) {
    const [inputFieldPlaceValue, inputFieldPictValue] = inputsValues;
    function makeRequest() {
<<<<<<< HEAD
        return api.sendNewCard(inputFieldPict.value, inputFieldPlace.value)
        .then(function (cardData) {
            // const newCard = new Card(cardData,'gallery-card-list-element', handleCardClick).createCard(card);
            // addCard(newCard); 
            const renderer = (cardData) => { 
                const newCard = new Card(cardData, 'gallery-card-list-element', handleCardClick).createCard(); 
                return newCard;
            };
            const items = [cardData];            
            const element = { items, renderer }
            new Section(element, 'gallery').renderAll();

            popupController.closePopup(popupController.popupAddCard);    
        })
=======
        return api
            .sendNewCard(inputFieldPictValue, inputFieldPlaceValue)
            .then(function (card) {
                const newCard = new Card(
                    card,
                    "gallery-card-list-element",
                    popupController.popupWithPicture.open
                ).createCard(card);
                addCard(newCard);
                popupController.popupAddCard.close();
            });
>>>>>>> origin/feature/popup-oop
    }

    handleSubmit(makeRequest, evt);
}

function handleAvatar(evt, link) {
    const [avatarLink] = link;

    function makeRequest() {
        return api.changeAvatar(avatarLink).then((data) => {
            setAvatar(data.avatar);
            popupController.popupAvatar.close();
        });
    }
    handleSubmit(makeRequest, evt);
}

function handleProfile(evt, inputsValues) {
    const [inputFieldName, inputFieldMajor] = inputsValues;
    function makeRequest() {
        return api
            .editProfileData(inputFieldName, inputFieldMajor)
            .then((data) => {
                setProfileData(
                    inputFieldName,
                    inputFieldMajor,
                    profileId,
                    data.avatar
                );
                popupController.popupProfile.close();
            });
    }

    handleSubmit(makeRequest, evt);
}

function setCards(items) {
    const renderer = (cardData) => { 
        const card = new Card(cardData, 'gallery-card-list-element', handleCardClick).createCard(); 
        return card; 
    };
    
    const section = new Section({ items: items, renderer: renderer }, 'gallery');
    const cards = section.renderAll();
    
    cards.forEach((card) => section.addItem(card));


    // cards = cards.reverse();

<<<<<<< HEAD
    // cards.forEach( function(cardData) {
    //     const newCard = new Card(cardData,'gallery-card-list-element', handleCardClick).createCard();
    //     addCard(newCard);
    // });
=======
    cards.forEach(function (cardData) {
        const newCard = new Card(
            cardData,
            "gallery-card-list-element",
            popupController.popupWithPicture.open
        ).createCard();
        addCard(newCard);
    });
>>>>>>> origin/feature/popup-oop
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
    avatar.setAttribute("src", link);
}

function fillProfileFieldsWhenOpen() {
    inputFieldName.value = profileName.textContent;
    inputFieldMajor.value = profileMajor.textContent;
}
