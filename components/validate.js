const profileInputFields = document.querySelectorAll('.popup__input-profile');
const cardInputFields = document.querySelectorAll('.popup__input-card');

function setValidationListeners(elementList) {
    elementList.forEach((element) => {
        element.addEventListener('input', validationForm);        
    })
}

function validationForm(event) {
    
    const inputElement = event.target;
    const form = inputElement.parentElement;
    const inputFields = form.querySelectorAll('.popup__container-input');
    const button = form.querySelector('.popup__container-save-btn');    
    
    if(!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage);
    } else {
        hideInputError(inputElement);
    }

    let isFormInvalid = Array.from(inputFields).some((element) => {return element.validity.valid === false})
    
    toggleButtonState(button, isFormInvalid);
}

function showInputError(element, errorMessage) {
    element.classList.add('popup__container-input_error'); 
    document.querySelector(`#${element.id}-error`).textContent = errorMessage;
}

function hideInputError(element) {
    element.classList.remove('popup__container-input_error');
    document.querySelector(`#${element.id}-error`).textContent = '';
}

function toggleButtonState(button, state) {
    button.disabled = state;
}

function setDefaultButtonsState() {
    const buttons = document.querySelectorAll('.popup__container-save-btn');
    
    buttons.forEach((button) => {
        toggleButtonState(button, true);
    })
}

setDefaultButtonsState();

setValidationListeners(profileInputFields);
setValidationListeners(cardInputFields);