import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector, fullSizeImage, pictureLabel) {
        super(popupSelector);
        this._fullSizeImage = fullSizeImage;
        this._pictureLabel = pictureLabel;
    }
    open = (src, alt) => {
        super.open();
        this._fullSizeImage.src = src;
        this._fullSizeImage.alt = alt;
        this._pictureLabel.textContent = alt;
    };
}
