import { Popup } from "./Popup.js";
import { fullSizeImage } from "../index.js";
import { pictureLabel } from "../index.js";

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
