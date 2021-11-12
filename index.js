let count = 1;

function addCoffee() {
    count++;
    const coffee = document.querySelector(".beverage-form").cloneNode(true);
    coffee.id = `form${count}`;
    coffee.innerHTML = coffee.innerHTML.replace("Напиток №1", `Напиток №${count}`);
    document.querySelector(".beverages").append(coffee);
}

function deleteCoffee(elem) {
    if (count === 1)
        return;
    count--;
    let numToDel = getNumber(elem);
    elem.parentNode.removeChild(elem);
    for (let drink of document.querySelectorAll(".beverage-form")) {
        const numOfCoffee = getNumber(drink);
        if (numOfCoffee > numToDel) {
            drink.id = `form${numOfCoffee - 1}`;
            drink.querySelector(".beverage-count").textContent = `Напиток №${numOfCoffee - 1}`;
        }
    }
}

getNumber = (elem) => {
    return +elem.id.slice(4);
};

function showModal() {
    document.querySelector(".hidden").style.display = "flex";
    document.querySelector(".countOfCoffee").textContent = getText(count);
    document.querySelector("table").innerHTML = makeTable(document.querySelectorAll(".beverage-form"));
}

getText = (countOfCoffee) => {
    const orderText = `Вы заказали ${countOfCoffee}`;
    if (countOfCoffee % 10 === 1 && !(countOfCoffee % 100 === 11))
        return `${orderText} напиток`;
    else if (countOfCoffee % 10 > 1 && countOfCoffee % 10 < 5 && (countOfCoffee % 100 < 12 || countOfCoffee % 100 > 14))
        return `${orderText} напитка`;
    else
        return `${orderText} напитков`;
}

makeTable = (forms) => {
    let rows = '<tr><th>Напиток</th><th>Молоко</th><th>Дополнительно</th><th>Пожелания</th></tr>';
    forms.forEach(form => {
        const fromData = new FormData(form);
        rows += "<tr>" + convertToRow(fromData) + "</tr>";
    })
    return rows;
}

convertToRow = (formData) => {
    let conversion = {
        "espresso": "Эспрессо",
        "capuccino": "Капучино",
        "cacao": "Какао",
        "usual": "на обычном молоке",
        "no-fat": "на обезжиренном молоке",
        "soy": "на соевом молоке",
        "coconut": "на кокосовом молоке",
        "whipped cream": "взбитых сливок",
        "marshmallow": "зефира",
        "chocolate": "шоколад",
        "cinnamon": "корицу"
    };
    return `
    <td>${conversion[formData.get('type')]}</td>
    <td>${conversion[formData.get('milk')]}</td>
    <td>${formData.getAll('options').map(option => conversion[option]).join(", ")}</td>
    <td>${formData.get('extra')}</td>
    `;
}

clone = (textarea) =>{
    let text = textarea.value.replace(/(срочно)|(быстрее)|(побыстрее)|(скорее)|(поскорее)|(очень нужно)/gi,"<b>$&</b>");
    textarea.parentNode.querySelector("span").innerHTML = text;
}