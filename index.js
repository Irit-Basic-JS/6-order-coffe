let drinks = document.querySelector('.form-drinks');
let drinkForm = document.querySelector('.form-drink');
let submitButton = document.querySelector(".submit-button");
let count = 1;
let overlay = document.querySelector(".overlay");
let closeButton = document.querySelector(".close-button");
let modalWindow = document.querySelector(".modal-window");
let table = document.querySelector(".beverages-table");

document.querySelector('.add-button').addEventListener('click', function (ev){
	count++;
	let newDrink = drinkForm.cloneNode(true);
	newDrink.id = count;
	let header = newDrink.querySelector(".beverage-count");
    let deleteFormDrink = document.createElement("button");
    deleteFormDrink.textContent = "X"
	deleteFormDrink.addEventListener("click", (e) => {
        newDrink.remove();
        let allDrinks = document.querySelectorAll(".form-drink");
        count--;

        let i = 1;
        for (const coffee of allDrinks) {
            let title = coffee.querySelector("h4");
            title.textContent = title.textContent.slice(0, -1) + i;
            coffee.id = i;
            i++;
        }
    });
    newDrink.querySelector(".remove-element").append(deleteFormDrink);
	header.textContent = `Напиток №${count}`;
	drinks.append(newDrink);
});

submitButton.addEventListener("click", (e)=>{
    e.preventDefault();

    let modal = document.createElement('div');
    let modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-window');
    let close = document.createElement('button'); 
    close.classList.add('modal-close');
    let submit = document.createElement('button');
    submit.classList.add('modal-submit');

    close.textContent = 'X';
    close.classList.add('close');

    let drinkCount = document.createElement('span'); 
    drinkCount.textContent = `Вы заказали ` + Pluralize();
    drinkCount.classList.add('modal-count');

    close.addEventListener("click", ()=>{
        modal.remove();
    });

    submit.textContent = 'Оформить';
    submit.addEventListener("click", ()=>{
        modal.remove();
    });

    modal.classList.add('modal');
    modalWindow.classList.add('modal-window');
    modalWindow.append(close, createTable(), submit, drinkCount);
    modal.append(modalWindow);
    document.body.append(modal);
});

function Pluralize() {
    let decades = count % 10;
    let hundreds = count % 100;
    if (decades === 1 && (hundreds >= 20 || hundreds === 1))
        return `${count} напиток`;
    if ((decades >= 2 && decades <= 4) && (hundreds >= 20 || hundreds <= 4))
        return `${count} напитка`;
    return `${count} напитков`;
}

function createTable() {
    let drinkForms = document.querySelectorAll('.form-drink');
    let table = document.createElement('table');
    table.classList.add('modal-table');
    let head = document.createElement('tr');
    let drinkName = document.createElement('th');
    let milk = document.createElement('th');
    let options = document.createElement('th');

    drinkName.textContent = 'Напиток';
    milk.textContent = 'Молоко';
    options.textContent = 'Дополнительно';

    head.append(drinkName, milk, options);
    table.append(head);

    for (let drink of drinkForms) {
        let tr = document.createElement('tr');
        let fields = drink.querySelectorAll('.field');
        
        let drinkName = document.createElement('td');
        let name = fields[0].querySelector('select');
        drinkName.textContent = name.value;
        tr.append(drinkName);

        let milk = document.createElement('td');
        let milkName = fields[1].querySelectorAll('.checkbox-field input');
        for (let e of milkName){
            if (e.checked){
                milk.textContent = e.value;
            }       
        }       
        tr.append(milk);

        let also = document.createElement('td');
        let alsoVal = fields[2].querySelectorAll('.checkbox-field input');
        for (let e of alsoVal){
            if (e.checked){
                also.textContent += e.value + ' ';
            }            
        }        
        tr.append(also);
        
        table.append(tr);
    }
    return table;
}