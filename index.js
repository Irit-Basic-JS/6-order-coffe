document.querySelector(".add-button").addEventListener('click', addDrink);
let drinks = `<tr><td>Напиток</td><td>Молоко</td><td>Дополнительно</td><td>Пожелания</td></tr>`;
let keyWords = ["срочно", "быстрее", "побыстрее", "скорее", "поскорее", "очень нужно"]

function updateDelete() {
    let deletes = document.getElementsByClassName("delete");
    for (let del of deletes) {
        del.addEventListener('click', function (event) {
            event.preventDefault();
            if (event.target.parentNode.id !== 'drink1') event.target.parentNode.remove();
        });
    }
}

function addDrink() {
    let allDrinks = document.getElementsByClassName("beverage");
    let baseDrink = allDrinks[allDrinks.length - 1];
    let newDrink = baseDrink.cloneNode(true);
    newDrink.id = 'drink' + (+baseDrink.id.slice(5) + 1);
    baseDrink.after(newDrink);
    document.querySelector(`#${newDrink.id} .beverage-count`).innerHTML = ('Напиток №' + newDrink.id.slice(5));
    let initialName = document.querySelector(`#${baseDrink.id} .milk-selection input`).name;
    Array.from(document.querySelectorAll(`#${newDrink.id} .milk-selection input`)).map((element) => element.name = 'milk' + (+initialName.slice(4) + 1));
    updateDelete();
}

function changeText(event) {
    let content = event.target.value.toString();
    for (let word of keyWords) {
        if (content.includes(word)) {
            let start = content.indexOf(word);
            let end = content.indexOf(word) + word.length - 1;
            content = content.substring(0, start) + '<b>' + word + '</b>' + content.substring(end + 1, content.length);
        }
    }
    document.querySelector('.textAreaContent').innerHTML = "Ваши пожелания: " + content;
}

document.forms.drinks.onsubmit = function (event) {
    event.preventDefault();
    let beverages = Array.from(document.getElementsByClassName("beverage"));
    for (let beverage of beverages) {
        let attribute = beverage.getAttribute('id');
        let information = new Information(attribute);
        Array.from(document.querySelectorAll(`#${attribute} .add-selection input`)).map((element) => {
            if (element.checked) information.addedBuns.push(element.value);
        })
        drinks +=
            `<tr>
				<td>${information.drink}</td>
				<td>${information.milk}</td>
				<td>${information.addedBuns}</td>
				<td>${information.desire}</td>
			</tr>`;
    }

    document.querySelector('.modal-body table').innerHTML = drinks;
    let count = Array.from(document.getElementsByClassName("beverage")).length.toString();
    let word = '';
    let element = count[count.length - 1];
    if (element === 1 && +count !== 11) word = 'напиток'
    else if (element === 2 || element === 3 || element === 4) word = 'напитка'
    else word = 'напитков'
    document.querySelector('.modal-body p').innerHTML = `Вы заказали ${count} ${word}`;
    drinks =
        `<tr>
			<td>Напиток</td>
			<td>Молоко</td>
			<td>Дополнительно</td>
			<td>Пожелания</td>
		</tr>`;
}

document.forms.modalForm.onsubmit = function (event) {
    event.preventDefault();
    let time = document.querySelector(`#${event.target.id} input`).value;
    let now = new Date().getHours() + ':' + new Date().getMinutes();
    if (time < now) alert("Выберите время позже, чем текущее");
    else {
        alert(`Заказ оформлен на ${time}!`)
        document.querySelector(".modal-footer button").click();
    }
}

class Information {
    constructor(id) {
        this.id = id;
        this.addedBuns = [];
        this.desire = document.querySelector(`#${this.id} textarea`).value;
        this.drink = (Array.from(document.querySelectorAll(`#${this.id} .drink-selection option`)).map((element) => {
            if (element.selected)
                return element.value;
        })).toString().replace(/[\s.,%]/g, '');
        this.milk = (Array.from(document.querySelectorAll(`#${this.id} .milk-selection input`)).map((element) => {
            if (element.checked)
                return element.value;
        })).toString().replace(/[\s.,%]/g, '');
    }
}
