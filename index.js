let form = document.querySelector('.beverage');
let addDrink = document.querySelector('.add-button');
let forms = document.querySelector('.beverages');
let count = 1;

addDrink.addEventListener('click', (e) => {
    let newForm = form.cloneNode(true);
    count += 1;
    newForm.querySelector('.beverage-count').innerHTML = 'Напиток №' + count;
    
    forms.append(newForm);
});


function deleteDrink (form) {
    if (count != 1){
        form.remove();
        count -= 1;
    }
}

let submitButton = document.querySelector('.submit-button');
let modalWindow = document.querySelector('.modal');
let closeBtn = document.querySelector('.close')

submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalWindow.querySelector('.drinks-count').innerHTML = `Вы заказали ${count} ${inclineWord(count)}`;
    addItemsInTable(getData());

    let orderTime = document.querySelector('.order-time');
    orderTime.onchange = (e) => {
        let dateNow = new Date();
        let [hours, minutes] = e.target.value.split(':');
        let inputTime = new Date();
        inputTime.setHours(hours);
        inputTime.setMinutes(minutes);
        if (dateNow > inputTime) {
            alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее");
            orderTime.classList.add('error');
        } else {
            orderTime.classList.remove('error');
        }
    }
    
    modalWindow.classList.add('modal--show');
});

function inclineWord (count) {
    if (count % 10 == 1 && count % 100 != 11)
        return 'напиток';
    else if ((2 <= count && count % 10 <= 4) && count % 100 != 12 && count % 100 != 13 && count % 100 != 14)
        return 'напитка';
    else
        return 'напитков';
}

closeBtn.addEventListener('click', function () {
    modalWindow.classList.remove('modal--show');
})


function getData() {
    let orders = document.querySelectorAll('fieldset');
    let result = {
        count: orders.length,
        drinks: []
    };

    let j = 1;
    for (let order of orders) {
        let additionally = "";
        for (let i of order.querySelectorAll('[name="options"]')) {
            if (i.checked)
                additionally += i.value + ", ";
        }
        let milk = "";
        for (let i of order.querySelectorAll(`[name="milk${j}"]`)) {
            if (i.checked) {
                milk = i.value;
                break;
            }
        }
        result.drinks.push({
            drink: order.querySelector('[name="drink"]').value,
            milk: milk,
            additionally: additionally,
            somethingElse: order.querySelector('[name="somethingElse"]').value
        });
        j++;
    }

    return result;
}

function addItemsInTable(data) {
    let table = document.querySelector(".table-form")
    console.log(data)
    for (let i of data.drinks) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = i.drink;
        tr.append(td);
        td = document.createElement('td');
        td.textContent = i.milk;
        tr.append(td);
        td = document.createElement('td');
        td.textContent = i.additionally;
        tr.append(td);
        td = document.createElement('td');
        td.textContent = i.somethingElse;
        tr.append(td);

        table.append(tr)
    }
    return table;
}

let arr = ["срочно", "быстрее","побыстрее","скорее","поскорее","очень нужно"];
let textarea = document.querySelector('textarea');

const textareaFunc = (e) => {
    let text = e.target;
    for (let i of arr) {
        if (text.value.includes(i) && !text.value.includes(`<b>${i}</b>`)) {
            text.value = text.value.replace(i, `<b>${i}</b>`);
        }
    }
};
textarea.oninput = textareaFunc;