let count = 1;
let addButton = document.querySelector(".add-button");
const beverage = document.querySelector(".beverage");

addButton.onclick = function () {
    count ++;
    const newCoffee = beverage.cloneNode(true);
    newCoffee.id = `form${count}`;
    newCoffee.innerHTML = newCoffee.innerHTML.replace("Напиток №1", `Напиток №${count}`);
    newCoffee.innerHTML = newCoffee.innerHTML.replace(/milk1/g, `milk${count}`);
    newCoffee.innerHTML = newCoffee.innerHTML.replace(/options1/g, `options${count}`);
    document.querySelector(".beverages").append(newCoffee);
}

function closeButton(element){
    if (count !== 1) {
        count--;
        let numOfDel = getNumber(element);
        element.parentNode.removeChild(element);
        for (let coffee of document.querySelectorAll(".beverage")) {
            const numOfCoffee = getNumber(coffee);
            if (numOfCoffee > numOfDel) {
                coffee.id = `form${numOfCoffee - 1}`;
                coffee.querySelector(".beverage-count").textContent = `Напиток №${numOfCoffee - 1}`;
                coffee.innerHTML = coffee.innerHTML.replace(/milk\d+/g, `milk${numOfCoffee - 1}`);
                coffee.innerHTML = coffee.innerHTML.replace(/options\d+/g, `options${numOfCoffee - 1}`);
            }
        }
    }
}

getNumber = (element) => {return +element.id.slice(4)};

let submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", (e)=>{
    e.preventDefault();

    let data = getData();
    console.log(data);

    let modal = document.createElement('div');
    let modalWindow = document.createElement('div');
    let close = document.createElement('button');
    let time = document.createElement('input');
    let submit = document.createElement('button');

    close.textContent = 'X';
    close.classList.add('close');
    modalWindow.textContent = `Вы заказали ` + Pluralize();

    close.addEventListener("click", ()=>{
        modal.remove();
    });

    time.setAttribute('type', 'time');
    time.setAttribute('name', 'time');

    submit.textContent = 'Оформить';
    submit.addEventListener("click", ()=>{
        checkTime(submit.parentNode.parentNode, submit.parentNode.children[2]);
    });

    modal.classList.add('modal');
    modalWindow.classList.add('modal-window');

    modalWindow.append(close, createTable(data), time, submit);
    modal.append(modalWindow);
    document.body.append(modal);
});

function Pluralize() {
    let decades = count % 10;
    let hundreds = count % 100;
    if (decades === 1 && (hundreds >= 20 || hundreds === 1))
        return `${count} напиток`;
    if ((decades >= 2 && decades <= 4) && (hundreds >= 20 || hundreds <= 4))
        return `${count} напитка`;
    return `${count} напитков`;
}

function getData() {
    const form = document.forms[0];
    let drinks = [];
    for (let drinkNumber = 0; drinkNumber < count; drinkNumber++) {
        let drink = [];

        let drinkName = form.elements[2 + drinkNumber * 12].value;

        let milk;
        for (let milkNumber = 3; milkNumber < 7; milkNumber++) {
            let temp = form.elements[milkNumber + drinkNumber * 12];
            if (temp.checked) {
                milk = temp.value;
                break;
            }
        }

        let options = [];
        for (let optionsNumber = 7; optionsNumber < 11; optionsNumber++) {
            let temp = form.elements[optionsNumber + drinkNumber * 12];
            if (temp.checked) {
                options.push(temp.value);
            }
        }
        options = options.join(', ');

        let wishes = form.elements[11 + drinkNumber * 12].value;

        drink.push(drinkName, milk, options, wishes);
        drinks.push(drink);

        console.log(drinkName);
        console.log(milk);
        console.log(options);
        console.log(wishes);
    }
    return drinks;
}

function createTable(drinks) {
    let table = document.createElement('table');
    let head = document.createElement('tr');
    let drinkName = document.createElement('th');
    let milk = document.createElement('th');
    let options = document.createElement('th');
    let wishes = document.createElement('th');

    drinkName.textContent = 'Напиток';
    milk.textContent = 'Молоко';
    options.textContent = 'Дополнительно';
    wishes.textContent = 'Пожелания';

    head.append(drinkName, milk, options, wishes);
    table.append(head);

    for (let drink of drinks) {
        let tr = document.createElement('tr');
        for (let drinkOption of drink) {
            let td = document.createElement('td');
            td.textContent = drinkOption;
            tr.append(td);
        }
        table.append(tr);
    }
    console.log(table);
    return table;
}

function comment(commentInput, commentOutput) {
    const check = new RegExp(/(срочно)|(быстрее)|(побыстрее)|(скорее)|(поскорее)|(очень нужно)/gi);
    commentOutput.innerHTML = commentInput.value.replace(check, "<b>$&</b>");
}

function checkTime(window, time) {
    if (time.value < new Date().toLocaleTimeString().slice(0,-3)) {
        time.classList.add("incorrect-time");
        alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее");
    } else {
        window.remove();
    }
}
