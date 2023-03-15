const cardGallery = document.querySelector('.gallery');
const cardForm = document.querySelector('#cardForm');
const templateCard = document.querySelector('#card-template').content;

/*  Initializing default cards  */

initialCards.forEach( function(card) {
    addNewCard(card.link, card.name);
});

/*  Open-close Popup  */

const editBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('#profile-popup');
const popupAddCard = document.querySelector('#add-card-popup');
const popupCloseBtns = document.querySelectorAll('.popup__container-close-btn');
const timeToDisplayReady = 50;
const timeToDissapear = 300;

editBtn.addEventListener('click', function() {
    openPopup(popupProfile);
    fillProfileFields();
});

addCardBtn.addEventListener('click', function() {
    openPopup(popupAddCard);
});

popupCloseBtns.forEach(function (btn) {
    btn.addEventListener('click', function() {
        const element = document.querySelector('.popup_opened.popup_visibility');
        closePopup(element);
    });
});

function openPopup(popup) {
    displayPopup(popup);
    setTimeout(transitionVisibility, timeToDisplayReady, popup);
}

function closePopup(element) {
    element.classList.remove('popup_visibility');
    setTimeout(function() {element.classList.remove('popup_opened')}, timeToDissapear);
}

function transitionVisibility(element) { 
    element.classList.add('popup_visibility');
}

function displayPopup(element) {
    element.classList.add('popup_opened');
}

/*  Open fullsize card event listeners  */

const pictPopup = document.querySelector('#pict-popup');
const pict = document.querySelector('.popup__full-pict');
const gallery = document.querySelectorAll('.gallery-card__pict');

gallery.forEach(function(card) {
    addListenerToCard(card);
});

function addListenerToCard(card) {
    card.addEventListener('click', function() {
        openPopup(pictPopup);
        pict.src = card.src;
        pict.alt = 'user_picture';
    });
}

/*  Adding cards  */


cardForm.addEventListener('submit', createUserCard);

function addNewCard(cardPic, cardName) {
    
    const newCard = templateCard.querySelector('li').cloneNode(true);    
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

    cardGallery.prepend(newCard);
}

function createUserCard(evt) {
    evt.preventDefault();

    const inputFieldPlace = document.querySelector('.popup__container-input_field_place');
    const inputFieldPict = document.querySelector('.popup__container-input_field_pict');

    addNewCard(inputFieldPict.value, inputFieldPlace.value);
    document.querySelector('.popup_opened').classList.remove('popup_opened');

    inputFieldPlace.value = '';
    inputFieldPict.value = '';
}

function toggleLike(card) {
    card.classList.toggle('gallery-card__like_active');
}

/*  Profile changing data  */

const profileForm = document.querySelector('#profileForm');
const inputFieldName = document.querySelector('.popup__container-input_field_name');
const inputFieldMajor = document.querySelector('.popup__container-input_field_major');
const profileName = document.querySelector('.profile__name');
const profileMajor = document.querySelector('.profile__major');

fillProfileFields();
profileForm.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
  evt.preventDefault(); 

profileName.textContent = inputFieldName.value;
profileMajor.textContent = inputFieldMajor.value;
document.querySelector('.popup_opened').classList.remove('popup_opened');
}

function fillProfileFields() {
    inputFieldName.value = profileName.textContent;
    inputFieldMajor.value = profileMajor.textContent;
}


