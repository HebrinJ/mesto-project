/*  Initializing default cards  */

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];

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
    });
}

/*  Adding cards  */

const cardForm = document.querySelector('#cardForm');
cardForm.addEventListener('submit', createUserCard);

function addNewCard(cardPic, cardName) {
    const templateCard = document.querySelector('#card-template').content;
    const newCard = templateCard.querySelector('li').cloneNode(true);
    const cardGallery = document.querySelector('.gallery');
    const newCardPic = newCard.querySelector('.gallery-card__pict');

    newCardPic.src = cardPic;
    newCard.querySelector('.gallery-card__label-text').textContent = cardName;
    
    addListenerToCard(newCardPic);
    
    const likeBtn = newCard.querySelector('.gallery-card__like');    
    likeBtn.addEventListener('click', function () {
        toggleLike(likeBtn);
    });

    cardGallery.append(newCard);
}

function createUserCard(evt) {
    evt.preventDefault();

    const inputFieldPlace = document.querySelector('.popup__container-input_field_place');
    const inputFieldPict = document.querySelector('.popup__container-input_field_pict');

    addNewCard(inputFieldPict.value, inputFieldPlace.value);
    document.querySelector('.popup_opened').classList.remove('popup_opened');
}

function toggleLike(card) {
    card.classList.toggle('gallery-card__like_active');
}

/*  Remove card  */

const deleteBtns = document.querySelectorAll('.gallery-card__delete');

deleteBtns.forEach(function(delBtn) {
    delBtn.addEventListener('click', function () {
        delBtn.parentElement.parentElement.remove();
    });
});

/*  Profile changing data  */

const profileForm = document.querySelector('#profileForm');
const inputFieldName = document.querySelector('.popup__container-input_field_name');
const inputFieldMajor = document.querySelector('.popup__container-input_field_major');
const profileName = document.querySelector('.profile__name');
const profileMajor = document.querySelector('.profile__major');

inputFieldName.value = profileName.textContent;
inputFieldMajor.value = profileMajor.textContent;
profileForm.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
  evt.preventDefault(); 

profileName.textContent = inputFieldName.value;
profileMajor.textContent = inputFieldMajor.value;
document.querySelector('.popup_opened').classList.remove('popup_opened');
}



