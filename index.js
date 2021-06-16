let count = 2;
const keywords = ["срочно", "быстрее", "побыстрее","скорее","поскорее","очень нужно"];

let mainForm = document.querySelector("form");
let formOneDrink = document.querySelector(".form-drink");
let formAllDrinks = document.querySelector(".forms-drinks");
let addFormDrink = document.querySelector(".add-button");
let submitButton = document.querySelector(".submit-button");
let textarea = formOneDrink.querySelector("textarea");

const textareaOninput = (e) => {
    let text = e.target;
    for (let i of keywords) {
        if (text.value.includes(i) && !text.value.includes(`<strong>${i}</strong>`)) {
            text.value = text.value.replace(i, `<strong>${i}</strong>`);
        }
    }
};
textarea.oninput = textareaOninput;

addFormDrink.addEventListener("click", (e) => {
    let newDrink = formOneDrink.cloneNode(true);
    let h4 = newDrink.querySelector("h4");
    h4.textContent = h4.textContent.slice(0, -1) + count;
    newDrink.innerHTML = newDrink.innerHTML.replace(/milk\d+/g, `milk${count}`);
    newDrink.id = `form${count}`;
    newDrink.querySelector("textarea").oninput = textareaOninput;
    formAllDrinks.append(newDrink);
    count++;
    let buttonDeleteFormDrink = document.createElement("button");
    buttonDeleteFormDrink.textContent = "Удалить ?"
    buttonDeleteFormDrink.addEventListener("click", (e) => {
        newDrink.remove();
        let drinks = document.querySelectorAll(".form-drink");
        count--;
        let i = 1;
        for (const drink of drinks) {
            let title = drink.querySelector("h4");
            title.textContent = title.textContent.slice(0, -1) + i;
            drink.id = `form${i}`;
            drink.innerHTML = drink.innerHTML.replace(/milk\d+/g, `milk${i}`);
            i++;
        }
    });
    newDrink.querySelector(".remove-element").append(buttonDeleteFormDrink);
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let data = getData();
    let fon = document.createElement("div");
    let dialogWindow = document.createElement("div");
    let closeButton = document.createElement("button");
    closeButton.textContent = "закрыть";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", (e) => {
        fon.remove();
    });

    fon.append(dialogWindow);
    fon.classList.add("acceptance");
    dialogWindow.textContent = `Ваш заказ оформлен Вы заказали ${data.count} drink(s)`;
    dialogWindow.classList.add("acceptance-window");
    dialogWindow.append(closeButton);
    dialogWindow.append(createTable(data));
    let time = document.createElement("input");
    time.type = "time";
    time.style.float = "right";
    time.style.margin = "20px";
    time.onchange = (e) => {
        let nowTime = new Date();
        let [hours, minutes] = e.target.value.split(":");
        let inputValue = new Date();
        inputValue.setHours(hours);
        inputValue.setMinutes(minutes)
        if (nowTime > inputValue) {
            alert("Мы не умеем перемещаться во времени. Выберите время позже, чем текущее");
            time.classList.add("error");
        } else  {
            time.classList.remove("error");
        }
    }


    let submit = document.createElement("button");
    submit.textContent = "Отправить";
    submit.type = "submit"
    submit.addEventListener("click", (e) => {
        if (time.classList.contains("error") || !time.value) {
            e.preventDefault();
            alert("Укажите корректное время");
        } else {
            mainForm.submit();
        }
    });

    dialogWindow.append(submit)
    dialogWindow.append(time);
    document.body.append(fon);
});

function getData() {
    let orders = mainForm.querySelectorAll('fieldset');
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

        console.log(order);
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

function createTable(data) {
    let table = document.createElement("table");
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.textContent = "Drink:";
    tr.append(th);
    th = document.createElement("th");
    th.textContent = "Молоко";
    tr.append(th);
    th = document.createElement("th");
    th.textContent = "Дополнительно";
    tr.append(th);
    table.append(tr);
    th = document.createElement("th");
    th.textContent = "Пожелания";
    tr.append(th);
    table.append(tr);

    for (let i of data.drinks) {
        tr = document.createElement("tr");
        let td = document.createElement("td");
        td.textContent = i.drink;
        tr.append(td);
        td = document.createElement("td");
        td.textContent = i.milk;
        tr.append(td);
        td = document.createElement("td");
        td.textContent = i.additionally;
        tr.append(td);
        table.append(tr);
        td = document.createElement("td");
        td.textContent = i.somethingElse;
        tr.append(td);
        table.append(tr);
    }

    table.classList.add("table-form");
    return table;
}