let baseForm = document.querySelector('.beverage-form');
let addButton = document.querySelector('.add-button');
let submitButton = document.querySelector('.submit-button');
let deleteButton = document.querySelector('.delete-button');
let counter = 1;

function cloneForm(){
    counter++;
    let clone = baseForm.cloneNode(true);
    clone.querySelector('.bev-num').innerHTML = String(counter);
    clone.id = `form${counter}`;
    document.querySelector(".beverages").append(clone);
    if (counter != 1){
        let delClone = clone.querySelector('.delete-button');
        delClone.addEventListener('click', () => {
            clone.remove();
            counter--;
        })
    }
}

function submit(event) {
    event.preventDefault();
    let modalWindow = document.querySelector('.modal');
    let closeButton = document.querySelector('.modal-close')
    let orderDetail = 'напитков';
    if ((counter % 10 == 1) && (counter % 100 != 11))
        orderDetail = 'напиток';
    else if (counter % 10 >= 2 && counter % 10 <= 4 && counter % 100 != 12 && counter % 100 != 14)
        orderDetail = 'напитка';
    modalWindow.classList.add('active');
    document.querySelector('.modal-description').textContent = `Вы заказали ${counter} ${orderDetail}`;
    document.querySelector("table").innerHTML = makeTable(document.querySelectorAll(".beverage-form"));
    closeButton.addEventListener('click', () => {
        modalWindow.classList.remove('active')
    })
}

function makeTable(forms){
    let rows = '<tr><th>Напиток</th><th>Молоко</th><th>Дополнительно</th><th>Пожелания</th></tr>';
    forms.forEach(form=> {
        const fromData = new FormData(form);
        rows += "<tr>" + convertToRow(fromData) + "</tr>";
    })
    return rows;
}

function convertToRow(formData){
    const convertion = {"espresso": "Эспрессо", "capuccino": "Капучино", "cacao": "Какао",
        "usual": "на обычном молоке", "no-fat": "на обезжиренном молоке", "soy": "на соевом молоке", "coconut":"на кокосовом молоке",
        "whipped cream": "взбитых сливок", "marshmallow": "зефирок", "chocolate":"шоколад", "cinnamon":"корицу"};
    return `<td>${convertion[formData.get('type')]}</td>
    <td>${convertion[formData.get('milk')]}</td>
    <td>${formData.getAll('options').map(option => convertion[option])}</td>
    <td>${formData.get('comment')}</td>`;
}

addButton.addEventListener('click', cloneForm);
submitButton.addEventListener('click', submit);

cloneText = (textarea) =>{
    let text = textarea.value.replace(/(срочно)|(быстрее)|(побыстрее)|(скорее)|(поскорее)|(очень нужно)/gi,"<b>$&</b>");
    textarea.parentNode.querySelector("span").innerHTML = text;
}