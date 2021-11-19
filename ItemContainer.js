class ItemContainer {
    #source = [];
    #view;

    constructor(view) {
        this.#view = view;
    }

    get count() {
        return this.#source.length;
    }

    append(item) {
        this.#source.push(item);
        this.#view.append(item.view);
    }

    remove(index) {
        if (this.count > 1) {
            const [removedItem] = this.#source.splice(index, 1);
            removedItem.view.remove();
            for (let subIndex = index; subIndex < this.#source.length; subIndex++) {
                this.#source[subIndex].number = subIndex + 1;
            }
        }
    }
}
