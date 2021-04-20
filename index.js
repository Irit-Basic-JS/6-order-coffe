let r = new RegExp("\d+");
let count = 2;

let form = document.querySelector(".form-drink");
let bodyForm = document.querySelector(".forms-drinks");
let addFormDrink = document.querySelector(".add-button");
let sumbitButton = document.querySelector(".submit-button");

addFormDrink.onclick = (e) => {
    let copyForm = form.cloneNode(true);
    let h4 = copyForm.querySelector("h4");
    h4.textContent = h4.textContent.slice(0, -1) + count;
    bodyForm.append(copyForm);
    count++;

    let deleteFormDrink = document.createElement("button");
    deleteFormDrink.textContent = "Удалить ?"
    deleteFormDrink.onclick = (e) => {
        copyForm.remove();
        count--;
    };
    copyForm.querySelector(".remove-element").append(deleteFormDrink);
};

sumbitButton.onclick = (e) => {
    e.preventDefault(); // убрать потом или как-нибудь обойти, короче тут фигня
    let window = document.createElement("div");
    window.textContent = "Ваш заказ оформлен"
    window.classList.add("acceptance-window");
    document.body.append(window);
}


