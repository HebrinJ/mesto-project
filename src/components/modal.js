const popupProfile = document.querySelector('#profile-popup');
const popupAddCard = document.querySelector('#add-card-popup');
const popupCloseBtns = document.querySelectorAll('.popup__container-close-btn');

export const popupController = {
    openPopup,
    closePopup,
    popupProfile,
    popupAddCard
}

popupCloseBtns.forEach(function (btn) {    
    btn.addEventListener('mousedown', clickCloseHandler);    
});

const clickCloseHandler = function (event) {
    const popup = document.querySelector('.popup_opened');   
    
    const isItPopup = event.target.classList.contains('popup');
    const isItCloseButton = event.target.classList.contains('popup__container-close-btn');
        
    if(!isItPopup && !isItCloseButton) {        
        return;
    }    
    
    closePopup(popup);
}

const keyCloseHandler = function (event) {
    const popup = document.querySelector('.popup_opened');

    if(event.key === 'Escape') {
        closePopup(popup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');    
    popup.addEventListener('mousedown', clickCloseHandler);
    window.addEventListener('keydown', keyCloseHandler);
}

function closePopup(popup) {    
    popup.removeEventListener('mousedown', clickCloseHandler);
    window.removeEventListener('keydown', keyCloseHandler);
    popup.classList.remove('popup_opened'); 
}