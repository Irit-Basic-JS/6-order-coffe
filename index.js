let addButton = document.querySelector(".add-button");
let closeButton = document.querySelector('.close-button')
let beverage = document.querySelector(".beverage");
let counter = 1;
let guestWish=document.createElement('p');

addButton.onclick = function () {
    counter++;
    const newForm = beverage.cloneNode(true);
    newForm.innerHTML = newForm.innerHTML.replace("Напиток №1", `Напиток №${counter}`);
    newForm.id = `form${counter}`;
    for(let i of newForm.querySelectorAll('.milkselect')){
        i.name=`milk${counter}`
    }
    document.querySelector(".beverages").append(newForm);
}

function closeClick(elem) {
    if (counter > 1) {
        let elemNum = +elem.id.slice(4);
        elem.remove();
       for(let drink of document.querySelectorAll('.beverage')){
           let num = +drink.id.slice(4);
           if(elemNum<num){
               drink.id= `form${num-1}`;
               drink.querySelector(".beverage-count").textContent = `Напиток №${num - 1}`;;
           }
       }
       
       counter-=1;
    }
}

document.querySelector('.submit-button').addEventListener('click', () => {   
    let drinkCount = document.createElement('p');
    drinkCount.textContent =`Вы заказали ${counter} ${findEnding()}`;
    document.querySelector('.modal-content').append(drinkCount);

    let table = createTable();
    document.querySelector('.modal-content').append(table);

    document.querySelector('.modal-content').append(guestWish);

    let finishButton = document.createElement('button');
    finishButton.textContent='Оформить';
    finishButton.classList.add('confirm');
    document.querySelector('.modal-content').append(finishButton);

    finishButton.addEventListener('click',function(event){
        verifyTime(event);
    });

    document.querySelector('.modal').style.display="block";
});

function findEnding(){
    n = Math.abs(+counter) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return 'напитков' }
    if (n1 > 1 && n1 < 5) { return 'напитка' }
    if (n1 == 1) { return 'напиток' }
    return 'напитков';
}

tableHeaders = ['Тип напитка','На каком молоке','Дополнительно'];

function createTable() {
    const table = document.createElement('table');
    const header = document.createElement('tr');

    for (let colName of tableHeaders) {
        let cell = document.createElement('th');
        cell.textContent = colName;
        header.append(cell);
    }

    table.append(header);

    let beverages = document.getElementsByClassName('beverage');
    for (let beverage of beverages) {
        let datas = getFormInfo(beverage);

        let row = document.createElement('tr');

        for (let data of datas) {
            let cell = document.createElement('td');
            cell.textContent = data;
            row.append(cell);
        }
        table.append(row);
    }

    return table;
}

function getFormInfo(beverage) {

    let beverageNames = beverage.querySelectorAll('select option');
    let beverageName = Array.from(beverageNames).find(c => c.selected).textContent;

    let names = beverage.querySelectorAll('.field input');
    let checkedNames = Array
        .from(names)
        .filter(c => c.checked)
        .map(c => c.parentNode.querySelector('span').textContent);

    let milkName = checkedNames.shift();
    let other = checkedNames.join(',');

    if (!other)
        other = ' - ';

    return [beverageName, milkName, other];
}

document.querySelector('.modalClose').addEventListener('click', function(){
    document.querySelector('.modal').style.display="none";
});

function wish(commentInput, commentOutput) {
    const check = new RegExp(/(срочно)|(быстрее)|(побыстрее)|(скорее)|(поскорее)|(очень нужно)/gi);
    commentOutput.innerHTML = commentInput.value.replace(check, "<b>$&</b>");
    guestWish= `Пожелание клиента:${commentOutput.innerHTML}`;
    
}

function verifyTime(event){
    let time = document.getElementById('thistime').value.split(':');
    let now = new Date();
    if (!(time==""||+time[0]>now.getHours()||(+time[0]==+now.getHours()&&+time[1]>=now.getMinutes()))){
        document.getElementById('thistime').classList.add('wrongTime'); 
        event.preventDefault();
        alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее'); 
    }
    

};



