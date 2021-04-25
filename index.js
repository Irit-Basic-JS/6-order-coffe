let count = 1;
let id = 1;
const headers = ["Напиток", "Молоко", "Дополнительно", "Пожелания"];
const removeButton = document.querySelector(".remove-button");
const form = document.querySelector("form");
const formsContainer = document.querySelector(".beverage-container");
const addButton = document.querySelector(".add-button");
const submitButton = document.querySelector(".submit-button");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-button");
const modalWindow = document.querySelector(".modal-window");
const table = document.querySelector(".beverages-table");
const textarea = document.querySelector(".textarea");
const textareaResult = document.querySelector(".textarea-result");
const replacePattern = /(срочно)|(быстрее)|(побыстрее)|(скорее)|(поскорее)|(очень нужно)/gi;
const arrangeButton = document.querySelector("input[name=\"arrange\"]");
const timePicker = document.querySelector("input[name=\"time\"]");

arrangeButton.addEventListener("click", function (ev) {
	const time = timePicker.value.split(":");
	const currentTime = new Date();
	if (time[0] < currentTime.getHours() ||
		time[0] === currentTime.getHours() &&
		time[1] <= currentTime.getMinutes()) {
		timePicker.style.border = "2px solid red";
		alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее");
		ev.preventDefault();
	} else {
		overlay.classList.add("hidden");
	}
});
textarea.addEventListener("input", () => onTextareaChanged(textarea, textareaResult));

closeButton.addEventListener("click", function (ev) {
	overlay.classList.add("hidden");
});

addButton.addEventListener("click", handleAddButton);
removeButton.addEventListener("click", evt => removeButtonHandler((evt.target.parentElement.parentElement)));
submitButton.addEventListener("click", onSubmitForm);

function handleAddButton() {
	id++;
	count++;
	let copy = form.cloneNode(true);
	copy.id = `form-${id}`;
	const header = copy.querySelector(".beverage-count");
	const addButton = copy.querySelector(".add-button");
	addButton.addEventListener("click", handleAddButton);
	const removeButton = copy.querySelector(".remove-button");
	removeButton.addEventListener("click", evt => removeButtonHandler((evt.target.parentElement.parentElement)));
	const textareaCopy = copy.querySelector(".textarea");
	const textareaResultCopy = copy.querySelector(".textarea-result");
	textareaCopy.addEventListener("input", () => onTextareaChanged(textareaCopy, textareaResultCopy));
	header.textContent = `Напиток №${id}`;
	formsContainer.append(copy);
}

function removeButtonHandler(form) {
	if (count <= 1) {
		return;
	}
	count--;
	form.remove();
}

function onSubmitForm(event) {
	table.innerHTML = "";
	table.innerHTML += `${getHeaderRow()}\n`;
	overlay.classList.remove("hidden");
	const p = modalWindow.querySelector("p");
	const beverages = document.querySelectorAll(".beverage");
	for (const beverage of beverages) {
		table.innerHTML += `${convertToRow(beverage)}\n`;
	}
	p.textContent = getCount(count);
	event.preventDefault();
}


function convertToRow(beverage) {
	let res = "";
	const type = beverage.querySelector("option:checked");
	const milk = beverage.querySelector("input[name=\"milk\"]:checked");
	const options = beverage.querySelectorAll("input[name=\"options\"]:checked");
	res += `<td>${type.dataset.value}</td>`;
	const milkTd = document.createElement("td");
	res += `<td>${milk.dataset.value}</td>`;
	let result = [];
	for (const option of options) {
		result.push(option.dataset.value);
	}
	res += `<td>${result.join(", ")}</td>`;
	const addiction = document.querySelector("td");
	res += `<td>${beverage.querySelector(".textarea").value}</td>`;
	return `<tr>${res}</tr>`;
}

function getCount(count) {
	if (count % 10 === 1 && count % 100 !== 11) {
		return `Вы заказали ${count} напиток`;
	} else if (count % 10 > 1 && count % 10 < 5 && (count % 100 < 12 || count % 100 > 14)) {
		return `Вы заказали ${count} напитка`;
	}
	return `Вы заказали ${count} напитков`;
}

function removeAllChildren(table) {
	while (table.rows.length > 0) {
		table.deleteRow(0);
	}
}

function getHeaderRow() {
	let result = "";
	for (const header of headers) {
		result += `<td>${header}</td>`;
	}
	return `<tr>${result}</tr>`;
}

function onTextareaChanged(textarea, paragraph) {
	paragraph.innerHTML = textarea.value.replace(replacePattern, "<b>$&</b>");
}