/*  Initializing default cards  */

initialCards.forEach( function(card) {
    const newCard = createCard(card.link, card.name);
    addCard(newCard);
});

/*  Open-close Popup  */

editBtn.addEventListener('click', function() {
    openPopup(popupProfile);
    fillProfileFields();
});

addCardBtn.addEventListener('click', function() {
    openPopup(popupAddCard);
});

popupCloseBtns.forEach(function (btn) {
    btn.addEventListener('click', function() {
        closePopup();
    });
});

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup = document.querySelector('.popup_opened');
    popup.classList.remove('popup_opened');
}

/*  Open fullsize card event listeners  */

cardPicture.forEach(function(card) {
    addListenerToCard(card);
});

function addListenerToCard(card) {
    card.addEventListener('click', function() {
        openPopup(cardPicturePopup);
        fullSizePicture.src = card.src;
        fullSizePicture.alt = 'user_picture';
    });
}

/*  Adding cards  */

cardForm.addEventListener('submit', createUserCard);

function createCard(cardPic, cardName) {
    
    const newCard = templateCard.querySelector('.gallery-card-list-element').cloneNode(true);    
    const newCardPic = newCard.querySelector('.gallery-card__pict');

    newCardPic.src = cardPic;
    newCardPic.alt = 'user_picture';
    newCard.querySelector('.gallery-card__label-text').textContent = cardName;
    
    addListenerToCard(newCardPic);
    
    const likeBtn = newCard.querySelector('.gallery-card__like');
    const delBtn = newCard.querySelector('.gallery-card__delete');
    
    likeBtn.addEventListener('click', function () {
        toggleLike(likeBtn);
    });
    delBtn.addEventListener('click', function () {
        delBtn.parentElement.parentElement.remove();
    });

    return newCard;
}

function addCard(card) {    
    cardGallery.prepend(card);
}

function createUserCard(evt) {
    evt.preventDefault();

    const inputFieldPlace = document.querySelector('.popup__container-input_field_place');
    const inputFieldPict = document.querySelector('.popup__container-input_field_pict');

    const newCard = createCard(inputFieldPict.value, inputFieldPlace.value);

    addCard(newCard);
    closePopup();
    
    cardForm.reset();
}

function toggleLike(card) {
    card.classList.toggle('gallery-card__like_active');
}

/*  Profile changing data  */

profileForm.addEventListener('submit', profileSubmitHandler);

function profileSubmitHandler (evt) {
  evt.preventDefault(); 

profileName.textContent = inputFieldName.value;
profileMajor.textContent = inputFieldMajor.value;
closePopup();
}

function fillProfileFields() {
    inputFieldName.value = profileName.textContent;
    inputFieldMajor.value = profileMajor.textContent;
}


