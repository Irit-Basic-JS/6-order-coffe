class DrinkFieldset {
    numberHandler;
    onDelete;

    constructor(numberHandler) {
        this.numberHandler = numberHandler;
    }

    createElement() {
        const fieldset = this.#createFieldset();
        const [header, changeNumber] = this.#createHeader(fieldset);
        const drinkTypeField = this.#createDrinkTypeField();
        const milkField = this.#createMilkField();
        const optionsField = this.#createOptionsField();

        fieldset.appendChild(header);
        fieldset.appendChild(drinkTypeField);
        fieldset.appendChild(milkField);
        fieldset.appendChild(optionsField);

        return [fieldset, changeNumber];
    }

    #createFieldset() {
        const fieldset = document.createElement('fieldset');
        fieldset.classList.add('beverage');
        return fieldset;
    }

    #createHeader(fieldset) {
        const header = document.createElement("h4");
        header.classList.add('beverage-count');
        header.style = "display: inline-block;";
        const changer = () => {
            header.innerHTML = `Напиток №${this.numberHandler()}`;
        };
        changer();

        const closeButton = document.createElement("span");
        closeButton.style = "margin-left: auto;";
        closeButton.innerHTML = "X";
        closeButton.onclick = () => {
            const event = {
                isPrevent: false,
                prevent() {
                    this.isPrevent = true;
                }
            };
            if (this.onDelete)
                this.onDelete(event, this.numberHandler());
            if (!event.isPrevent)
                fieldset.remove();
        };

        const div = document.createElement('div');
        div.style = "display: flex;";
        div.appendChild(header);
        div.appendChild(closeButton);

        return [div, changer];
    }

    #createDrinkTypeField() {
        const drinkTypeField = document.createElement('label');
        drinkTypeField.classList.add('field');
        drinkTypeField.innerHTML = `
            <span class="label-text">Я буду</span>
            <select name="drink-name">
              <option value="espresso">Эспрессо</option>
              <option value="cappuccino" selected>Капучино</option>
              <option value="cacao">Какао</option>
            </select>
        `;
        return drinkTypeField;
    }

    #createMilkField() {
        const milkField = document.createElement('div');
        milkField.classList.add('field');
        milkField.innerHTML = `
            <span class="checkbox-label">Сделайте напиток на</span>
            <label class="checkbox-field">
              <input type="radio" name="milk" value="usual" checked />
              <span>обычном молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk" value="no-fat" />
              <span>обезжиренном молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk" value="soy" />
              <span>соевом молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk" value="coconut" />
              <span>кокосовом молоке</span>
            </label>
        `;
        return milkField;
    }

    #createOptionsField() {
        const optionsField = document.createElement('div');
        optionsField.classList.add('field');
        optionsField.innerHTML = `
            <span class="checkbox-label">Добавьте к напитку:</span>
            <label class="checkbox-field">
              <input type="checkbox" name="options" value="whipped cream" />
              <span>взбитых сливок</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options" value="marshmallow" />
              <span>зефирок</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options" value="chocolate" />
              <span>шоколад</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options" value="cinnamon" />
              <span>корицу</span>
            </label>
        `;
        return optionsField;
    }
}

class DrinkFormsManager {
    #drinksCount = 0;
    #container;
    #addButton;
    #drinkForms = [];

    constructor() {
        this.#container = document.createElement('div');
        this.#addButton = this.#createAddButton();
    }

    createElement() {
        const submitButton = DrinkFormsManager.#createSubmitButton();
        this.#container.appendChild(this.#addButton);
        this.#container.appendChild(submitButton);

        return this.#container;
    }

    appendForm() {
        this.#drinksCount++;

        const form = new DrinkForm(this.#drinksCount);
        const [element, drinkFieldset, changeNumber] = form.createElement();

        drinkFieldset.onDelete = (event, id) => {
            if (this.#drinksCount === 1)
                event.prevent();
            else {
                this.#drinksCount--;
                for (const [form, updateNumber] of this.#drinkForms) {
                    if (form.number > id) {
                        form.number--;
                        updateNumber();
                    }
                }
            }


        };
        this.#drinkForms.push([form, changeNumber]);
        this.#container.insertBefore(element, this.#addButton);
    }

    static #createSubmitButton() {
        const submitButton = document.createElement('button');
        submitButton.classList.add('submit-button');
        submitButton.type = 'submit';
        submitButton.style = "margin-top: 30px";
        submitButton.innerHTML = 'Готово';

        return submitButton;
    }

    #createAddButton() {
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.classList.add('add-button');
        addButton.innerHTML = '+ Добавить напиток';
        addButton.onclick = () => {
            this.appendForm();
        };

        return addButton;
    }
}

class DrinkForm {
    number;

    constructor(number) {
        this.number = number;
    }

    createElement() {
        const drinkFieldset = new DrinkFieldset(() => this.number);
        const [element, changeNumber] = drinkFieldset.createElement();
        const form = document.createElement('form');
        form.appendChild(element);
        return [form, drinkFieldset, changeNumber];
    }
}

(function () {
    const body = document.getElementsByTagName('body')[0];
    const manager = new DrinkFormsManager();
    body.appendChild(manager.createElement());
    manager.appendForm();
})();