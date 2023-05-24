import { Popup } from "./Popup.js";

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
