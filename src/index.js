import { Card } from "./components/card.js";
import { FormValidator } from "./components/formValidator.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { api } from "./components/api.js";
import { handleSubmit } from "./components/utils.js";
import { validationSetting } from "./components/constants.js";
import { Section } from "./components/section.js";
import { UserInfo } from "./components/userInfo.js";
import "./pages/index.css";

export let userData = {
    name: "",
    about: "",
    avatar: "",
    _id: "",
    cohort: "",
};

const popupController = {
    popupProfile: new PopupWithForm("#profile-popup", handleProfile),
    popupAddCard: new PopupWithForm("#add-card-popup", createUserCard),
    popupAvatar: new PopupWithForm("#change-avatar", handleAvatar),
    popupWithPicture: new PopupWithImage("#pict-popup"),
};

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
const inputFieldPict = document.querySelector(
    ".popup__container-input_field_pict"
);
const inputFieldPlace = document.querySelector(
    ".popup__container-input_field_place"
);
const gallerySelector = "gallery";
const nameSelector = "profile__name";
const majorSelector = "profile__major";
const galleryCardSelector = "gallery-card-list-element";

const userInfo = new UserInfo({ nameSelector, majorSelector });

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

Promise.all([
    userInfo.getUserInfo(api.getProfileData.bind(api)),
    api.getCards(),
])
    .then(([profileData, cards]) => {
        userData = profileData;
        setProfileData(profileData);
        setCards(cards);
    })
    .catch((err) => console.log(err));

function createUserCard(evt, inputsValues) {
    const [inputFieldPlaceValue, inputFieldPictValue] = inputsValues;
    function makeRequest() {
        return api
            .sendNewCard(inputFieldPict.value, inputFieldPlace.value)
            .then(function (cardData) {
                let items = [];
                items = [cardData];
                setCards(items);

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
                setProfileData(data);
                popupController.popupProfile.close();
            });
    }

    handleSubmit(makeRequest, evt);
}

function setCards(items) {
    const renderer = (cardData) => {
        const card = new Card(
            cardData,
            galleryCardSelector,
            popupController.popupWithPicture.open
        ).createCard();
        return card;
    };

    const section = new Section(
        { items: items, renderer: renderer },
        gallerySelector
    );
    const cards = section.renderAll();

    cards.forEach((card) => section.addItem(card));
}

function setProfileData({ name, about, avatar }) {
    profileName.textContent = name;
    profileMajor.textContent = about;

    setAvatar(avatar);
}

function setAvatar(link) {
    avatar.setAttribute("src", link);
}

function fillProfileFieldsWhenOpen() {
    inputFieldName.value = profileName.textContent;
    inputFieldMajor.value = profileMajor.textContent;
}
