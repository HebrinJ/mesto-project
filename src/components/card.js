export class Card {
    constructor(
        cardData,
        userId,
        handleCardClick,
        {   
            cardSelector, 
            templateSelector,
            likeActiveSelector,
            likeSelector,
            deleteBtnSelector,
            cardImageSelector,
            cardCountSelector, 
        },
        api        
    ) {
        this._cardData = cardData;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._templateCard = document.querySelector(templateSelector).content;
        this._userId = userId;
        this._cardImageSelector = cardImageSelector;
        this._likeActiveSelector = likeActiveSelector;
        this._likeSelector = likeSelector;
        this._deleteBtnSelector = deleteBtnSelector;
        this._cardCountSelector = cardCountSelector;
        this._api = api;
        this.cardImage;
        this.likeBtn;
        this.delBtn;
        this.countField;
    }

    createCard() {
        const cardData = this._cardData;
        const newCard = this._getElement();
        this.cardImage = newCard.querySelector(`.${this._cardImageSelector}`);
        this.likeBtn = newCard.querySelector(`.${this._likeSelector}`);
        this.delBtn = newCard.querySelector(`.${this._deleteBtnSelector}`);
        this.countField = newCard.querySelector(`.${this._cardCountSelector}`);
        
        this._setDataToElement(cardData, newCard);

        this._setEventListeners(cardData, newCard);

        this._setLikeCountToCard(cardData.likes.length);

        if (this._isItLikeOwner(cardData)) {
            this._renderLike(true);
        }

        return newCard;
    }

    _getElement() {
        return this._templateCard
            .querySelector(`.${this._cardSelector}`)
            .cloneNode(true);
    }

    _setDataToElement({ link, name }, template) {
        this.cardImage.src = link;
        this.cardImage.alt = `Фотография места: ${name}`;
        template.querySelector(".gallery-card__label-text").textContent = name;
    }

    _setEventListeners(cardData, card) {
        this.likeBtn.addEventListener(
            "click",
            function () {
                this._likeHandler(card, cardData._id, this.likeBtn);
            }.bind(this)
        );

        this.cardImage.addEventListener(
            "click",
            function () {
                this._handleCardClick(this.cardImage.src, this.cardImage.alt);
            }.bind(this)
        );

        if (this._availableToDelete(cardData)) {
            this._toggleDeleteButton();

            this.delBtn.addEventListener(
                "click",
                function () {
                    this._deleteCard(cardData._id, card);
                }.bind(this)
            );
        }
    }

    _deleteCard(cardId, card) {
        this._api.deleteCard(cardId)
            .then(() => card.remove())
            .catch((err) => console.log(err));
    }

    _availableToDelete(cardData) {
        if (cardData.owner._id === this._userId) {
            return true;
        }

        return false;
    }

    _toggleDeleteButton() {
        this.delBtn.classList.remove("gallery-card__delete_restrict");
    }

    _likeHandler(card, cardId) {
        if (!this.likeBtn.classList.contains(this._likeActiveSelector)) {
            // Своего лайка нет - добавляем
            this._api.setLike(cardId)
                .then((newCardData) => {
                    this._renderLike(true);
                    this._setLikeCountToCard(newCardData.likes.length, card);
                })
                .catch((err) => console.log(err));
        } else {
            //Свой лайк есть, удаляем его
            this._api.removeLike(cardId)
                .then((newCardData) => {
                    this._setLikeCountToCard(newCardData.likes.length);
                    this._renderLike(false);
                })
                .catch((err) => console.log(err));
        }
    }

    _isItLikeOwner({ likes }) {
        if (likes.length === 0) {
            return false;
        }

        for (let i = 0; i < likes.length; i++) {
            if (likes[i]._id === this._userId) {
                return true;
            }
        }

        return false;
    }

    _setLikeCountToCard(count) {
        this.countField.textContent = count;
    }

    _renderLike(state) {        
        if (state) {
            this.likeBtn.classList.add(this._likeActiveSelector);
        } else {
            this.likeBtn.classList.remove(this._likeActiveSelector);
        }
    }
}
