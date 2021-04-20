let count = 1;
let addButton = document.querySelector(".add-button");
const beverage = document.querySelector(".beverage");

addButton.onclick = function () {
    count ++;
    const newCoffee = beverage.cloneNode(true);
    newCoffee.id = `form${count}`;
    newCoffee.innerHTML = newCoffee.innerHTML.replace("Напиток №1", `Напиток №${count}`);
    newCoffee.innerHTML = newCoffee.innerHTML.replace(/milk1/g, `milk${count}`);
    newCoffee.innerHTML = newCoffee.innerHTML.replace(/options1/g, `options${count}`);
    document.querySelector(".beverages").append(newCoffee);
}

function closeButton(element){
    if (count !== 1) {
        count--;
        let numOfDel = getNumber(element);
        element.parentNode.removeChild(element);
        for (let coffee of document.querySelectorAll(".beverage")) {
            const numOfCoffee = getNumber(coffee);
            if (numOfCoffee > numOfDel) {
                coffee.id = `form${numOfCoffee - 1}`;
                coffee.querySelector(".beverage-count").textContent = `Напиток №${numOfCoffee - 1}`;
                coffee.innerHTML = coffee.innerHTML.replace(/milk\d+/g, `milk${numOfCoffee - 1}`);
                coffee.innerHTML = coffee.innerHTML.replace(/options\d+/g, `options${numOfCoffee - 1}`);
            }
        }
    }
}

getNumber = (element) => {return +element.id.slice(4)};