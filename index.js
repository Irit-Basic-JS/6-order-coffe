const form = document.getElementsByTagName('form')[0];
const addButton = document.getElementById("add-button");
const modalWindow = document.getElementById("modal-window");
const modalWindowHeader = modalWindow.getElementsByTagName('h2')[0];
const closeModalWindowBtn = modalWindow.getElementsByClassName("close-button")[0];
const overlay = document.getElementById("overlay");

let count = 2;

addButton.addEventListener("click", (ev) => {
    let beverages = document.getElementsByClassName("beverage");
    let beverage = beverages[beverages.length - 1];
    let newBeverage = beverage.cloneNode(true);

    let inputs = newBeverage.querySelectorAll('input');
    for (let input of inputs) {
        input.name += (count - 1);
    }

    let beverageCount = newBeverage.getElementsByClassName("beverage-count")[0];
    beverageCount.textContent = "Напиток №" + count++;

    let closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', ev => {
        newBeverage.remove();
        count--;
    });

    let header = newBeverage.getElementsByClassName('header')[0];
    header.appendChild(closeButton);

    beverage.after(newBeverage);
});

let bookCount;
let table;

form.addEventListener('submit', ev => {
    ev.preventDefault();

    console.log(ev);

    bookCount = document.createElement("p");
    bookCount.textContent = 'Вы заказали ' + (count - 1) + ' ' + getPhraseByNumber(count - 1);
    modalWindowHeader.after(bookCount);

    table = getBookItemsTable();

    modalWindow.append(table);
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

closeModalWindowBtn.addEventListener('click', ev => {
    modalWindow.classList.add('hidden');
    bookCount.remove();
    table.remove();
    overlay.classList.add('hidden');
});

function getPhraseByNumber(number) {
    if (number == 1) {
        return 'напиток';
    }

    if (2 <= number <= 4) {
        return 'напитка';
    }

    if (5 <= number <= 20) {
        return 'напитков';
    }

    let numberStr = number.toString();
    let lastSymbol = numberStr[numberStr.length - 1];

    return getPhraseByNumber(parseInt(lastSymbol));
}

tableHeaders = ['Напиток','Молоко','Дополнительно'];

function getBookItemsTable() {
    const table = document.createElement('table');
    const header = document.createElement('tr');

    for (let columnName of tableHeaders) {
        let cell = document.createElement('th');
        cell.textContent = columnName;
        header.append(cell);
    }

    table.append(header);

    let beverages = document.getElementsByClassName('beverage');

    for (let beverage of beverages) {
        let datas = getBeverageData(beverage);

        let row = document.createElement('tr');

        for (let data of datas) {
            let cell = document.createElement('td');
            cell.textContent = data;
            row.append(cell);
        }
        table.append(row);
    }

    return table;
}

function getBeverageData(beverage) {

    let beverageNames = beverage.querySelectorAll('select option');
    let beverageName = Array.from(beverageNames).find(c => c.selected).textContent;
    console.log(beverageName);

    let names = beverage.querySelectorAll('.field input');
    let checkedNames = Array
        .from(names)
        .filter(c => c.checked)
        .map(c => c.parentNode.querySelector('span').textContent);

    let milkName = checkedNames.shift();
    let other = checkedNames.join(',');

    if (!other)
        other = ' - ';

    return [beverageName, milkName, other];
}