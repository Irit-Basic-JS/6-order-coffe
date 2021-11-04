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
        div.innerHTML = this.#createDrinkFields();

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

    #createDrinkFields() {
        return `
    <fieldset class="beverage">
      <h4 class="beverage-count">Напиток №${this.#drinksCount}</h4>
      <label class="field">
        <span class="label-text">Я буду</span>
        <select name="drink-name_${this.#drinksCount}">
          <option value="espresso">Эспрессо</option>
          <option value="capuccino" selected>Капучино</option>
          <option value="cacao">Какао</option>
        </select>
      </label>
      <div class="field">
        <span class="checkbox-label">Сделайте напиток на</span>
        <label class="checkbox-field">
          <input type="radio" name="milk_${this.#drinksCount}" value="usual" checked />
          <span>обычном молоке</span>
        </label>
        <label class="checkbox-field">
          <input type="radio" name="milk_${this.#drinksCount}" value="no-fat" />
          <span>обезжиренном молоке</span>
        </label>
        <label class="checkbox-field">
          <input type="radio" name="milk_${this.#drinksCount}" value="soy" />
          <span>соевом молоке</span>
        </label>
        <label class="checkbox-field">
          <input type="radio" name="milk_${this.#drinksCount}" value="coconut" />
          <span>кокосовом молоке</span>
        </label>
      </div>
      <div class="field">
        <span class="checkbox-label">Добавьте к напитку:</span>
        <label class="checkbox-field">
          <input type="checkbox" name="options_${this.#drinksCount}" value="whipped cream" />
          <span>взбитых сливок</span>
        </label>
        <label class="checkbox-field">
          <input type="checkbox" name="options_${this.#drinksCount}" value="marshmallow" />
          <span>зефирок</span>
        </label>
        <label class="checkbox-field">
          <input type="checkbox" name="options_${this.#drinksCount}" value="chocolate" />
          <span>шоколад</span>
        </label>
        <label class="checkbox-field">
          <input type="checkbox" name="options_${this.#drinksCount}" value="cinnamon" />
          <span>корицу</span>
        </label>
      </div>
    </fieldset>
    `;
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