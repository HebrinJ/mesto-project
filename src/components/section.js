export class Section {
    constructor( { items, renderer }, containerSelector ) {
        this._items = items.reverse();
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderAll() { 
        const items = this._items.map(element => {            
            const item = this._renderer(element);
            return item;
        });        

        return items;
    }

    addItem(element) {
        const container = document.querySelector(`.${this._containerSelector}`);
        container.prepend(element);
    }

}