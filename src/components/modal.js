const fullSizeImage = document.querySelector(".popup__full-pict");
const pictureLabel = document.querySelector(".popup__pict-label");

class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
    }
    _handleClickClose = (event) => {
        const isItPopup = event.target.classList.contains("popup");
        const isItCloseButton = event.target.classList.contains(
            "popup__container-close-btn"
        );

        if (!isItPopup && !isItCloseButton) {
            return;
        }
        this.close();
    };
    _handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    };
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
    close = () => {
        this.popupElement.classList.remove("popup_opened");
        this._removeEventListeners();
    };
}

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open = (src, alt) => {
        super.open();
        fullSizeImage.src = src;
        fullSizeImage.alt = alt;
        pictureLabel.textContent = alt;
    };
}

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this.form = this.popupElement.querySelector("form");
        this.inputs = Array.from(this.form.querySelectorAll("input"));
    }
    _getInputValues() {
        const inputsValues = this.inputs.map((input) => {
            return input.value;
        });
        return inputsValues;
    }
    _handleFormSubmit = (e) => {
        e.preventDefault();
        this.handleFormSubmit(e, this._getInputValues());
    };
    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener("submit", this._handleFormSubmit);
    }
    close() {
        super.close();
        this.form.reset();
        this.form.removeEventListener("submit", this._handleFormSubmit);
    }
}
