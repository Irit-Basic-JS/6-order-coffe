const form = document.querySelector('form');
const beverageTemplate = document.querySelector('#beverage-template').content.querySelector('.beverage');
const addButton = document.querySelector('.add-button');
const closeButton = document.querySelector('.close-button');
const submitButton = document.querySelector('.submit-button');
const overlay = document.querySelector('.overlay');
const order = document.querySelector('.order');
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
    console.log(getData());
});

closeButton.addEventListener('click', function () {
    overlay.style.display = 'none';
});

window.addEventListener('click', function (evt) {
    if (evt.target === overlay) {
        overlay.style.display = 'none';
    }
});

function createBeverage(number) {
    const beverage = beverageTemplate.cloneNode(true);
    const title = beverage.querySelector('h4');
    title.textContent = `Напиток №${number}`;

    setMilkNames(beverage, number);
    addRemoveButton(beverage);

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


        result.push([
            beverageName,
            milkName,
            optionsName.join(', '),
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
    const headers = ['Напиток', 'Молоко', 'Дополнительно']
    for (const header of headers) {
        const th = document.createElement('th');
        th.append(header);
        tableHeader.append(th);
    }
    order.append(tableHeader)

    const beverages = getData();
    for (const beverage of beverages) {
        const tr = document.createElement('tr');
        for (let i = 0; i < 3; i++) {
            const td = document.createElement('td');
            td.append(beverage[i] || '-');
            tr.append(td);
        }
        order.append(tr);
    }
}

addButton.click();
