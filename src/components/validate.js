
export const validationController = {
    setDefaultButtonsState,
    enableValidation
}

import { validationSetting } from '../index';

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
        inputField.addEventListener('input', () => { isFormValid(form, inputField, inputFieldSelector, errorContainer, submitButton) });        
    })
}

function isFormValid(form, inputField, inputFieldSelector, errorContainer, submitButton) {    
    //Проверка и форматирование текущего поля 
    validationCurrentField(inputField, errorContainer);
    
    //Проверка всей формы на валидность
    const formFields = form.querySelectorAll(inputFieldSelector);
    toggleButtonState(submitButton, false);

    formFields.forEach(field => {
        if(isFieldValid(field).validState === false) {
            toggleButtonState(submitButton, true);  //true - активация состояния disabled
        }
    });
}

function validationCurrentField(inputField, errorContainer) {
    let validationResult = isFieldValid(inputField);
    
    if(validationResult.validState === true) {
        hideInputError(inputField, errorContainer);
    } else {
        showInputError(inputField, errorContainer, validationResult.errorMessage);
    }
}

function isFieldValid(inputField, errorContainer) {
    
    if (inputField.getAttribute('type') === 'text') {
        return validationTextField(inputField, errorContainer);

    } else if (inputField.getAttribute('type') === 'url') {
        return validationUrlField(inputField, errorContainer);
    }
}

function validationUrlField(inputField) {    
    const validationResult = { 
        validState: inputField.validity.valid,
        errorMessage: inputField.validationMessage };
    return validationResult;
}

function validationTextField(inputField) {
    const patternMatch = validationPattern.test(inputField.value);

    if(inputField.validity.valid === false) {
        const validationResult = { 
            validState: inputField.validity.valid,
            errorMessage: inputField.validationMessage };
        return validationResult;
    } else if (patternMatch) {
        const validationResult = { 
            validState: false,
            errorMessage: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы' };
        return validationResult;
    } else {
        const validationResult = { 
            validState: true,
            errorMessage: '' };
        return validationResult;
    }
    
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

function setDefaultButtonsState(buttons) {
       
    buttons.forEach((button) => {
        toggleButtonState(button, true);
    })
}

