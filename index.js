function declOfNum(number, words) {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(
        number) % 10 : 5]];
}

function highlightWords(text) {
    const regex = /срочно|быстрее|побыстрее|скорее|поскорее|очень нужно/gmi;
    return text.replace(regex, (a, b) => {
        return "<b>" + a + "</b>";
    });
}

class DrinkFieldset {
    numberHandler;
    onDelete;

    constructor(numberHandler) {
        this.numberHandler = numberHandler;
    }

    createElement() {
        const fieldset = this.#createFieldset();
        const [header, changeNumber] = this.#createHeader(fieldset);

        fieldset.appendChild(header);
        fieldset.appendChild(this.#createDrinkTypeField());
        fieldset.appendChild(this.#createMilkField());
        fieldset.appendChild(this.#createOptionsField());
        fieldset.appendChild(this.#createWishesField());

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
        closeButton.classList.add('btn-close');
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

    #createWishesField() {
        const container = document.createElement('div');
        container.classList.add('feedback-container');
        const textarea = document.createElement('textarea');
        const output = document.createElement('div');

        textarea.classList.add('feedback');
        textarea.name = 'feedback';
        textarea.oninput = () => {
            output.innerHTML = highlightWords(textarea.value);
        };

        output.classList.add('feedback');
        container.appendChild(textarea);
        container.appendChild(output);

        return container;
    }

}

class DrinkFormsManager {
    drinksCount = 0;
    #container;
    #addButton;
    #drinkForms = [];

    constructor() {
        this.#container = document.createElement('div');
        this.#addButton = this.#createAddButton();
    }

    createElement() {
        const submitButton = this.#createSubmitButton();
        this.#container.appendChild(this.#addButton);
        this.#container.appendChild(submitButton);

        return this.#container;
    }

    appendForm() {
        this.drinksCount++;

        const form = new DrinkForm(this.drinksCount);
        const [element, drinkFieldset, changeNumber] = form.createElement();

        drinkFieldset.onDelete = (event, id) => {
            if (this.drinksCount === 1)
                event.prevent();
            else {
                this.drinksCount--;
                let i = 0;
                let formToDelete;
                for (const [form, updateNumber] of this.#drinkForms) {
                    if (form.number === id)
                        formToDelete = i;
                    if (form.number > id) {
                        form.number--;
                        updateNumber();
                    }
                    i++;
                }
                this.#drinkForms.splice(formToDelete, 1);
            }
        };
        this.#drinkForms.push([form, changeNumber]);
        this.#container.insertBefore(element, this.#addButton);
    }

    #createSubmitButton() {
        const submitButton = document.createElement('button');
        submitButton.classList.add('submit-button');
        submitButton.type = 'submit';
        submitButton.style = "margin-top: 30px";
        submitButton.innerHTML = 'Готово';

        const modal = new ModalWindow(this);
        submitButton.onclick = () => {
            modal.show();
        };

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

    getDrinks() {
        return this.#drinkForms.map(value => value[0]);

    }
}

class DrinkForm {
    number;
    form;

    constructor(number) {
        this.number = number;
        this.form = document.createElement('form');
    }

    createElement() {
        const drinkFieldset = new DrinkFieldset(() => this.number);
        const [element, changeNumber] = drinkFieldset.createElement();
        this.form.appendChild(element);
        return [this.form, drinkFieldset, changeNumber];
    }

    getDrink() {
        const formData = new FormData(this.form);
        const drink = new Drink();
        drink.name = this.#translateValue(formData.get('drink-name'));
        drink.milk = this.#translateValue(formData.get('milk'));
        drink.options = formData.getAll('options').map(value => this.#translateValue(value));
        drink.wishes = highlightWords(formData.get('feedback'));
        return drink;
    }

    #translateValue(value) {
        const dictionary = {
            "espresso": "Эспрессо",
            "cappuccino": "Капучино",
            "cacao": "Какао",
            "usual": "Обычное молоко",
            "no-fat": "Обезжиренное молоко",
            "soy": "Соевое молоко",
            "coconut": "Кокосовое молоко",
            "whipped cream": "взбитые сливки",
            "marshmallow": "зефирки",
            "chocolate": "шоколад",
            "cinnamon": "корица"
        };
        return dictionary[value];
    }
}

class Drink {
    name;
    milk;
    options = [];
    wishes;
}

class ModalWindow {
    modalWindow;
    content;
    drinkManager;
    drinksCountHeader;

    constructor(drinkManager) {
        this.drinkManager = drinkManager;
        this.modalWindow = document.getElementById('modal');
        this.drinksCountHeader = document.createElement("h3");
        this.content = document.getElementById("modal-content");
        this.content.appendChild(this.drinksCountHeader);

        document.getElementById('modal-close').onclick = () => {
            this.hide();
        };

        const label = document.createElement('label');
        label.innerHTML = 'Выберите время заказа';

        const date = document.createElement('input');
        date.type = 'date';
        date.name = 'order-date';
        date.required = true;

        const submit = document.createElement('button');
        submit.type = 'submit';
        submit.classList.add("submit-button");
        submit.innerHTML = 'Оформить';

        const form = document.createElement('form');
        form.appendChild(label);
        form.appendChild(date);
        form.appendChild(submit);
        form.onsubmit = (ev) => {
            ev.preventDefault();
            const data = new FormData(form);
            const date = Date.parse(data.get('order-date'));
            const today = new Date().setHours(0, 0, 0, 0);
            if (date >= today) {
                this.hide();
            } else {
                alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее");
            }
        };

        const footer = document.getElementById('modal-footer');
        footer.appendChild(form);
    }

    show() {
        this.modalWindow.style.visibility = 'visible';
        this.drinksCountHeader.innerHTML = `Вы заказали ${this.drinkManager.drinksCount}
         ${declOfNum(this.drinkManager.drinksCount,
            ['напиток', 'напитка', 'напитков'])}!`;

        this.#addDrinksToTable(this.drinkManager.getDrinks());
    }

    #addDrinksToTable(drinks) {
        const table = document.getElementById('table-summary');
        document.querySelectorAll("#summary-row").forEach(row => row.remove());
        let i = 1;
        for (const form of drinks) {
            const drink = form.getDrink();
            const row = table.insertRow(i);

            const nameCell = row.insertCell(0);
            nameCell.innerHTML = drink.name;

            const milkCell = row.insertCell(1);
            milkCell.innerHTML = drink.milk;

            const optionsCell = row.insertCell(2);
            optionsCell.innerHTML = drink.options.join(', ');

            const wishesCell = row.insertCell(3);
            wishesCell.innerHTML = drink.wishes;

            row.id = "summary-row";
            i++;
        }
    }

    hide() {
        this.modalWindow.style.visibility = 'collapse';
    }
}

(function () {
    const body = document.getElementsByTagName('body')[0];
    const manager = new DrinkFormsManager();
    body.appendChild(manager.createElement());
    manager.appendForm();
})();