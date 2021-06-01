let addButton = document.querySelector('.add-button');
let form = document.querySelector('.beverage');
let cont = document.querySelector('.cont');
let del = document.querySelector('.delete');

let submitButton = document.querySelector('.submit-button');

let counter = 1;
function addForm() {
    counter++;
    let clone = form.cloneNode(true);
    cont.appendChild(clone);
    let newNumber = clone.querySelector('.number');
    newNumber.innerHTML = counter;
    for (let i of clone.querySelectorAll('input')) {
        i.name = i.name + counter;
    }
    if(counter !== 1) {
        clone.querySelector('.delete').addEventListener('click', () => {clone.remove(); counter--});
        form.querySelector('.delete').addEventListener('click', () => {form.remove(); counter--});
    }
}

function toAccept(event) {
    event.preventDefault();
    let modal = document.querySelector('.modal');
    let overlay = document.querySelector('.overlay');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    let dec = 'напитков';
    if ((counter % 10 == 1) && (counter % 100 != 11)) dec = 'напиток';
    else if  ((counter % 10 >= 2) && (counter % 10 <= 4) && ((counter % 100 < 12) || (counter % 100 > 14))) dec = 'напитка';
    document.querySelector('.text').textContent = `Вы заказали ${counter} ${dec}`;
    modal.querySelector('.close').addEventListener('click', () => {modal.remove(); overlay.remove()});
}

addButton.addEventListener('click', addForm);
submitButton.addEventListener('click', toAccept);