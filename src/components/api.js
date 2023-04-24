
const cohortId = 'plus-cohort-23';
const PATH = 'https://nomoreparties.co/v1/';

export const apiController = {
    getProfileData,
    getCards,
    editProfileData,
    sendNewCard,
    deleteCard
}

function getProfileData() {
    return fetch(`${PATH}${cohortId}/users/me`, { 
        headers: {
            authorization: '020effc4-1211-4deb-93d9-11a33dcdf1a5'
          }
    })    
}

function getCards() {
    return fetch(`${PATH}${cohortId}/cards`, {
        headers: {
            authorization: '020effc4-1211-4deb-93d9-11a33dcdf1a5'
          }
    })
}

function editProfileData(newName, newMajor) {
    return fetch(`${PATH}${cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '020effc4-1211-4deb-93d9-11a33dcdf1a5',
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
          authorization: '020effc4-1211-4deb-93d9-11a33dcdf1a5',
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
                authorization: '020effc4-1211-4deb-93d9-11a33dcdf1a5'
              }
    })
}

// function getLikeCount(cardId) {
//     return fetch(`${PATH}${cohortId}/cards/likes/cardId`, {
//         headers: {
//             authorization: '020effc4-1211-4deb-93d9-11a33dcdf1a5'
//           }
//     })  
// }

// function setLike(cardId) {
//     return fetch(`${PATH}${cohortId}/cards/likes/cardId`, { 
//         method: 'PUT',
//         headers: {
//             authorization: '020effc4-1211-4deb-93d9-11a33dcdf1a5'
//           }
//     })  
// }
