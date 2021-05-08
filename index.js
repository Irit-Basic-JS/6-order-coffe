let count = 1;
let milkTypes = {
    'usual': 'обычное',
    'no-fat': 'обезжиренное',
    'soy': 'соевое',
    'coconut': 'кокосовое'
};
let options = {
    'whipped cream': 'взбитые сливки',
    'marshmallow': 'зефирки',
    'chocolate': 'шоколад',
    'cinnamon': 'корица'
};
let addButton = document.querySelector('.add-button');
let beverage = document.querySelector('.beverage');
let orders = document.querySelector('.orders');
let firstDeleteButton = beverage.querySelector('.delete-button');

firstDeleteButton.addEventListener('click', () => removeDrink(beverage));

let firstCommentField = document.querySelector('.commentField');
let firstTextarea = beverage.querySelector('.comment');

firstTextarea.addEventListener('input', () => printComment(firstCommentField, firstTextarea));

let submitButton = document.querySelector('.submit-button');

function removeDrink(drink) {
    if (count !== 1) {
        count--;
        let allOrders = document.querySelectorAll('.beverage');
        for (let order of allOrders) {
            let currentNumber = getNumber(drink);
            let orderNumber = getNumber(order);
            if (orderNumber > currentNumber) {
                order.querySelector('.beverage-count').textContent = `Напиток №${--orderNumber}`;
                order.innerHTML = order.innerHTML.replace(/milk1/g, `milk${--orderNumber}`);
                order.innerHTML = order.innerHTML.replace(/options1/g, `options${--orderNumber}`);
            }
        }
        drink.remove();
    }
}

function rightWord(countSymbols) {
    let twoLastNumbers = countSymbols % 100;
    let lastNumber = countSymbols % 10;
    if (lastNumber === 1 && twoLastNumbers !== 11)
        return "напиток";
    else if (lastNumber >= 2 && lastNumber <= 4 && twoLastNumbers !== 12 && twoLastNumbers !== 13 && twoLastNumbers !== 14)
        return "напитка";
    else return "напитков";
}

function getNumber(order) {
    return Number(order.querySelector('.beverage-count').textContent.slice(9));
}

function printComment(element, textarea) {
    let keyWords = /(срочно)|(быстрее)|(побыстрее)|(скорее)|(поскорее)|(очень нужно)/gi;
    element.innerHTML = textarea.value.replace(keyWords, "<b>$&</b>");
}

addButton.addEventListener('click', () => {
    count++;
    let newBeverage = beverage.cloneNode(true);
    let number = newBeverage.querySelector('.beverage-count');
    number.textContent = `Напиток №${count}`;
    newBeverage.innerHTML = newBeverage.innerHTML.replace(/milk1/g, `milk${count}`);
    newBeverage.innerHTML = newBeverage.innerHTML.replace(/options1/g, `options${count}`);
    let button = newBeverage.querySelector('.delete-button');
    button.addEventListener('click', () => removeDrink(newBeverage));

    let textarea = newBeverage.querySelector('.comment');
    let commentField = newBeverage.querySelector('.commentField');
    commentField.textContent = '';
    textarea.addEventListener('input', () => printComment(commentField, textarea));
    newBeverage.appendChild(commentField);

    orders.appendChild(newBeverage);
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let beverages = document.querySelectorAll('.beverage');
    let overlay = document.createElement('div');
    overlay.className = 'overlay';
    let modal = document.createElement('div');
    modal.className = 'modal';
    overlay.appendChild(modal);
    let body = document.querySelector('body');
    body.appendChild(overlay);
    let button = document.createElement('button');
    button.textContent = 'X';
    button.className = 'close-button';
    modal.appendChild(button);
    button.addEventListener('click', () => {
        overlay.remove();
    });

    let drinksCount = document.createElement('p');
    drinksCount.textContent = `Вы заказали ${count} ${rightWord(count)}.`;
    modal.appendChild(drinksCount);

    let table = document.createElement('table');

    for(let i = 0; i <= count; i++) {
        let line;
        let fields;
        if(i === 0) {
            line = document.createElement('tr');
        } else {
            line = document.createElement('tr');
            fields = beverages[i - 1].querySelectorAll('.field');
        }
        for(let j = 0; j < 4; j++) {
            let cell;
            if(i === 0) {
                cell = document.createElement('th');
                if(j === 0) {
                    cell.textContent = 'Напиток';
                }
                if(j === 1) {
                    cell.textContent = 'Молоко';
                }
                if(j === 2) {
                    cell.textContent = 'Дополнительно';
                }
                if(j === 3) {
                    cell.textContent = 'Пожелания';
                }
            } else {
                cell = document.createElement('td');
                if(j === 0) {
                    let names = fields[j].querySelector('select');
                    let name = names.options[names.selectedIndex];
                    cell.textContent = name.textContent;
                }
                if(j === 1) {
                    let milkType = fields[j].querySelector('input:checked');
                    cell.textContent = milkTypes[milkType.value];
                }
                if(j === 2) {
                    let optionsList = fields[j].querySelectorAll('input:checked');
                    for(let option of optionsList) {
                        cell.textContent += options[option.value] + ', ';
                    }
                    cell.textContent = cell.textContent.slice(0, cell.textContent.length - 2);
                }
                if (j === 3) {
                    let comment = beverages[i - 1].querySelector('.commentField');
                    cell.innerHTML = comment.innerHTML;
                }
            }
            line.appendChild(cell);
        }
        table.appendChild(line);
    }

    modal.appendChild(table);
});