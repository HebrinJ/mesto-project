const profileInputFields = document.querySelectorAll('.popup__input-profile');
const cardInputFields = document.querySelectorAll('.popup__input-card');

export const validationController = {
    setDefaultButtonsState,
    setAllValidationListeners
}

const validationPattern = /[^a-zа-я\s\-]/i;

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
    const patternMatch = validationPattern.test(inputElement.value);
    
    if(!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage);
    } else if (patternMatch && inputElement.id != 'inputPict') {
        showInputError(inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
        toggleButtonState(button, true);
        return;
    } else {
        hideInputError(inputElement);         
    }       
    //Проверяем оба поля на валидность и обновляем кнопку
    let isFormInvalid = Array.from(inputFields).some((element) => {return element.validity.valid === false})    
    toggleButtonState(button, isFormInvalid);
}

function showInputError(element, errorMessage) {
    element.classList.add('popup__container-input_error'); 

    const errorField = document.querySelector(`#${element.id}-error`);
    errorField.textContent = errorMessage;

    if(errorMessage.length > 56) {
        errorField.classList.add('popup__container-input-error-message_overflow');
    } else {
        errorField.classList.remove('popup__container-input-error-message_overflow');
    }
}

function hideInputError(element) {
    element.classList.remove('popup__container-input_error');
    const errorField = document.querySelector(`#${element.id}-error`);

    errorField.textContent = '';
    errorField.classList.remove('popup__container-input-error-message_overflow');
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

function setAllValidationListeners() {
    setValidationListeners(profileInputFields);
    setValidationListeners(cardInputFields);
}
