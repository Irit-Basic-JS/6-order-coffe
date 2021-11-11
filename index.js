let _drinkAmount = 0
const addButton = document.querySelector(".add-button");
const submitButton = document.querySelector(".submit-button");

addButton.onclick = () => {
    const form = createForm();
    appendForm(form);
}

submitButton.onclick = () => {
    const modal = new ModalWindow();
    modal.show()
}

function appendForm(form) {
    document.body.insertBefore(form, document.getElementById("add-button-container"));
    _drinkAmount++

    const fieldSetHeader = form.querySelector(".beverage-header");
    fieldSetHeader.appendChild(createRemoveButton(form));
}

function createRemoveButton(form) {
    const removeButton = document.createElement("div");

    removeButton.classList.add("remove-button");
    removeButton.textContent = "X";

    removeButton.onclick = function () {
        if (_drinkAmount <= 1) return;
        document.body.removeChild(form);
        _drinkAmount--;
        updateDrinkNumbers();
    };

    return removeButton;
}

function updateDrinkNumbers() {
    const drinkNumbers = document.querySelectorAll(".beverage-count");
    for (let i = 0; i < _drinkAmount; i++)
        drinkNumbers[i].textContent = `Напиток №${i + 1}`;
}

function createForm() {
    const form = document.createElement("form")
    form.classList.add("beverage-form")

    form.innerHTML =
        `<fieldset class="beverage">
        <div class="beverage-header">
        <h3 class="beverage-count">Напиток №${_drinkAmount + 1}</h3>
        </div>
        <label class="field">
          <span class="label-text">Я буду</span>
          <select name="coffee">
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
      </fieldset>`;

    return form;
}

class ModalWindow {

    constructor() {
        this.modalContainer = document.querySelector(".modal-container");

        const modalClose = document.getElementById("modal-close");
        modalClose.onclick = () => this.hide();

        const modalText = this.modalContainer.querySelector(".modal-text");
        const ending = _drinkAmount % 10 === 1 ? "ок" :
            _drinkAmount % 10 >= 2 && _drinkAmount % 10 <= 4 ? "ка" : "ков";
        modalText.textContent = `Вы заказали ${_drinkAmount} напит${ending}`;

        this.modalContainer.querySelector(".modal-body").appendChild(this.createOrderTable());
    };

    createOrderTable() {
        const table = document.createElement("table");
        table.classList.add("order-table");
        table.innerHTML = `
            <thead><tr>
            <th>Напиток</th>
            <th>Молоко</th>
            <th>Дополнительно</th>
            </tr></thead>
        `;

        for (let form of document.querySelectorAll(".beverage-form")) {
            const formData = new FormData(form);
            const dataKeys = ["coffee", "milk", "options"];

            const tableRow = document.createElement("tr");

            for (let key of dataKeys) {
                const column = document.createElement("td");

                const values = formData.getAll(key).map(e => ModalWindow.#translate(e));
                column.textContent = values.join(", ");

                tableRow.appendChild(column);
            }

            table.appendChild(tableRow);
        }

        return table;
    }

    show() {
        this.modalContainer.style.visibility = "visible";
    };

    hide() {
        this.modalContainer.querySelector(".order-table").remove();
        this.modalContainer.style.visibility = "hidden";
    };

    static #translate(word) {
        switch(word) {
            case "espresso": return "Эспрессо";
            case "capuccino": return "Капучино";
            case "cacao": return "Какао";

            case "usual": return "Обычное молоко";
            case "no-fat": return "Обезжиренное молоко";
            case "soy": return "Соевое молоко";
            case "coconut": return "Кокосовое молоко";

            case "whipped-cream": return "Взбитые сливки";
            case "marshmallow": return "Зефирки";
            case "chocolate": return "Шоколад";
            case "cinnamon": return "Корица";
        }
    }
}