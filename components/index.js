import { cardController } from './card.js';
import { initialCards } from './utils.js';

initialCards.forEach( function(card) {
    const newCard = cardController.createCard(card.link, card.name);
    cardController.addCard(newCard);
});
