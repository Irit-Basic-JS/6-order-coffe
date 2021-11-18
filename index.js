const addButton = document.querySelector('.add-button');
const form = document.querySelector('form');
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const modalWindowHeader = modalWindow.querySelector('.header');
const keyWords = /(срочно)|(быстрее)|(побыстрее)|(скорее)|(поскорее)|(очень нужно)/gi;

let count = 1;
let orderSize, table;

const firstBeverage = document.querySelector('.beverage');
const firstTextarea = firstBeverage.querySelector('textarea');
const firstComment = firstBeverage.querySelector('.comment');

firstTextarea.addEventListener('input', () => renderCommit(firstTextarea, firstComment));

const renderCommit = (textarea, comment) => comment.innerHTML = textarea.value.replace(keyWords, '<b>$&</b>');

addButton.addEventListener('click', () => {
    const lastBeverage = document.querySelectorAll('.beverage')[document.querySelectorAll('.beverage').length - 1];
    const newBeverage = lastBeverage.cloneNode(true);

    newBeverage.querySelector('.beverage-count').textContent = 'Напиток №' + ++count;
    for (let input of newBeverage.querySelectorAll('input'))
        input.name += count;
    lastBeverage.after(newBeverage);
    newBeverage.querySelector('.close-button').addEventListener('click', () => {
        newBeverage.remove();
        --count;
    });

    const textarea = newBeverage.querySelector('textarea');
    const comment = newBeverage.querySelector('.comment');

    comment.textContent = '';
    textarea.addEventListener('input', () => renderCommit(textarea, comment));
    newBeverage.appendChild(comment);
});

form.addEventListener('submit', event => {
    event.preventDefault();
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
    orderSize = document.createElement('p');
    orderSize.textContent = `Вы заказали ${count} ${getRightWord(count)}`;
    modalWindowHeader.after(orderSize);
    table = getTable();
    modalWindow.appendChild(table);
});

modalWindow.querySelector('.close-button').addEventListener('click', () => {
    modalWindow.classList.add('hidden');
    overlay.classList.add('hidden');
    modalWindow.removeChild(orderSize);
    modalWindow.removeChild(table)
});

function getRightWord(amount) {
    if (amount % 10 === 1 && amount % 100 !== 11)
        return 'напиток';
    if (amount % 10 > 1 && amount % 10 < 5 && (amount % 100 < 10 || amount % 100 > 14))
        return 'напитка';
    return 'напитков';
}

const titles = ['Напиток', 'Молоко', 'Дополнительно']

function getTable() {
    const table = document.createElement('table');
    const thead = document.createElement('tr');

    for (let title of titles) {
        const th = document.createElement('th');
        th.textContent = title;
        thead.appendChild(th);
    }
    table.appendChild(thead);

    const beverages = document.querySelectorAll('.beverage');

    for (let beverage of beverages) {
        const data = getData(beverage);
        const tr = document.createElement('tr');
        for (let info of data) {
            const td = document.createElement('td');
            td.textContent = info;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

function getData(beverage) {
    const beverageTitle = Array
        .from(beverage.querySelectorAll('select option'))
        .find(option => option.selected).textContent;
    const checkedTitles = Array
        .from(beverage.querySelectorAll('div.field input'))
        .filter(radio => radio.checked)
        .map(radio => radio.parentNode.querySelector('span').textContent);
    const milkTitle = `на ${checkedTitles.shift()}`;
    const extra = checkedTitles.join(', ') || '-';

    return [beverageTitle, milkTitle, extra];
}
