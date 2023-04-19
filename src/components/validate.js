
export const validationController = {
    setDefaultButtonsState,
    enableValidation
}

const validationPattern = /[^a-zа-я\s\-]/i;

function setValidationListeners(form, inputFieldSelector, submitButtonSelector) {
    const inputList = Array.from(form.querySelectorAll(inputFieldSelector));  
    const submitButton = form.querySelector(submitButtonSelector);
    
    inputList.forEach((inputField) => {
        const errorContainer = document.querySelector(`#${inputField.id}-error`)
        inputField.addEventListener('input', () => { validateInput(form, inputField, errorContainer, submitButton) });        
    })
}

function validateInput(form, inputField, errorContainer, submitButton) {
    const patternMatch = validationPattern.test(inputField.value);

    if(!inputField.validity.valid) {
        showInputError(inputField, errorContainer, inputField.validationMessage);

    } else if (patternMatch && inputField.id != 'inputPict') {
        showInputError(inputField, errorContainer, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
        toggleButtonState(submitButton, true);
        return;
        
    } else {
        hideInputError(inputField, errorContainer);         
    }
    
    toggleButtonState(submitButton, isFormValid(form));
}

function isFormValid(form) {    
    const formFields = form.querySelectorAll('.popup__container-input');
    return Array.from(formFields).some((element) => {return element.validity.valid === false})
}

function showInputError(inputField, errorContainer, errorMessage) { 
    inputField.classList.add('popup__container-input_error');   
    errorContainer.textContent = errorMessage;
}

function hideInputError(inputField, errorContainer) {
    inputField.classList.remove('popup__container-input_error');
    errorContainer.textContent = '';
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

function enableValidation(validationSetting)  {
    const forms = Array.from(document.querySelectorAll(validationSetting.formSelector));

    forms.forEach((form) => { setValidationListeners(form, validationSetting.inputSelector, validationSetting.submitButtonSelector, validationSetting.errorContainerSelector) });
}


// function setValidationListeners(elementList) {
//     elementList.forEach((element) => {
//         element.addEventListener('input', validationForm);        
//     })
// }

// function setAllValidationListeners() {
//     setValidationListeners(profileInputFields);
//     setValidationListeners(cardInputFields);
// }


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   });



// const validationSetting = {
//     formSelector: '.popup__container-form',
//     inputSelector: '.popup__container-input',
//     submitButtonSelector: '.popup__container-save-btn',
// }

// function validationForm(event) {    
//     const inputElement = event.target;
//     const form = inputElement.parentElement;
//     const inputFields = form.querySelectorAll('.popup__container-input');
//     const button = form.querySelector('.popup__container-save-btn');
//     const patternMatch = validationPattern.test(inputElement.value);
    
//     if(!inputElement.validity.valid) {
//         showInputError(inputElement, inputElement.validationMessage);

//     } else if (patternMatch && inputElement.id != 'inputPict') {
//         showInputError(inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
//         toggleButtonState(button, true);
//         return;

//     } else {
//         hideInputError(inputElement);         
//     }       

//     //Проверяем оба поля на валидность и обновляем кнопку
//     let isFormInvalid = Array.from(inputFields).some((element) => {return element.validity.valid === false})    
//     toggleButtonState(button, isFormInvalid);
// }