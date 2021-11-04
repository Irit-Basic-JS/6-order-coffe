class DrinkForm {
    #drinkFields = `
    <fieldset class="beverage">
      <h4 class="beverage-count">Напиток №1</h4>
      <label class="field">
        <span class="label-text">Я буду</span>
        <select>
          <option value="espresso">Эспрессо</option>
          <option value="capuccino" selected>Капучино</option>
          <option value="cacao">Какао</option>
        </select>
      </label>
      <div class="field">
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
      </div>
      <div class="field">
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
      </div>
    </fieldset>
    `;
    #drinksCount = 0;

    constructor() {
        this.form = document.createElement('form');
        this.addButton = DrinkForm.#createAddButton();
        this.submitButton = DrinkForm.#createSubmitButton();

        this.form.appendChild(this.addButton);
        this.form.appendChild(this.submitButton);
    }

    static #createAddButton() {
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.classList.add('add-button');
        addButton.innerHTML = '+ Добавить напиток';
        return addButton;
    }

    static #createSubmitButton() {
        const submitButton = document.createElement('button');
        submitButton.classList.add('submit-button');
        submitButton.type = 'submit';
        submitButton.style = "margin-top: 30px";
        submitButton.innerHTML = 'Готово';

        return submitButton;
    }

    appendForm(element) {
        element.appendChild(this.form);
    }

    addDrinkFields() {
        const div = document.createElement('div');
        div.innerHTML = this.#drinkFields;

        this.form.insertBefore(div, this.addButton);
    }

}

(function () {
    const body = document.getElementsByTagName('body')[0];
    const form = new DrinkForm();
    form.appendForm(body);
    form.addDrinkFields();
    form.addDrinkFields();
})();