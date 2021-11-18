createNewForm(getBeverageForm());

function getBeverageCount() {
    return document.querySelectorAll(".beverage").length;
}

document.querySelector(".add-button").onclick = () => {
    createNewForm(getBeverageForm());
};

document.querySelector(".submit-button").onclick = () => {
    new ModalWindow().show();
};

class ModalWindow {
    constructor() {
        this.modalContainer = document.querySelector(".modal-container");

        let closeBtn = document.getElementById("modal-close");
        closeBtn.onclick = () => this.hide();

        let modalText = this.modalContainer.querySelector(".modal-text");
        let beverageCount = getBeverageCount();
        let wordEnd = beverageCount % 10 == 1
            ? "ок"
            : beverageCount % 10 >= 2 && beverageCount % 10 <= 4
                ? "ка"
                : "ков";
        modalText.textContent = `Вы заказали ${beverageCount} напит${wordEnd}`;

        this.modalContainer.querySelector(".modal-body").appendChild(this.createOrderTable());

        let form = this.modalContainer.querySelector("form");
        form.onsubmit = (event) => {
            event.preventDefault();

            let data = new FormData(form);
            let orderDate = Date.parse(data.get("order-date"));
            let today = new Date().setHours(0, 0, 0, 0);

            if (orderDate > today)
                this.hide();
            else alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее.");
        };
    };

    createOrderTable() {
        let table = document.createElement("table");
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
            let formData = new FormData(form);
            let dataKeys = ["coffee", "milk", "options"];

            let tableRow = document.createElement("tr");

            for (let key of dataKeys) {
                let column = document.createElement("td");

                let values = formData.getAll(key).map(e => this.#translate(e));
                column.textContent = values.join(", ");

                tableRow.appendChild(column);
            }

            let column = document.createElement("td");
            let str = form.querySelector(".extra-input").value ?? "";
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
        switch (word) {
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
    let extra = form.querySelector(".extra-container");

    let textArea = extra.querySelector(".extra-text");
    let display = extra.querySelector(".extra-view");

    textArea.oninput = () => {
        display.innerHTML = makeWordsBald(textArea.value);
    };
}

function makeWordsBald(str) {
    let regex = /срочно|быстрее|побыстрее|скорее|поскорее|очень нужно/gmi;
    return str.replace(regex, word => `<b>${word}</b>`);
};

function createCloseButton(form) {
    let closeButton = document.createElement("div");

    closeButton.classList.add("close-button");
    closeButton.textContent = "X";

    closeButton.onclick = function () {
        if (getBeverageCount() <= 1) return;
        document.body.removeChild(form);
        updateBeverageIDS();
    };

    return closeButton;
}

function updateBeverageIDS() {
    let IDS = document.querySelectorAll(".ID");
    for (let i = 0; i < IDS.length; i++)
        IDS[i].textContent = `Напиток №${i + 1}`;
}

function createNewForm(form) {
    document.body.insertBefore(form, document.getElementById("add-button-container"));

    updateBeverageIDS();

    linkTextareaToDisplay(form);
    let fieldSetHeader = form.querySelector(".beverage-header");
    fieldSetHeader.appendChild(createCloseButton(form));
}

function getBeverageForm() {
    let form = document.createElement("form");
    form.classList.add("beverage-form")
    form.innerHTML = `
        <fieldset class="beverage">
            <div class="beverage-header">
                <h4 class="ID"></h4>
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