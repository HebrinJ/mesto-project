import { profileId } from "../index";
import { api } from "./api.js";

const templateCard = document.querySelector("#card-template").content;
const likeActiveSelector = "gallery-card__like_active";
const likeSelector = "gallery-card__like";
const deleteBtnSelector = "gallery-card__delete";

export class Card {
    constructor(cardData, cardSelector, handleCardClick) {
        this._cardData = cardData;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

<<<<<<< HEAD
    createCard() {    
=======
    createCard() {
>>>>>>> origin/feature/popup-oop
        const cardData = this._cardData;
        const newCard = this._setDataToElement(cardData);

        const likeBtn = newCard.querySelector(`.${likeSelector}`);

        likeBtn.addEventListener(
            "click",
            function () {
                this._likeHandler(newCard, cardData._id);
            }.bind(this)
        );

        if (this._availableToDelete(cardData)) {
            const delBtn = newCard.querySelector(`.${deleteBtnSelector}`);
            this._toggleDeleteButton(delBtn);

            delBtn.addEventListener(
                "click",
                function () {
                    this._deleteCard(cardData._id, newCard);
                }.bind(this)
            );
        }

        this._setLikeCountToCard(newCard, cardData.likes.length);

        if (this._isItLikeOwner(cardData)) {
            this._renderLike(newCard, true);
        }

        return newCard;
    }

    _getElement() {
        return templateCard
            .querySelector(`.${this._cardSelector}`)
            .cloneNode(true);
    }

    _setDataToElement({ link, name }) {
        const newCard = this._getElement();
        const cardImage = newCard.querySelector(".gallery-card__pict");

        cardImage.src = link;
        cardImage.alt = `Фотография места: ${name}`;
        newCard.querySelector(".gallery-card__label-text").textContent = name;

        cardImage.addEventListener(
            "click",
            function () {
                this._handleCardClick(cardImage.src, cardImage.alt);
            }.bind(this)
        );

        return newCard;
    }

    _deleteCard(cardId, card) {
        api.deleteCard(cardId)
            .then(() => card.remove())
            .catch((err) => console.log(err));
    }

    _availableToDelete(cardData) {
        if (cardData.owner._id === profileId) {
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
            if (likes[i]._id === profileId) {
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
