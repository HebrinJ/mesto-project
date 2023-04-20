
export const validationController = {
    setDefaultButtonsState,
    enableValidation
}

import { validationSetting } from "../index";

const validationPattern = /[^a-zа-я\s\-]/i;

function enableValidation(validationSetting)  {
    const forms = Array.from(document.querySelectorAll(validationSetting.formSelector));

    forms.forEach((form) => { setValidationListeners(form, validationSetting.inputSelector, validationSetting.submitButtonSelector, validationSetting.errorContainerSelector) });
}

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
    
    toggleButtonState(submitButton, isFormValid(form, validationSetting.inputSelector));
}

function isFormValid(form, inputSelector) {    
    const formFields = form.querySelectorAll(inputSelector);
    return Array.from(formFields).some((element) => {return element.validity.valid === false})
}

function showInputError(inputField, errorContainer, errorMessage) { 
    inputField.classList.add(validationSetting.inputErrorStyleSelector);   
    errorContainer.textContent = errorMessage;
}

function hideInputError(inputField, errorContainer) {
    inputField.classList.remove(validationSetting.inputErrorStyleSelector);
    errorContainer.textContent = '';
}

function toggleButtonState(button, state) {
    button.disabled = state;
}

function setDefaultButtonsState() {
    const buttons = document.querySelectorAll(validationSetting.submitButtonSelector);
    
    buttons.forEach((button) => {
        toggleButtonState(button, true);
    })
}

