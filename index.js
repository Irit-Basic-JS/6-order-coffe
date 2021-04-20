let r = new RegExp("\d+");
let count = 2;

let form = document.querySelector("form")
let formDrink = document.querySelector(".form-drink");
let bodyForm = document.querySelector(".forms-drinks");
let addFormDrink = document.querySelector(".add-button");
let sumbitButton = document.querySelector(".submit-button");

addFormDrink.addEventListener("click", (e) => {
    let copyForm = formDrink.cloneNode(true);
    let h4 = copyForm.querySelector("h4");
    h4.textContent = h4.textContent.slice(0, -1) + count;
    bodyForm.append(copyForm);
    count++;

    let deleteFormDrink = document.createElement("button");
    deleteFormDrink.textContent = "Удалить ?"
    deleteFormDrink.addEventListener("click", (e) => {
        copyForm.remove();
        count--;
    });
    copyForm.querySelector(".remove-element").append(deleteFormDrink);
})

sumbitButton.addEventListener("click", (e) => {
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

    document.body.append(fon);
});

function getData() {
    let orders = form.querySelectorAll('fieldset');
    let result = {
        count: orders.length,
        drinks: []
    };

    for (let order of orders) {
        let additionally = "";
        for (let i of order.querySelectorAll('[name="options"]'))
            if (i.checked)
                additionally += i.value + ", ";
        result.drinks.push({
            drink: order.querySelector('[name="drink"]').value,
            milk: order.querySelector('[name="milk"]').value,
            additionally: additionally
        })
    }

    return result;
}


