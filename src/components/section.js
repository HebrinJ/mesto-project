export class Section {
    constructor( { items, renderer }, containerSelector ) {
        this._items = items.reverse();
        this._renderer = renderer;
        this._container = document.querySelector(`.${containerSelector}`);
    }

    renderAll() { 
        const items = this._items.map(element => {            
            const item = this._renderer(element);
            return item;
        });        

        return items;
    }

    addItem(element) {        
        this._container.prepend(element);
    }

}