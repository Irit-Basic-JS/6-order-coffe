class DrinkFieldset {
    drinkNumber;

    constructor(drinkNumber) {
        this.drinkNumber = drinkNumber;
    }

    createElement() {
        const fieldset = this.#createFieldset();
        const header = this.#createHeader(fieldset);
        const drinkTypeField = this.#createDrinkTypeField();
        const milkField = this.#createMilkField();
        const optionsField = this.#createOptionsField();

        fieldset.appendChild(header);
        fieldset.appendChild(drinkTypeField);
        fieldset.appendChild(milkField);
        fieldset.appendChild(optionsField);

        return fieldset;
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
        header.innerHTML = `Напиток №${this.drinkNumber}`;

        const closeButton = document.createElement("span");
        closeButton.style = "margin-left: auto;";
        closeButton.innerHTML = "X";
        closeButton.onclick = () => {
            fieldset.remove();
        };

        const div = document.createElement('div');
        div.style = "display: flex;";
        div.appendChild(header);
        div.appendChild(closeButton);

        return div;
    }

    #createDrinkTypeField() {
        const drinkTypeField = document.createElement('label');
        drinkTypeField.classList.add('field');
        drinkTypeField.innerHTML = `
            <span class="label-text">Я буду</span>
            <select name="drink-name_${this.drinkNumber}">
              <option value="espresso">Эспрессо</option>
              <option value="capuccino" selected>Капучино</option>
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
              <input type="radio" name="milk_${this.drinkNumber}" value="usual" checked />
              <span>обычном молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk_${this.drinkNumber}" value="no-fat" />
              <span>обезжиренном молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk_${this.drinkNumber}" value="soy" />
              <span>соевом молоке</span>
            </label>
            <label class="checkbox-field">
              <input type="radio" name="milk_${this.drinkNumber}" value="coconut" />
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
              <input type="checkbox" name="options_${this.drinkNumber}" value="whipped cream" />
              <span>взбитых сливок</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options_${this.drinkNumber}" value="marshmallow" />
              <span>зефирок</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options_${this.drinkNumber}" value="chocolate" />
              <span>шоколад</span>
            </label>
            <label class="checkbox-field">
              <input type="checkbox" name="options_${this.drinkNumber}" value="cinnamon" />
              <span>корицу</span>
            </label>
        `;
        return optionsField;
    }
}

class DrinkForm {
    #drinksCount = 1;

    constructor() {
        this.form = document.createElement('form');
        this.addButton = this.#createAddButton();
        this.submitButton = DrinkForm.#createSubmitButton();

        this.form.appendChild(this.addButton);
        this.form.appendChild(this.submitButton);
    }

    appendForm(element) {
        element.appendChild(this.form);
    }

    addDrinkFields() {
        const div = document.createElement('div');
        const drinkFieldset = new DrinkFieldset(this.#drinksCount).create();
        div.appendChild(drinkFieldset);

        this.form.insertBefore(div, this.addButton);
        this.#drinksCount++;
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
            this.addDrinkFields();
        };

        return addButton;
    }

}

(function () {
    const body = document.getElementsByTagName('body')[0];
    const form = new DrinkForm();
    form.appendForm(body);
    form.addDrinkFields();
})();