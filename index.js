const translation = {
    'espresso': 'эспрессо',
    'cappuccino': 'капучино',
    'cacao': 'какао',
    'usual': 'обычное',
    'no-fat': 'обезжиренное',
    'soy': 'соевое',
    'coconut': 'кокосовое',
    'whipped cream': 'взбитые сливки',
    'marshmallow': 'зефирки',
    'chocolate': 'шоколад',
    'cinnamon': 'корицу'
};

const form = document.querySelector('.beverage-form');
const beverageList = document.querySelector('.beverage-list');
const beverageContainer = new ItemContainer(beverageList);

const addButton = document.querySelector('.add-button');
const doneButton = document.querySelector('.submit-button');

const modal = document.querySelector('.confirmation');
const modalConfirm = document.querySelector('.confirmation .btn-confirm');
const modalClose = document.querySelector('.confirmation .btn-close');

const modalCounter = document.querySelector('.confirmation .modal-title .count');
const table = modal.querySelector('table');

beverageContainer.append(new Beverage({
    container: beverageContainer,
    number: 1
}));

addButton.addEventListener('click', () => {
    beverageContainer.append(new Beverage({
        container: beverageContainer,
        number: beverageContainer.count + 1,
    }));
});
doneButton.addEventListener('click', submitHandler);

modalConfirm.addEventListener('click', modalConfirmHandle);
modalClose.addEventListener('click', () => modal.close());

function modalConfirmHandle() {
    const deliverDateField = modal.querySelector('[name="deliver-date"]');
    const inputDate = new Date(deliverDateField.value);
    if (inputDate < Date.now()) {
        deliverDateField.style.backgroundColor = 'rgba(239,29,25,0.07)';
        alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее');
    } else {
        deliverDateField.style.backgroundColor = '#fff';
        modal.close()
    }
}

function submitHandler(event) {
    event.preventDefault();
    renderConfirmation();
    modal.showModal();
}

function renderConfirmation() {
    const formData = getFormData(form);
    const count = formData.length;
    const declinations = ['напиток', 'напитка', 'напитков'];
    modalCounter.textContent = `${count} ${getDeclination(count, declinations)}`;
    fillTable(table, formData);
}

function getFormData(form) {
    const beverageForms = Array.from(form.querySelectorAll('.beverage'));
    return beverageForms.map(getBeverageData);
}

function getBeverageData(beverageForm) {
    const name = beverageForm.querySelector('[name="name"]');
    const milk = beverageForm.querySelector('[name^="milk-"]:checked');
    const options = Array.from(beverageForm.querySelectorAll('[name^="options-"]:checked'));
    const wishes = beverageForm.querySelector('.wishes-result');

    return {
        name: name.value,
        milk: milk.value,
        options: options.map(option => option.value),
        wishes: wishes.innerHTML
    }
}

function fillTable(table, formData) {
    const content = formData.map(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${translation[data.name.toLowerCase()]}</td>
            <td>${translation[data.milk.toLowerCase()]}</td>
            <td>${data.options.map(option => translation[option.toLowerCase()]).join(', ') || ''}</td>
            <td>${data.wishes}</td>
        `;
        return row;
    });

    const oldTableBody = table.querySelector('tbody');
    oldTableBody && oldTableBody.remove();

    const tableBody = table.createTBody();
    tableBody.append(...content);
}

function getDeclination(number, declinations) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return declinations[2];
    }
    n %= 10;
    if (n === 1) {
        return declinations[0];
    }
    if (n >= 2 && n <= 4) {
        return declinations[1];
    }
    return declinations[2];
}
