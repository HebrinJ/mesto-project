/*  Open-close Popup  */

const editBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('#profile-popup');
const popupAddCard = document.querySelector('#add-card-popup');
const popupCloseBtns = document.querySelectorAll('.popup__container-close-btn');

editBtn.addEventListener('click', function() {
    popupProfile.classList.add('popup_opened')
});

addCardBtn.addEventListener('click', function() {
    popupAddCard.classList.add('popup_opened')
});

popupCloseBtns.forEach(function (elem) {
    elem.addEventListener('click', function() {
        document.querySelector('.popup_opened').classList.remove('popup_opened');
    })
});

/*  Profile changing data  */

const profileForm = document.querySelector('#profileForm');
const inputFieldName = document.querySelector('.popup__container-input_field_name');
const inputFieldMajor = document.querySelector('.popup__container-input_field_major');
const profileName = document.querySelector('.profile__name');
const profileMajor = document.querySelector('.profile__major');

inputFieldName.value = profileName.textContent;
inputFieldMajor.value = profileMajor.textContent;

function formSubmitHandler (evt) {
  evt.preventDefault(); 

profileName.textContent = inputFieldName.value;
profileMajor.textContent = inputFieldMajor.value;
document.querySelector('.popup_opened').classList.remove('popup_opened');
}

profileForm.addEventListener('submit', formSubmitHandler);

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
    })

/*  Adding cards  */

function addNewCard(cardPic, cardName) {
    const templateCard = document.querySelector('#card-template').content;
    const newCard = templateCard.querySelector('li').cloneNode(true);
    const cardGallery = document.querySelector('.gallery');

    newCard.querySelector('.gallery-card__pict').src = cardPic;
    newCard.querySelector('.gallery-card__label-text').textContent = cardName;
    cardGallery.append(newCard);
}

const cardForm = document.querySelector('#cardForm');

function createUserCard(evt) {
    evt.preventDefault();

    const inputFieldPlace = document.querySelector('.popup__container-input_field_place');
    const inputFieldPict = document.querySelector('.popup__container-input_field_pict');

    addNewCard(inputFieldPict.value, inputFieldPlace.value);
    document.querySelector('.popup_opened').classList.remove('popup_opened');
}

cardForm.addEventListener('submit', createUserCard);

/*  Cards Like  */

const likeBtns = document.querySelectorAll('.gallery-card__like');

likeBtns.forEach(function(likeBtn) {
    likeBtn.addEventListener('click', function () {
        toggleLike(likeBtn);
    });
})

function toggleLike(card) {
    card.classList.toggle('gallery-card__like_active');
}

/*  Remove card  */



/*  Open fullsize card   */