import coffeeComponent from "./coffeeComponent.js";

export default class coffeeList {
    _items = []
    _itemsNumbers = []
    _container

    constructor(container) {
        this._container = container;
        this.addItem();
        this.render();
    }

    addItem() {
        this._items.push({id: this._items.length + 1, component: new coffeeComponent(this._items.length + 1)})
        this.render()
    }

    removeItem(id) {
        this._items.forEach((item, index) => {
            if (item.id == id && index != 0) {
                this._items.splice(index, 1);
            }
        });
        this.render()
    }

    render() {
        this._container.innerHTML = '';
        this._items.forEach(item => {
            let node = item.component.render()
            this._container.appendChild(node)

            this._container.querySelector(`#ButtonDelete${item.id}`).onclick = (e) => {
                this.removeItem(item.id);
                e.preventDefault();
            }
        });
    }
}