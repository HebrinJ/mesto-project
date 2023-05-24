import { Card } from "./components/card.js";
import { FormValidator } from "./components/formValidator.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { api } from "./components/api.js";
import { handleSubmit } from "./components/utils/utils.js";
import { Section } from "./components/section.js";
import { UserInfo } from "./components/userInfo.js";
import "./pages/index.css";
import {
    editBtn,
    addCardBtn,
    editAvatarButton,
    inputFieldName,
    inputFieldMajor,
    avatar,
    forms,
    gallerySelector,
    nameSelector,
    majorSelector,
    fullSizeImage,
    pictureLabel,
    validationSetting,
    cardSelectors
} from "./components/utils/constants.js";

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
    popupWithPicture: new PopupWithImage(
        "#pict-popup",
        fullSizeImage,
        pictureLabel
    ),
};

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
        userInfo.setUserInfo(profileData);
        userInfo.setAvatar(avatar, profileData.avatar);
        setCards(cards);
    })
    .catch((err) => console.log(err));

function createUserCard(evt, inputsValues) {
    const [inputFieldPlaceValue, inputFieldPictValue] = inputsValues;
    function makeRequest() {
        return api
            .sendNewCard(inputFieldPictValue, inputFieldPlaceValue)
            .then(function (cardData) {
                setCards([cardData]);
                popupController.popupAddCard.close();
            });
    }

    handleSubmit(makeRequest, evt);
}

function handleAvatar(evt, link) {
    const [avatarLink] = link;

    function makeRequest() {
        return api.changeAvatar(avatarLink).then((data) => {
            userInfo.setAvatar(avatar, data.avatar);
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
                userInfo.setUserInfo(data);
                popupController.popupProfile.close();
            });
    }

    handleSubmit(makeRequest, evt);
}

function setCards(items) {
    const renderer = (cardData) => {
        const card = new Card(
            cardData,
            userData._id,
            popupController.popupWithPicture.open,
            cardSelectors,
            api
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

function fillProfileFieldsWhenOpen() {
    inputFieldName.value = userData.name;
    inputFieldMajor.value = userData.about;
}
