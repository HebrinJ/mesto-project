const popupProfile = document.querySelector('#profile-popup');
const popupAddCard = document.querySelector('#add-card-popup');
const popupCloseBtns = document.querySelectorAll('.popup__container-close-btn');
const popupAvatar = document.querySelector('#change-avatar');

export const popupController = {
    openPopup,
    closePopup,
    popupProfile,
    popupAddCard,
    popupAvatar
}

popupCloseBtns.forEach(function (btn) {    
    btn.addEventListener('mousedown', handleClickClose);    
});

const handleClickClose = function (event) {
    const popup = document.querySelector('.popup_opened');   
    
    const isItPopup = event.target.classList.contains('popup');
    const isItCloseButton = event.target.classList.contains('popup__container-close-btn');
        
    if(!isItPopup && !isItCloseButton) {        
        return;
    }    
    
    closePopup(popup);
}

const handleKeyClose = function (event) {
    const popup = document.querySelector('.popup_opened');

    if(event.key === 'Escape') {
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