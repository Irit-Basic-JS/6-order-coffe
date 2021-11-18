//add_button.onclick = 
let drinkCount = 0;

appendForm(addForm());

document.querySelector(".add-button").onclick = function() {
    const form = addForm();
    document.body.appendChild(form);
    appendForm(form);
}

document.querySelector(".submit-button").onclick = function() {
    const modalWindow = new ModalManager();
    modalWindow.show();
    importDataFromForms(modalWindow);
}

class ModalManager {
  constructor() {
    this.modalOverlay = document.querySelector(".overlay");
    this.modalContainer = document.querySelector(".modal-container");
    this.modalTable = document.querySelector(".table-container");

    const modalDelete = document.getElementById("close-modal");
    modalDelete.onclick = () =>{ this.hide(); this.modalContainer.hide();}

    const modalText = this.modalContainer.querySelector(".modal-value");
    modalText.textContent = `Вы заказали ${drinkCount} ${drinkWord(drinkCount)}`;
  };

  show() {
    this.modalOverlay.style.visibility = "visible";
    this.modalContainer.style.visibility = "visible";
    this.modalTable.style.visibility = "visible";
  };

  hide() {
    this.modalContainer.style.visibility = "hidden";
    this.modalOverlay.style.visibility = "hidden";
    this.modalTable.style.visibility = "hidden";
  };
}

function drinkWord (drinkCount) {
  drinks = drinkCount % 100
  if (drinks >= 5 && drinks <= 20) return "напитков";
  else {
    if (drinks % 10 == 1) return "напиток";
    else if (drinks % 10 < 5) return "напитка";
    else return "напиков";
  }
}

function createDeleteButton(form) {
    const deleteButton = document.createElement("div");

    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "—";

    deleteButton.onclick = function() {
        if (drinkCount <= 1) {
          alert("Зачем ты нажимаешь сюда? Лучше порадуй себя ещё одним напитком :)");
          return;
        }
        document.body.removeChild(form);
        drinkCount--;
        updateBeverageCount();
    };
    return deleteButton;
}

function updateBeverageCount() {
    const counts = document.querySelectorAll(".beverage-count");
    for (let i = 0; i < counts.length; i++) {
        counts[i].textContent = `Напиток № ${i + 1}`;
    }
}

function appendForm(form) {
    document.body.insertBefore(form, document.getElementById("add_button_container"));
    drinkCount += 1;
    updateBeverageCount();

    form.querySelector(".beverage-header").appendChild(createDeleteButton(form));
}

function addForm() {
    const form = document.createElement("form");
    form.classList.add('beverage-form');
    form.innerHTML = `
    <fieldset class="beverage">
        <div class = "beverage-header">
            <h4 class="beverage-count">Напиток №1</h4>
        </div>
      <label class="field">
        <span class="label-text">Я буду</span>
        <select name="drink">
          <option value="эспрессо">Эспрессо</option>
          <option value="капучино" selected>Капучино</option>
          <option value="како">Какао</option>
        </select>
      </label>
      <div class="field">
        <span class="checkbox-label">Сделайте напиток на</span>
        <label class="checkbox-field">
          <input type="radio" name="milk" value="обычное" checked />
          <span>обычном молоке</span>
        </label>
        <label class="checkbox-field">
          <input type="radio" name="milk" value="обезжиренное" />
          <span>обезжиренном молоке</span>
        </label>
        <label class="checkbox-field">
          <input type="radio" name="milk" value="соевое" />
          <span>соевом молоке</span>
        </label>
        <label class="checkbox-field">
          <input type="radio" name="milk" value="кокосовое" />
          <span>кокосовом молоке</span>
        </label>
      </div>
      <div class="field">
        <span class="checkbox-label">Добавьте к напитку:</span>
        <label class="checkbox-field">
          <input type="checkbox" name="options" value="взбитые сливки" />
          <span>взбитых сливок</span>
        </label>
        <label class="checkbox-field">
          <input type="checkbox" name="options" value="зефир" />
          <span>зефирок</span>
        </label>
        <label class="checkbox-field">
          <input type="checkbox" name="options" value="шоколад" />
          <span>шоколад</span>
        </label>
        <label class="checkbox-field">
          <input type="checkbox" name="options" value="корица" />
          <span>корицу</span>
        </label>
      </div>
      <div class="field">
        <textarea placeholder="Комментарий к напитку" name="comment"></textarea>
      </div>
    </fieldset>
`;
    return form;
}

function importDataFromForms(window) {
  let table = window.querySelector('.result-table');
  let forms = document.querySelectorAll('.form');
  for (let form of forms) {
    let row = document.createElement('tr') in window;
    let data = new FormData(form);
    row.innerHTML = `<td>${data.get('drink')}</td>
    <td>${data.get('milk')}</td>
    <td>${data.getAll('options').toString().replace(',', ', ')}</td>
    <td>${data.get('comment')}</td>`;
    table.appendChild(row);
  }
}