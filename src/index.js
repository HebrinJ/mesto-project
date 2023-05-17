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

function setCards(cards) {
    cards = cards.reverse();

    cards.forEach(function (cardData) {
        const newCard = new Card(
            cardData,
            "gallery-card-list-element",
            popupController.popupWithPicture.open
        ).createCard();
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
    avatar.setAttribute("src", link);
}

function fillProfileFieldsWhenOpen() {
    inputFieldName.value = profileName.textContent;
    inputFieldMajor.value = profileMajor.textContent;
}
