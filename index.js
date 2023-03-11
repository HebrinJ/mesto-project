/*  Open-close Popup  */

const editBtn = document.querySelector('.profile__edit-button');
const popupWindow = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__container-close-btn');

editBtn.addEventListener('click', function() {
    popupWindow.classList.add('popup_opened')
});

popupCloseBtn.addEventListener('click', function() {
    popupWindow.classList.remove('popup_opened')
});

/*  Popup changed data  */

const formElement = document.querySelector('.popup__container-form');
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
popupWindow.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

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
        AddNewCard(card.link, card.name);
    })

/*  Adding cards  */

function AddNewCard(cardPic, cardName) {
    const templateCard = document.querySelector('#card-template').content;
    const newCard = templateCard.querySelector('li').cloneNode(true);
    const cardGallery = document.querySelector('.gallery');

    newCard.querySelector('.gallery-card__pict').src = cardPic;
    newCard.querySelector('.gallery-card__label-text').textContent = cardName;
    cardGallery.append(newCard);
}