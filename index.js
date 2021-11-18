let counter = 0;

const form = document.querySelector('.form');
const addBut = document.querySelector('.add-button');
const submBut = document.querySelector('.submit-button');

createNewForm();
addBut.onclick = createNewForm;
submBut.onclick = function () {
  let window = document.createElement('div');
  window.classList.add('modal-container');
  window.innerHTML = `
  <div class="modal-window">
        <div class="modal-window-header">
          <h1 class = "modal-window-title">Ваш заказ принят!</h1>
          <button class="close-Button">X</button>
        </div>       
          <h3>${generateModalHeader()}</h3>
        <div class = "table-container">
        <table class = "order-table"> 
        <tr>
          <th>Напиток</th>
          <th>Молоко</th>
          <th>Дополнительно</th>
          <th>Пожелания</th>
        </tr>
        </table>
        </div>
        <div>
        <lable>Выберите время заказа</lable>
        <input class = "time" type = "time"></input>
        <button class = "submit">Заказать</button>
        </div>
  </div>
  `;
  let subButon = window.querySelector('.submit');
  subButon.onclick = function (){
    let time = window.querySelector('.time').value;
    let sysTime = new Date();
    if(time.split(':')[0] < sysTime.getHours()){
        alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее');
    }
    else{
      if(time.split(':')[0] ==sysTime.getHours() && time.split(':')[1] < sysTime.getMinutes())
        alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее');
      else
        document.body.removeChild(window);
    }
  }
  collectDataFromForms(window);
  let button = window.querySelector('.close-Button');
  button.onclick = function () {
    document.body.removeChild(window);
  }
  document.body.appendChild(window);
}

function collectDataFromForms(window) {
  let table = window.querySelector('.order-table');
  let forms = document.querySelectorAll('.form');
  for (let form of forms) {
    let row = document.createElement('tr');
    let data = new FormData(form);
    row.innerHTML = `<td>${data.get('drink')}</td>
    <td>${data.get('milk')}</td>
    <td>${data.getAll('options').toString().replace(',', ', ')}</td>
    <td>${data.get('comment')}</td>`;
    table.appendChild(row);
  }
}

function generateModalHeader() {
  let str = `Вы заказали ${counter} `;
  let drink = 'напитков'

  if (!(counter % 100 > 10 && counter % 100 < 20)) {
    switch (counter
     % 10) {
      case 1:
        drink = 'напиток';
        break;
      case 2:
        drink = 'напитка';
        break;
      case 3:
        drink = 'напитка';
        break;
      case 4:
        drink = 'напитка';
        break;
    }
  }
  str += drink;
  return str;
}

function CreateCommentSection(){
  let container = document.createElement('div');
  container.classList.add('field')
  container.innerHTML = `<div class = "field">
  <span class="label-text">И еще </br> вот что:</span>
  <textarea class = "comment" name="comment"></textarea>
  <p class = "comment-repeat"></p>
  </div>`;
  let textArea = container.querySelector('.comment');
 let textRepeat = container.querySelector('.comment-repeat');
 textArea.oninput = function (){
   let text = textArea.value;
   let reg = /срочно|быстрее|побыстрее|скорее|поскорее|очень нужно/gmi;
   text = text.replace(reg, x => `<b>${x}</b>`);
   textRepeat.innerHTML = text;
 }
 return container;
}

function CreateRemovingButton(newForm) {
  let clos = document.createElement('button');
  clos.textContent = 'X';
  clos.classList.add('close-Button');

  clos.onclick = function () {
    if (counter
     == 1) {
      alert('Невозможно удалить последний заказ')
      return;
    }
    counter--;
    document.body.removeChild(newForm);
    changeNames();
  }
  return clos;
}
function changeNames() {
  let headers = document.querySelectorAll('.beverage-count');
  for (let i = 0; i < counter; i++) {
    headers[i].textContent = `Напиток №${i + 1}`;
  }
}

function createNewForm() {
    counter++;
    let newForm = document.createElement('form');
    newForm.classList.add('form');
    newForm.innerHTML = `<fieldset class="beverage">
      <div class = "form-header">
      <h4 class="beverage-count">Напиток №${counter
  }</h4>
      </div>
      <label class="field">
        <span class="label-text">Я буду</span>
        <select name = 'drink'>
          <option value="Эспрессо">Эспрессо</option>
          <option value="Капучино" selected>Капучино</option>
          <option value="Какао">Какао</option>
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
    </fieldset>`;
    let clos = CreateRemovingButton(newForm);
    let comment = CreateCommentSection();
    newForm.querySelector('.form-header').appendChild(clos);
    newForm.querySelector('.beverage').appendChild(comment);
    document.body.insertBefore(newForm, document.getElementById("add-button-container"));
  }