
const cohortId = 'plus-cohort-23';
const PATH = 'https://nomoreparties.co/v1/';
const auth = '020effc4-1211-4deb-93d9-11a33dcdf1a5';

export const apiController = {
    getProfileData,
    getCards,
    editProfileData,
    sendNewCard,
    deleteCard,
    setLike,
    removeLike,
    getCardData
}

function getProfileData() {
    return fetch(`${PATH}${cohortId}/users/me`, { 
        headers: {
            authorization: auth
          }
    })    
}

function getCards() {
    return fetch(`${PATH}${cohortId}/cards`, {
        headers: {
            authorization: auth
          }
    })
}

function editProfileData(newName, newMajor) {
    return fetch(`${PATH}${cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: auth,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            about: newMajor
        })
    });
}

function sendNewCard(cardLink, cardName) {
    return fetch(`${PATH}${cohortId}/cards`, {
        method: 'POST',
        headers: {
          authorization: auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
    })
}

function deleteCard(cardId) {
    return fetch(`${PATH}${cohortId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: auth
              }
    })
}

function setLike(cardId) {
    return fetch(`${PATH}${cohortId}/cards/likes/${cardId}`, { 
        method: 'PUT',
        headers: {
            authorization: auth
          }
    })  
}

function removeLike(cardId) {
    return fetch(`${PATH}${cohortId}/cards/likes/${cardId}`, { 
        method: 'DELETE',
        headers: {
            authorization: auth
          }
    })  
}

function getCardData(cardId) {    
    return getCards()
    .then((res) => {
        if(res.ok) {
            return res.json()
        } else {            
            return Promise.reject(`Ошибка: ${res.status}`);
        }})
    .then((cards) => {
        for (let i = 0; i < cards.length; i++) {
            if(cards[i]._id === cardId) {                
                return cards[i];
            }
        }
    })
    .catch()
}