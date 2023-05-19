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
