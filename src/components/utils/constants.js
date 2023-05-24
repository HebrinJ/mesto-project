export const editBtn = document.querySelector(".profile__edit-button");
export const addCardBtn = document.querySelector(".profile__add-button");
export const editAvatarButton = document.querySelector(".profile__overlay");
export const inputFieldName = document.querySelector(
    ".popup__container-input_field_name"
);
export const inputFieldMajor = document.querySelector(
    ".popup__container-input_field_major"
);
export const avatar = document.querySelector(".profile__pict");
export const forms = Array.from(
    document.querySelectorAll(".popup__container-form")
);
export const gallerySelector = "gallery";
export const nameSelector = "profile__name";
export const majorSelector = "profile__major";
export const fullSizeImage = document.querySelector(".popup__full-pict");
export const pictureLabel = document.querySelector(".popup__pict-label");

export const cardSelectors = {
    cardSelector: "gallery-card-list-element",
    templateSelector: "#card-template",
    likeActiveSelector: "gallery-card__like_active",
    likeSelector: "gallery-card__like",
    deleteBtnSelector: "gallery-card__delete",
    cardImageSelector: "gallery-card__pict",
    cardCountSelector: "gallery-card__like-count",
}

export const validationSetting = {    
    inputSelector: '.popup__container-input',
    submitButtonSelector: '.popup__container-save-btn',
    errorContainerSelector: '.popup__container-input-error-message',
    inputErrorStyleSelector: 'popup__container-input_error',
    validationPattern: /[^a-zа-я\s\-]/i,
    inputFieldSelector: '.popup__container-input'
}