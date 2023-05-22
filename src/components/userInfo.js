
export class UserInfo {
    constructor( {nameSelector, majorSelector} ) {
        this._nameSelector = nameSelector;
        this._majorSelector = majorSelector;
        this._nameField = document.querySelector(`.${this._nameSelector}`);
        this._majorField = document.querySelector(`.${this._majorSelector}`);
    }

    getUserInfo(request) {
        const userData = {};
        
        request().then(({name, about, avatar, _id, cohort}) => {
            userData.name = name;
            userData.about = about;
            userData.avatar = avatar;
            userData._id = _id;
            userData.cohort = cohort;
        });
        
        return userData;
    }

    setUserInfo({ name, about }) {
        this._nameField.textContent = name;
        this._majorField.textContent = about;
    }

    setAvatar(element, link) {
        element.setAttribute("src", link);
    }
}