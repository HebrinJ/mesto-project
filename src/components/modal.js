const popupProfile = document.querySelector('#profile-popup');
const popupAddCard = document.querySelector('#add-card-popup');
const popupAvatar = document.querySelector('#change-avatar');
const fullSizeImage = document.querySelector('.popup__full-pict');
const pictureLabel = document.querySelector('.popup__pict-label');
const cardPicturePopup = document.querySelector('#pict-popup');

export const popupController = {
    openPopup,
    closePopup,
    popupProfile,
    popupAddCard,
    popupAvatar
}

const handleClickClose = function (event) {    
    const isItPopup = event.target.classList.contains('popup');
    const isItCloseButton = event.target.classList.contains('popup__container-close-btn');
    
    if(!isItPopup && !isItCloseButton) {        
        return;
    }    
    
    const popup = document.querySelector('.popup_opened');   
    closePopup(popup);
}

const handleKeyClose = function (event) {    
    if(event.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');    
    popup.addEventListener('mousedown', handleClickClose);
    window.addEventListener('keydown', handleKeyClose);
}

function closePopup(popup) {    
    popup.removeEventListener('mousedown', handleClickClose);
    window.removeEventListener('keydown', handleKeyClose);
    popup.classList.remove('popup_opened'); 
}

export const handleCardClick = function (image) {    
    openPopup(cardPicturePopup);
    fullSizeImage.src = image.src;
    fullSizeImage.alt = image.alt;
    pictureLabel.textContent = image.alt;    
}