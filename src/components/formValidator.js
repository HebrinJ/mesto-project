export class FormValidator {
    constructor(
        {
            inputSelector,
            submitButtonSelector,
            errorContainerSelector,
            inputErrorStyleSelector,
            validationPattern,
            inputFieldSelector,
        },
        form
    ) {
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._errorContainerSelector = errorContainerSelector;
        this._inputErrorStyleSelector = inputErrorStyleSelector;
        this._validationPattern = validationPattern;
        this._form = form;
        this._formFields = form.querySelectorAll(inputFieldSelector);
    }

    enableValidation() {
        this._setValidationListeners(
            this._form,
            this._inputSelector,
            this._submitButtonSelector,
            this._errorContainerSelector
        );
    }

    _setValidationListeners(form, inputFieldSelector, submitButtonSelector) {
        const inputList = Array.from(form.querySelectorAll(inputFieldSelector));
        const submitButton = form.querySelector(submitButtonSelector);

        form.addEventListener(
            "reset",
            function () {
                this._toggleButtonState(submitButton, true); //true - активация состояния disabled
            }.bind(this)
        );

        inputList.forEach((inputField) => {
            const errorContainer = document.querySelector(
                `#${inputField.id}-error`
            );
            inputField.addEventListener(
                "input",
                function () {
                    this._isFormValid(                        
                        inputField,                        
                        errorContainer,
                        submitButton
                    );
                }.bind(this)
            );
        });

        this._toggleButtonState(submitButton, true); //true - активация состояния disabled
    }

    _isFormValid(        
        inputField,        
        errorContainer,
        submitButton
    ) {
        //Проверка и форматирование текущего поля
        this._validationCurrentField(inputField, errorContainer);

        //Проверка всей формы на валидность        
        this._toggleButtonState(submitButton, false);

        this._formFields.forEach(
            function (field) {
                if (this._isFieldValid(field).validState === false) {
                    this._toggleButtonState(submitButton, true); //true - активация состояния disabled
                }
            }.bind(this)
        );
    }

    _validationCurrentField(inputField, errorContainer) {
        const validationResult = this._isFieldValid(inputField);

        if (validationResult.validState === true) {
            this._hideInputError(inputField, errorContainer);
        } else {
            this._showInputError(
                inputField,
                errorContainer,
                validationResult.errorMessage
            );
        }
    }

    _isFieldValid(inputField, errorContainer) {
        if (inputField.getAttribute("type") === "text") {
            return this._validationTextField(inputField, errorContainer);
        } else if (inputField.getAttribute("type") === "url") {
            return this._validationUrlField(inputField, errorContainer);
        }
    }

    _validationUrlField(inputField) {
        const validationResult = {
            validState: inputField.validity.valid,
            errorMessage: inputField.validationMessage,
        };
        return validationResult;
    }

    _validationTextField(inputField) {
        const patternMatch = this._validationPattern.test(inputField.value);

        if (inputField.validity.valid === false) {
            const validationResult = {
                validState: inputField.validity.valid,
                errorMessage: inputField.validationMessage,
            };
            return validationResult;
        } else if (patternMatch) {
            const validationResult = {
                validState: false,
                errorMessage:
                    "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
            };
            return validationResult;
        } else {
            const validationResult = {
                validState: true,
                errorMessage: "",
            };
            return validationResult;
        }
    }

    _showInputError(inputField, errorContainer, errorMessage) {
        inputField.classList.add(this._inputErrorStyleSelector);
        errorContainer.textContent = errorMessage;
    }

    _hideInputError(inputField, errorContainer) {
        inputField.classList.remove(this._inputErrorStyleSelector);
        errorContainer.textContent = "";
    }

    _toggleButtonState(button, state) {
        button.disabled = state;
    }
}
