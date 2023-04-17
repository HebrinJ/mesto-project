const editBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const popupCloseBtns = document.querySelectorAll('.popup__container-close-btn');
const popupProfile = document.querySelector('#profile-popup');
const profileForm = document.querySelector('#profileForm');
const inputFieldName = document.querySelector('.popup__container-input_field_name');
const inputFieldMajor = document.querySelector('.popup__container-input_field_major');
const profileName = document.querySelector('.profile__name');
const profileMajor = document.querySelector('.profile__major');
const popupAddCard = document.querySelector('#add-card-popup');

export const popupController = {
    openPopup,
}

profileForm.addEventListener('submit', profileSubmitHandler);

editBtn.addEventListener('click', function() {
    openPopup(popupProfile);
    fillProfileFields();
});

addCardBtn.addEventListener('click', function() {
    openPopup(popupAddCard);
});

popupCloseBtns.forEach(function (btn) {    
    btn.addEventListener('mousedown', clickClosePopup);    
});

function openPopup(popup) {
    popup.classList.add('popup_opened');    

    popup.addEventListener('mousedown', clickClosePopup);
    window.addEventListener('keydown', keyClosePopup);
}

function clickClosePopup(event) {
    const isItPopup = event.target.classList.contains('popup');
    const isItCloseButton = event.target.classList.contains('popup__container-close-btn');
    
    if(!isItPopup && !isItCloseButton) {
        return;
    }
    
    event.currentTarget.removeEventListener('click', clickClosePopup);
    window.removeEventListener('keydown', keyClosePopup);

    event.currentTarget.classList.remove('popup_opened');
}

function keyClosePopup(event) {  
    
    if(event.key === 'Escape') {        
        const popup = document.querySelector('.popup_opened');
        popup.classList.remove('popup_opened');

        window.removeEventListener('keydown', keyClosePopup);
        popup.removeEventListener('click', clickClosePopup);
    }
}

function profileSubmitHandler (evt) {
  evt.preventDefault(); 

    profileName.textContent = inputFieldName.value;
    profileMajor.textContent = inputFieldMajor.value;
    clickClosePopup(popupProfile);
}

function fillProfileFields() {
    inputFieldName.value = profileName.textContent;
    inputFieldMajor.value = profileMajor.textContent;
}