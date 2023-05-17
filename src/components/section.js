export class Section {
    constructor( { items, renderer }, containerSelector ) {
        this._items = items.reverse();
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderAll() {        
        this._items.forEach(element => {            
            const card = this._renderer(element);
            this.addItem(card);
        });
    }

    addItem(element) {
        const container = document.querySelector(`.${this._containerSelector}`);
        container.prepend(element);
    }

}