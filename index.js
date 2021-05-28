let form = document.querySelector('.beverage');
let addButton = document.querySelector('.add-button');
let parent = document.querySelector('.parent');
let delButton = document.querySelector('.delButton');
let submitButton = document.querySelector('.submit-button');
let counter = 1;

function cloneForm() {
    counter++;
    let clone = form.cloneNode(true);
    parent.appendChild(clone);
    let newNumber = clone.querySelector('.number');
    newNumber.innerHTML = counter;
    if(counter != 1) {
        let delClone = clone.querySelector('.delete');
        delClone.addEventListener('click', () => {
            clone.remove();
            counter--;
        })
    }
}

function submit(event) {
    event.preventDefault();
    let modal = document.querySelector('.modal');
    let overlay = document.querySelector('.overlay');
    modal.classList.remove('hide');
    overlay.classList.remove('hide');
    let valid = '';
    if ((counter % 10 == 1) && (counter % 100 != 11)) 
        valid = 'напиток';
    else if (counter % 10 >= 2 && counter % 10 <= 4 && counter % 100 != 12 && counter % 100 != 14) 
        valid = 'напитка';
    else 
        valid = 'напитков';
    document.querySelector('.drinks').textContent = `Вы заказали ${counter} ${valid}`;
    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
        overlay.remove();
    });
}

addButton.addEventListener('click', cloneForm);
submitButton.addEventListener('click', submit);