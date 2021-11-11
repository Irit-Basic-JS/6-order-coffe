let _drinkCount = 0;

appendForm(createForm());

const addButton = document.querySelector(".add-button");
addButton.onclick = function() {
    const form = createForm();
    appendForm(form);
};

const submitButton = document.querySelector(".submit-button");
submitButton.onclick = function() {
    const modal = new ModalManager();
    modal.show();
};

class ModalManager {

    constructor() {
        this.modalContainer = document.querySelector(".modal-container");

        const modalClose = document.getElementById("modal-close");
        modalClose.onclick = () => this.hide();

        const modalText = this.modalContainer.querySelector(".modal-text");
        const ending = _drinkCount % 10 == 1 ? "ок" : 
            _drinkCount % 10 >= 2 && _drinkCount % 10 <= 4 ? "ка" : "ков";
        modalText.textContent = `Вы заказали ${_drinkCount} напит${ending}`;

        this.modalContainer.querySelector(".modal-body").appendChild(this.createOrderTable());

        const form = this.modalContainer.querySelector("form");
        form.onsubmit = (event) => {
            event.preventDefault();
            
            const data = new FormData(form);
            const orderDate = Date.parse(data.get("order-date"));
            const today = new Date().setHours(0,0,0,0);

            if (orderDate > today)
                this.hide();
            else
                alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее.");
        };
    };

    createOrderTable() {
        const table = document.createElement("table");
        table.classList.add("order-table");
        table.innerHTML = `
            <thead><tr>
            <th>Напиток</th>
            <th>Молоко</th>
            <th>Дополнительно</th>
            <th>Пожелания</th>
            </tr></thead>
        `;

        for (let form of document.querySelectorAll(".beverage-form")) {        
            const formData = new FormData(form);
            const dataKeys = ["coffee", "milk", "options"];

            const tableRow = document.createElement("tr");

            for (let key of dataKeys) {
                const column = document.createElement("td");

                const values = formData.getAll(key).map(e => this.#translate(e));
                column.textContent = values.join(", ");

                tableRow.appendChild(column);
            }

            const column = document.createElement("td");
            const str = form.querySelector(".extra-input").value ?? "";
            column.textContent = str;
            tableRow.appendChild(column);

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

    #translate(word) {
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
    
};

function linkTextareaToDisplay(form) {
    const extra = form.querySelector(".extra-container");

    const textArea = extra.querySelector(".extra-text");
    const display = extra.querySelector(".extra-view");

    textArea.oninput = () => {
        display.innerHTML = highlightWords(textArea.value);
    };
}

function highlightWords(str) {
    const regex = /срочно|быстрее|побыстрее|скорее|поскорее|очень нужно/gmi;
    return str.replace(regex, w => `<b>${w}</b>`);
};

function createCloseButton(form) {
    const closeButton = document.createElement("div");

    closeButton.classList.add("close-button");
    closeButton.textContent = "X";

    closeButton.onclick = function () {
        if (_drinkCount <= 1) return;
        document.body.removeChild(form);
        _drinkCount--;
        updateDrinkNumbers();
    };

    return closeButton;
}

function updateDrinkNumbers() {
    const counters = document.querySelectorAll(".beverage-count");
    for (let i = 0; i < counters.length; i++)
        counters[i].textContent = `Напиток №${i + 1}`;
}

function appendForm(form) {
    document.body.insertBefore(form, document.getElementById("add-button-container"));

    _drinkCount++;
    updateDrinkNumbers();

    linkTextareaToDisplay(form);
    const fieldSetHeader = form.querySelector(".beverage-header");
    fieldSetHeader.appendChild(createCloseButton(form));
}

function createForm() {
    const form = document.createElement("form");
    form.classList.add("beverage-form")
    form.innerHTML = `
        <fieldset class="beverage">
            <div class="beverage-header">
                <h4 class="beverage-count"></h4>
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
                    <input type="checkbox" name="options" value="whipped-cream" />
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
            <div class="field">
            <div>И ещё вот что</div>
            <div class="extra-container">
                <textarea class="extra-input extra-text" id="extra"></textarea>
                <span class="extra-view extra-text" disabled></span>
            </div>
            </div>
        </fieldset>
    `;
    return form;
}
