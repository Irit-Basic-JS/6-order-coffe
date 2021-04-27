const headings = ['Напиток', 'Молоко', 'Дополнительно', 'Пожелания'];
const boldPattern = /(срочно)|(быстрее)|(побыстрее)|(скорее)|(поскорее)|(очень нужно)/gi;

document.querySelector('.add-button').addEventListener('click', handleAddButton);
document.querySelector('.remove-button').addEventListener('click', () => handleRemoveButton(document.getElementsByTagName('form')[0]));
document.querySelector('.submit-button').addEventListener('click', event => handleSubmitButton(event));
document.querySelector('.close-button').addEventListener('click', () => document.getElementById('modal-container').classList.add('hidden'))
document.querySelector('.wishes').addEventListener("input", () => handleTextAreaChanged(document.querySelector('.wishes'), document.querySelector('.wishes-output')));
document.querySelector('input[name="order"]').addEventListener('click', () => {
    let timeField = document.querySelector('input[name="time"]');
	let enteredTime = timeField.value.split(':');
	let now = new Date();
	if (enteredTime[0] < now.getHours() || enteredTime[0] === now.getHours() && enteredTime[1] <= now.getMinutes()) {
            timeField.style.border = '5px solid #DC143C';
		alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее");
	} else {
		document.getElementById('modal-container').classList.add("hidden");
        location.reload();
	}
});

function handleAddButton() {
    let count = document.getElementsByClassName("beverage").length;
    let form = document.getElementsByTagName("form")[0].cloneNode(true);
    form.reset();
    form.querySelector(".wishes-output").innerHTML = ""
    while (document.getElementById(`beverage-${count}`) != null)
        count++;
    form.id = `beverage-${count}`;
    form.querySelector(".beverage-count").textContent = `Напиток №${count}`;
    form.querySelector(".remove-button").addEventListener("click", () => handleRemoveButton(form))
    form.querySelector(".wishes").addEventListener("input", () => onTextareaChanged(form.querySelector(".wishes"), form.querySelector(".wishes-output")))
    document.querySelector(".container").append(form);
}

function handleRemoveButton(fieldset) {
    let count = document.getElementsByClassName("beverage").length;
    if (count < 2)
        return;
    fieldset.remove();
}

function handleSubmitButton(event) {
    let table = document.querySelector(".order-table");
    table.innerHTML = createTable();
    document.getElementById("modal-container").querySelector("h2").textContent = declOfNum();
    document.getElementById("modal-container").classList.remove("hidden");
}

function createTable() {
    let tableInnerHtml = `<tr>\n`;
    for (let heading of headings)
        tableInnerHtml += `<th>\n${heading}</th>\n`;
    tableInnerHtml += `</tr>\n`;
    for (let beverage of document.getElementsByClassName("beverage")) {
        tableInnerHtml += `<tr>\n`;
        let type = beverage.querySelector('option:checked').dataset.type;
        let milk = beverage.querySelector('input[name="milk"]:checked').dataset.milk;
        let optionSelector = beverage.querySelectorAll('input[name="options"]:checked');
        let wishes = beverage.querySelector('.wishes-output')
        let options = [];
        for (let option of optionSelector)
            options.push(option.dataset.adds);
        tableInnerHtml += `<td>${type}</td>\n<td>${milk}</td>\n<td>${options.join(', ')}</td>\n<td>${wishes.innerHTML ? wishes.innerHTML : ""}</td>\n</tr>\n`
    }

    return tableInnerHtml;
}

function declOfNum() {
    let count = document.getElementsByClassName("beverage").length;
    const titles = ["напиток", "напитка", "напитков"];
    const cases = [2, 0, 1, 1, 1, 2];
    return `Вы заказали ${count} ${titles[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]]}`;
}

function handleTextAreaChanged(textArea, element) {
    element.innerHTML = textArea.value.replace(boldPattern, "<b>$&</b>");
}