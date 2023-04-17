import { cardController } from './components/card.js';
import { initialCards } from './components/utils.js';
import { validationController } from './components/validate.js'
import './pages/index.css';

initialCards.forEach( function(card) {
    const newCard = cardController.createCard(card.link, card.name);
    cardController.addCard(newCard);
});

validationController.setAllValidationListeners();
validationController.setDefaultButtonsState();
