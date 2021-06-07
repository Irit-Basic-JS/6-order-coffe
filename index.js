const form = document.querySelector('form');
const beverageTemplate = document.querySelector('#beverage-template').content.querySelector('.beverage');
const addButton = document.querySelector('.add-button');
const closeButton = document.querySelector('.close-button');
const submitButton = document.querySelector('.submit-button');
const overlay = document.querySelector('.overlay');
const order = document.querySelector('.order');
const sumbitOrderButton = document.querySelector('.submit-order-button');
let beverageCount = 0;


addButton.addEventListener('click', function () {
    const beverage = createBeverage(++beverageCount);
    document.querySelector('template').before(beverage);
});
form.addEventListener('click', function () {
    updateButtonsStatus();
});
submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    overlay.style.display = 'block';

    createTableOrder();
});

closeButton.addEventListener('click', function () {
    overlay.style.display = 'none';
});
window.addEventListener('click', function (evt) {
    if (evt.target === overlay) {
        overlay.style.display = 'none';
    }
});

sumbitOrderButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    const timeOrder = document.querySelector('.time-order');
    if (!timeOrder.value) {
        alert('Укажите время заказа');
    } else {
        const [hours, minutes] = timeOrder.value.split(':');
        const [hoursNow, minutesNow] = new Date().toLocaleTimeString().split(':');
        if (hours < hoursNow || hours === hoursNow && minutes < minutesNow) {
            timeOrder.style.borderColor = 'red';
            setTimeout(() => alert(
                'Мы не умеем перемещаться во времени. Выберите время позже, чем текущее'
            ), 10);
        } else {
            closeButton.click();
        }
    }
});

function createBeverage(number) {
    const beverage = beverageTemplate.cloneNode(true);
    const title = beverage.querySelector('h4');
    title.textContent = `Напиток №${number}`;
    setMilkNames(beverage, number);
    addRemoveButton(beverage);
    addWishes(beverage);
    return beverage;
}
function setMilkNames(beverage, number) {
    const milk = beverage.querySelectorAll('input[type="radio"]');
    for (const m of milk) {
        m.name = `milk-${number}`;
    }
}
function addRemoveButton(beverage) {
    const removeButton = beverage.querySelector('.remove-button');
    removeButton.onclick = function () {
        beverage.remove();
        beverageCount--;
        updateOrder();
    }
}
function updateButtonsStatus() {
    const buttons = document.querySelectorAll('.remove-button');
    if (beverageCount === 1) {
        buttons[0].disabled = true;
    } else {
        for (const button of buttons) {
            button.disabled = false;
        }
    }
}
function updateOrder() {
    const beverages = document.querySelectorAll('.beverage');
    for (let i = 0; i < beverageCount; i++) {
        const title = beverages[i].querySelector('h4');
        const number = i + 1;
        title.textContent = `Напиток №${number}`;
        setMilkNames(beverages[i], number);
    }
}
function getDeclination(count) {
    if (beverageCount % 100 > 9 && beverageCount % 100 < 21) {
        return 'напитков';
    } else {
        if (beverageCount % 10 === 1) {
            return 'напиток';
        } else if ([2, 3, 4].includes(beverageCount % 10)) {
            return 'напитка';
        } else {
            return 'напитков';
        }
    }
}
function getData() {
    const beverages = document.querySelectorAll('.beverage');
    const result = [];
    for (const beverage of beverages) {
        const selectedBeverage = beverage.querySelector('select');
        const beverageName = selectedBeverage[selectedBeverage.selectedIndex].text;
        const selectedMilk = beverage.querySelector('input[type="radio"]:checked');
        const milkName = selectedMilk.parentElement.querySelector('span').textContent;
        const selectedOptions = beverage.querySelectorAll('input[type="checkbox"]:checked')
        const optionsName = [];
        for (const option of selectedOptions) {
            const name = option.parentElement.querySelector('span').textContent;
            optionsName.push(name);
        }
        const wishes = beverage.querySelector('textarea').value;
        result.push([
            beverageName,
            milkName,
            optionsName.join(', '),
            wishes,
        ]);
    }
    return result;
}
function createTableOrder() {
    order.innerHTML = '';
    const caption = document.createElement('caption');
    const declination = getDeclination(beverageCount);
    caption.textContent = `Вы заказали: ${beverageCount} ${declination}`;
    order.append(caption);
    const tableHeader = document.createElement('tr');
    const headers = ['Напиток', 'Молоко', 'Дополнительно', 'Пожелания']
    for (const header of headers) {
        const th = document.createElement('th');
        th.append(header);
        tableHeader.append(th);
    }
    order.append(tableHeader)
    const beverages = getData();
    for (const beverage of beverages) {
        const tr = document.createElement('tr');
        for (let i = 0; i < headers.length; i++) {
            const td = document.createElement('td');
            td.append(beverage[i] || '-');
            tr.append(td);
        }
        order.append(tr);
    }
}
function addWishes(beverage) {
    const wishes = beverage.querySelector('textarea');
    wishes.oninput = function () {
        const content = beverage.querySelector('.content');
        content.innerHTML = highlightImportant(wishes.value);
    };
}
function highlightImportant(text) {
    const importantWords = [
        'срочно', 'побыстрее', 'быстрее',
        'поскорее', 'скорее', 'очень нужно',
    ];
    for (const word of importantWords) {
        const matchesArray = text.match(new RegExp(`${word}(?!</b>)`, 'gi'));
        if (matchesArray) {
            for (const match of matchesArray) {
                text = text.replaceAll(match, `<b>${match}</b>`);
            }
        }
    }
    return text;
}
addButton.click();
