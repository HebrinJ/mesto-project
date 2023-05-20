
export class UserInfo {
    constructor( {nameSelector, majorSelector} ) {
        this._nameSelector = nameSelector;
        this._majorSelector = majorSelector;
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
        const nameField = document.querySelector(`.${this._nameSelector}`);
        const majorField = document.querySelector(`.${this._majorSelector}`);
        
        nameField.textContent = name;
        majorField.textContent = about;
    }

    setAvatar(element, link) {
        element.setAttribute("src", link);
    }
}