
const cohortId = 'plus-cohort-23';
const PATH = 'https://nomoreparties.co/v1/';

export const apiController = {
    getProfileData,
    getCards,
    editProfileData,
    sendNewCard
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
