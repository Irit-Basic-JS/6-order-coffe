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
}

class ModalManager{
  constructor(){
    this.modalContainer = document.querySelector(".modal-window-cnotainer");

    const modalDelete = document.getElementById("close-modal-window");
    modalDelete.onclick = () => this.hide();

    const modalText = this.modalContainer.querySelector(".modal-text");
    modalText.textContent = "Заказ принят";
  };

  show() {
    this.modalContainer.style.visibility = "visible";
  };

  hide() {
    this.modalContainer.style.visibility = "hidden";
  };
}

function createDeleteButton(form) {
    const deleteButton = document.createElement("div");

    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "—";

    deleteButton.onclick = function() {
        if (drinkCount <= 1) return;
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
    return form;
}