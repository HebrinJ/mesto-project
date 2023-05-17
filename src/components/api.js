import { checkResponse } from "./utils";

const config = {
    baseUrl: `https://nomoreparties.co/v1/plus-cohort-23`,
    headers: {
        authorization: "020effc4-1211-4deb-93d9-11a33dcdf1a5",
        "Content-Type": "application/json",
    },
};

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _request(linkEndpoint, options) {
        return fetch(this._baseUrl + linkEndpoint, options).then(checkResponse);
    }

    getProfileData() {
        return this._request(`/users/me`, {
            headers: this._headers,
        });
    }

    getCards() {
        return this._request(`/cards`, {
            headers: this._headers,
        });
    }

    editProfileData(newName, newMajor) {
        return this._request(`/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: newName,
                about: newMajor,
            }),
        });
    }

    sendNewCard(cardLink, cardName) {
        return this._request(`/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink,
            }),
        });
    }

    deleteCard(cardId) {
        return this._request(`/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    setLike(cardId) {
        return this._request(`/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    removeLike(cardId) {
        return this._request(`/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    changeAvatar(avatarLink) {
        return this._request(`/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink,
            }),
        });
    }
}

export const api = new Api(config);
