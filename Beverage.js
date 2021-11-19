function createBeverage(options) {
    const view = document.createElement('fieldset');
    view.className = 'beverage';
    view.innerHTML = `
      <span class="btn-delete">&times;</span>
      <h4 class="beverage-count">Напиток №<span class="number">${options.number}</span></h4>
      <label class="field">
        <span class="label-text">Я буду</span>
        <select name="name">
          <option value="espresso">Эспрессо</option>
          <option value="cappuccino" selected>Капучино</option>
          <option value="cacao">Какао</option>
        </select>
      </label>
      <div class="field">
        <span class="checkbox-label">Сделайте напиток на</span>
        <label class="checkbox-field">
          <input type="radio" name="milk-${options.number}" value="usual" checked />
          <span>обычном молоке</span>
        </label>
        <label class="checkbox-field">
          <input type="radio" name="milk-${options.number}" value="no-fat" />
          <span>обезжиренном молоке</span>
        </label>
        <label class="checkbox-field">
          <input type="radio" name="milk-${options.number}" value="soy" />
          <span>соевом молоке</span>
        </label>
        <label class="checkbox-field">
          <input type="radio" name="milk-${options.number}" value="coconut" />
          <span>кокосовом молоке</span>
        </label>
      </div>
      <div class="field">
        <span class="checkbox-label">Добавьте к напитку:</span>
        <label class="checkbox-field">
          <input type="checkbox" name="options-${options.number}" value="whipped cream" />
          <span>взбитых сливок</span>
        </label>
        <label class="checkbox-field">
          <input type="checkbox" name="options-${options.number}" value="marshmallow" />
          <span>зефирок</span>
        </label>
        <label class="checkbox-field">
          <input type="checkbox" name="options-${options.number}" value="chocolate" />
          <span>шоколад</span>
        </label>
        <label class="checkbox-field">
          <input type="checkbox" name="options-${options.number}" value="cinnamon" />
          <span>корицу</span>
        </label>
      </div>
      <label class="field">
        <span>И ещё вот что</span>
        <textarea class="wishes" name="wishes"></textarea>
        <span>Важи пожелания:</span>
        <p class="wishes-result"></p>
      </label>`;
    return view;
}

class Beverage {
    view;
    #container;
    #number;
    #numberView;
    #variableElements;

    constructor(options) {
        this.view = createBeverage(options);
        this.#number = options.number;
        this.#container = options.container;
        this.#numberView = this.view.getElementsByClassName('number')[0];
        this.#variableElements = Array.from(this.view.getElementsByTagName('input'));

        const wishesInput = this.view.querySelector('.wishes');
        const wishesResult = this.view.querySelector('.wishes-result')
        wishesInput.addEventListener('input', event => {
            const regex = /срочно|быстрее|побыстрее|скорее|поскорее|очень нужно/gmi;
            wishesResult.innerHTML = event.target.value.replace(regex, `<b>$&</b>`);
        });

        const deleteButton = this.view.querySelector('.btn-delete');
        deleteButton.addEventListener('click', () => {
            this.#container ? this.#container.remove(this.#number - 1) : this.view.remove();
        });
    }

    set number(value) {
        if (value < 0) {
            throw 'incorrect number';
        }
        this.#number = value;
        this.#updateView();
    }

    #updateView() {
        this.#numberView.textContent = this.#number;
        this.#variableElements.forEach(element => element.name = element.name.replace(/\d+/, this.#number));
    }
}
