let form = document.querySelector(".beverage");
let count = 1;
let button = document.querySelector(".add-button");
let parent = document.querySelector(".parent");
let del = document.querySelector(".delete");
let submitButton = document.querySelector(".submit-button");

function cloneForm() {
    count++;
    let clone = form.cloneNode(true);
    parent.appendChild(clone);
    let newNumber = clone.querySelector(".number");
    newNumber.textContent = count;
    if(count !== 1) {
        let delClone = clone.querySelector(".delete");
        delClone.addEventListener("click", () => {clone.remove(); count--});
    }
}

function submit(event) {
    event.preventDefault();
    let modal = document.querySelector(".modal");
    let overlay = document.querySelector(".overlay");
    modal.classList.remove("hide");
    overlay.classList.remove("hide");
    let drink = "";
    if ((count % 10 == 1) && (count % 100 != 11)) 
        drink = "напиток";
    else if  (count % 10 >= 2 && count % 10 <= 4 && count % 100 != 12 && count % 100 != 14) 
        drink = "напитка";
    else
        drink = "напитков";
    document.querySelector(".drinks").textContent = `Вы заказали ${count} ${drink}`;
    modal.querySelector(".close").addEventListener("click", () => {modal.remove(); overlay.remove()});
}

button.addEventListener("click", cloneForm);
submitButton.addEventListener("click", submit) 
