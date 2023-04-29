
export const apiController = {
    getProfileData,
    getCards,
    editProfileData,
    sendNewCard,
    deleteCard,
    setLike,
    removeLike,
    changeAvatar
}

import { checkResponse } from "./utils";

const config = {
    baseUrl: `https://nomoreparties.co/v1/plus-cohort-23`,
    headers: {
      authorization: '020effc4-1211-4deb-93d9-11a33dcdf1a5',
      'Content-Type': 'application/json',
    },
  };
  

function request(linkEndpoint, options) {
    return fetch(config.baseUrl+linkEndpoint, options).then(checkResponse);
}

function getProfileData() {
    return request(`/users/me`, { 
        headers: config.headers
    })    
}

function getCards() {
    return request(`/cards`, {
        headers: config.headers
    })
}

function editProfileData(newName, newMajor) {
    return request(`/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newMajor
        })
    });
}

function sendNewCard(cardLink, cardName) {
    return request(`/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
    })
}

function deleteCard(cardId) {
    return request(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: config.headers
    })
}

function setLike(cardId) {
    return request(`/cards/likes/${cardId}`, { 
        method: 'PUT',
        headers: config.headers
    })  
}

function removeLike(cardId) {
    return request(`/cards/likes/${cardId}`, { 
        method: 'DELETE',
        headers: config.headers
    })  
}

function changeAvatar(avatarLink) {    
    return request(`/users/me/avatar`, { 
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
          })
    }) 
}
