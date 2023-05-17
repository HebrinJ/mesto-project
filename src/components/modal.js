// const popupProfile = document.querySelector("#profile-popup");
// const popupAddCard = document.querySelector("#add-card-popup");
// const popupAvatar = document.querySelector("#change-avatar");
// const cardPicturePopup = document.querySelector("#pict-popup");
const fullSizeImage = document.querySelector(".popup__full-pict");
const pictureLabel = document.querySelector(".popup__pict-label");

const handleClickClose = function (event) {
    const isItPopup = event.target.classList.contains("popup");
    const isItCloseButton = event.target.classList.contains(
        "popup__container-close-btn"
    );

    if (!isItPopup && !isItCloseButton) {
        return;
    }

    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
};

const handleKeyClose = function (event) {
    if (event.key === "Escape") {
        const popup = document.querySelector(".popup_opened");
        closePopup(popup);
    }
};

function openPopup(popup) {
    popup.classList.add("popup_opened");
    popup.addEventListener("mousedown", handleClickClose);
    window.addEventListener("keydown", handleKeyClose);
}

function closePopup(popup) {
    popup.removeEventListener("mousedown", handleClickClose);
    window.removeEventListener("keydown", handleKeyClose);
    popup.classList.remove("popup_opened");
}

export const handleCardClick = function (image) {
    openPopup(cardPicturePopup);
    fullSizeImage.src = image.src;
    fullSizeImage.alt = image.alt;
    pictureLabel.textContent = image.alt;
};

class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        this.popupElement = document.querySelector(this.popupSelector);
    }
    _handleClickClose(event) {
        const isItPopup = event.target.classList.contains("popup");
        const isItCloseButton = event.target.classList.contains(
            "popup__container-close-btn"
        );

        if (!isItPopup && !isItCloseButton) {
            return;
        }
        closePopup(this.popupElement);
    }
    _handleEscClose(event) {
        if (event.key === "Escape") {
            closePopup(this.popupElement);
        }
    }
    setEventListeners() {
        window.addEventListener("keydown", this._handleEscClose);
        this.popupElement.addEventListener("mousedown", this._handleClickClose);
    }
    _removeEventListeners() {
        window.removeEventListener("keydown", this._handleEscClose);
        this.popupElement.removeEventListener(
            "mousedown",
            this._handleClickClose
        );
    }
    open() {
        this.popupElement.classList.add("popup_opened");
        this.setEventListeners();
    }
    close() {
        this.popupElement.classList.remove("popup_opened");
        this._removeEventListeners();
    }
}

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(src, alt) {
        super.open();
        fullSizeImage.src = src;
        fullSizeImage.alt = alt;
        pictureLabel.textContent = alt;
    }
}

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
    }
    _getInputValues() {}
}

export const popupController = {
    popupProfile: new Popup("#profile-popup"),
    popupAddCard: new Popup("#add-card-popup"),
    popupAvatar: new Popup("#change-avatar"),
    cardPicturePopup: new Popup("#pict-popup"),
};
