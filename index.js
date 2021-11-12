const addButton = document.querySelector('.add-button');

const submitButton = document.querySelector('.submit-button');

const form = document.querySelector('.form');

let drinksCount = 1;




submitButton.onclick = function(){

}




addButton.onclick = function(){

    drinksCount++;

    let fieldset = document.createElement('form');

    fieldset.innerHTML = `<fieldset class="beverage">

    <h4 class="beverage-count">Напиток №${drinksCount}</h4>

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

  </fieldset>`;

  let clos = document.createElement('button');

  clos.onclick = function(){

      form.removeChild(fieldset);

  }

  fieldset.appendChild(clos);

  document.body.appendChild(fieldset);

} 