let r = new RegExp("\d+");
let count = 2;
let arr = ["срочно", "быстрее","побыстрее","скорее","поскорее","очень нужно"];

let form = document.querySelector("form")
let formDrink = document.querySelector(".form-drink");
let bodyForm = document.querySelector(".forms-drinks");
let addFormDrink = document.querySelector(".add-button");
let submitButton = document.querySelector(".submit-button");
let textarea = formDrink.querySelector("textarea");

const textareaFunc = (e) => {
    console.log(e);
    let text = e.target;
    for (let i of arr) {
        if (text.value.includes(i) && !text.value.includes(`<strong>${i}</strong>`)) {
            text.value = text.value.replace(i, `<strong>${i}</strong>`);
        }
    }
};
textarea.oninput = textareaFunc;


addFormDrink.addEventListener("click", (e) => {
    let newCoffee = formDrink.cloneNode(true);
    let h4 = newCoffee.querySelector("h4");
    h4.textContent = h4.textContent.slice(0, -1) + count;
    newCoffee.innerHTML = newCoffee.innerHTML.replace(/milk\d+/g, `milk${count}`);
    newCoffee.id = `form${count}`;
    newCoffee.querySelector("textarea").oninput = textareaFunc;
    bodyForm.append(newCoffee);

    count++;

    let deleteFormDrink = document.createElement("button");
    deleteFormDrink.textContent = "Удалить ?"
    deleteFormDrink.addEventListener("click", (e) => {
        newCoffee.remove();
        let allDrinks = document.querySelectorAll(".form-drink");
        count--;

        let i = 1;
        for (const coffee of allDrinks) {
            let title = coffee.querySelector("h4");
            title.textContent = title.textContent.slice(0, -1) + i;
            coffee.id = `form${i}`;
            coffee.innerHTML = coffee.innerHTML.replace(/milk\d+/g, `milk${i}`);
            i++;
        }
    });
    newCoffee.querySelector(".remove-element").append(deleteFormDrink);
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let data = getData();

    console.log(data);
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
        let now = new Date();
        let [hours, minutes] = e.target.value.split(":");
        let inputValue = new Date();
        inputValue.setHours(hours);
        inputValue.setMinutes(minutes)
        if (now > inputValue) {
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
        if (time.classList.contains("error")) {
            e.preventDefault();
            alert("исправьте время на корректное значение")
        }
    });

    dialogWindow.append(submit)
    dialogWindow.append(time);
    document.body.append(fon);
});

function getData() {
    let orders = form.querySelectorAll('fieldset');
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
    th.textContent = "Напиток";
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


