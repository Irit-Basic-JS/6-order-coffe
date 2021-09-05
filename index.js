document.getElementById('addbutton').onclick = addList;
document.getElementById('movebutton').onclick = moveList;
document.getElementById('sb').onclick = shwModl;
document.getElementById('modalclose').onclick = moveModl;

function addList()
{
    let elem = document.querySelectorAll ('fieldset');
    // Получаем копию первого меню
    let clone = elem[0].cloneNode(true);
    // Привязываем событие к крестику
    clone.children[0].onclick = moveList;
    // Изменяем номер меню
    let countmenu = elem.length;
    clone.children[1].innerHTML = 'Напиток №' + (countmenu + 1);
    // Изменяем имена радиокнопок, чтобы они не зависели от прототипа
    radios = clone.querySelectorAll('input[type="radio"]');
    for (let radio of radios) radio.name = 'milk' + countmenu;
    // Вставляем меню в документ
    elem[countmenu - 1].after(clone);
}

function moveList()
{
    let elem = document.querySelectorAll ('fieldset');
    let moveelem = this.parentNode;
    if (elem.length > 1) 
    {
        moveelem.remove();
        elem = document.querySelectorAll ('fieldset');
        // Изменяем (упорядочиваем) имена радиокнопок и номера меню
        for (let i = 0; i < elem.length; i++)
        {
            radios = elem[i].querySelectorAll('input[type="radio"]');
            for (let radio of radios) radio.name = 'milk' + i;
            elem[i].children[1].innerHTML = 'Напиток №' + (i + 1);
        }

    };  
}

function shwModl()
{   
    let elem = document.querySelectorAll ('fieldset');
    let countmenu = elem.length;
    let modl = document.getElementById('imodal');
    let overlay = document.getElementById('modaloverlay');
    // Формируем заголовок модального окна
    let h4 = document.getElementById('modaltop');
    h4.textContent = Grammatika(countmenu);
    // Формируем таблицу модального окна
    let table = document.querySelector('.tableM');
    for (let menu of elem)
    {
        let tr = document.createElement('tr'); 
        // Напиток
        let td = document.createElement('td'); 
        td.textContent = Translate(document.querySelector('select').value);
        tr.appendChild(td);
        // Молоко
        td = document.createElement('td'); 
        let radios =  menu.querySelectorAll('input[type="radio"]');
        for (let radio of radios) 
            if (radio.checked)
            {
                td.textContent = Translate(radio.value);
                break; 
            }
        tr.appendChild(td);
        // Дополнительно
        td = document.createElement('td'); 
        let opt = menu.querySelectorAll('input[type="checkbox"]');
        for (let op of opt) 
            if (op.checked) 
            if (td.textContent === '') td.textContent = Translate(op.value);
            else td.textContent += ', ' + Translate(op.value);
        tr.appendChild(td);
        // Добавляем строку к таблице
        table.appendChild(tr);
    }
    // Отображаем модальное окно и оверлей в документе
    modl.classList.toggle('mhide');
    overlay.classList.toggle('mhide');

    return false; // чтобы не было перезагрузки страницы
}

function moveModl()
{
    let modl = document.getElementById('imodal');
    let overlay = document.getElementById('modaloverlay');
    // Скрываем модальное окно и оверлей из документа
    modl.classList.toggle('mhide');
    overlay.classList.toggle('mhide');
    // Очищение таблицы
    let table =  document.querySelectorAll('tr');
    for (let i = 1; i < table.length; i++) table[i].remove();
}

function Grammatika(value)
{   let text = 'Вы заказали ' + value;
    let v = String(value);
    let end = v[v.length - 1];
    let dec = v[v.length -2];
    if (dec === '1') return text + ' напитков';
    else
       switch(end) 
       {
        case '1': return text + ' напитoк';
        case '2':
        case '3':
        case '4': return text + ' напитка';
        default: return text + ' напитков';
       }
}

function Translate(value)
{
    switch (value)
    {
        case 'usual': return 'обычное';
        case 'no-fat': return 'обезжиренное';
        case 'soy': return 'соевое';
        case 'coconut': return 'кокосовое';
        case 'espresso': return 'Эспрессо';
        case 'capuccino': return 'Капучино';
        case 'cacao': return 'Какао';
        case 'whipped cream': return 'взбитые сливки';
        case 'marshmallow': return 'зефирки';
        case 'chocolate': return 'шоколадки';
        case 'cinnamon': return 'корица';
        default: return '';
    }
}