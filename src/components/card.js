import { userData } from "../index";
import { api } from "./api.js";
import { likeActiveSelector, likeSelector, deleteBtnSelector} from "./utils/constants.js"

export class Card {
    constructor(cardData, cardSelector, templateSelector, handleCardClick) {
        this._cardData = cardData;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._templateCard = document.querySelector(templateSelector).content;
    }

    createCard() {
        const cardData = this._cardData;
        const newCard = this._setDataToElement(cardData);

        this._setEventListeners(newCard, cardData);

        this._setLikeCountToCard(newCard, cardData.likes.length);

        if (this._isItLikeOwner(cardData)) {
            this._renderLike(newCard, true);
        }

        return newCard;
    }

    _getElement() {
        return this._templateCard
            .querySelector(`.${this._cardSelector}`)
            .cloneNode(true);
    }

    _setDataToElement({ link, name }) {
        const newCard = this._getElement();
        const cardImage = newCard.querySelector(".gallery-card__pict");

        cardImage.src = link;
        cardImage.alt = `Фотография места: ${name}`;
        newCard.querySelector(".gallery-card__label-text").textContent = name;

        return newCard;
    }

    _setEventListeners(card, cardData) {
        const likeBtn = card.querySelector(`.${likeSelector}`);
        const image = card.querySelector(".gallery-card__pict");
        
        likeBtn.addEventListener(
            "click",
            function () {
                this._likeHandler(card, cardData._id);
            }.bind(this)
        );
        
        image.addEventListener(
            "click",
            function () {
                this._handleCardClick(image.src, image.alt);
            }.bind(this)
        );

        if (this._availableToDelete(cardData)) {
            const delBtn = card.querySelector(`.${deleteBtnSelector}`);
            this._toggleDeleteButton(delBtn);

            delBtn.addEventListener(
                "click",
                function () {
                    this._deleteCard(cardData._id, card);
                }.bind(this)
            );
        }
    }

    _deleteCard(cardId, card) {
        api.deleteCard(cardId)
            .then(() => card.remove())
            .catch((err) => console.log(err));
    }

    _availableToDelete(cardData) {
        if (cardData.owner._id === userData._id) {
            return true;
        }

        return false;
    }

    _toggleDeleteButton(element) {
        element.classList.remove("gallery-card__delete_restrict");
    }

    _likeHandler(card, cardId) {
        const likeButton = card.querySelector(`.${likeSelector}`);

        if (!likeButton.classList.contains(likeActiveSelector)) {
            // Своего лайка нет - добавляем
            api.setLike(cardId)
                .then((newCardData) => {
                    this._renderLike(card, true);
                    this._setLikeCountToCard(card, newCardData.likes.length);
                })
                .catch((err) => console.log(err));
        } else {
            //Свой лайк есть, удаляем его
            api.removeLike(cardId)
                .then((newCardData) => {
                    this._setLikeCountToCard(card, newCardData.likes.length);
                    this._renderLike(card, false);
                })
                .catch((err) => console.log(err));
        }
    }

    _isItLikeOwner({ likes }) {
        if (likes.length === 0) {
            return false;
        }

        for (let i = 0; i < likes.length; i++) {
            if (likes[i]._id === userData._id) {
                return true;
            }
        }

        return false;
    }

    _setLikeCountToCard(card, count) {
        const countElement = card.querySelector(".gallery-card__like-count");
        countElement.textContent = count;
    }

    _renderLike(card, state) {
        const like = card.querySelector(`.${likeSelector}`);

        if (state) {
            like.classList.add(likeActiveSelector);
        } else {
            like.classList.remove(likeActiveSelector);
        }
    }
}
