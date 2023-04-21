
const cohortId = 'plus-cohort-23';
const PATH = 'https://nomoreparties.co/v1/';

export const apiController = {
    getProfileData
}

function getProfileData() {
    return fetch(`${PATH}${cohortId}/users/me`, { 
        headers: {
            authorization: '020effc4-1211-4deb-93d9-11a33dcdf1a5'
          }
    })    
}
