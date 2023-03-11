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

/*  Added cards  */