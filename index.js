document.getElementById('add-button').onclick = addList;

function addList()
{
    let list = document.querySelectorAll ('fieldset');
    let clone = list[0].cloneNode(true);
    let countOfmenu = list.length;
    clone.children[0].innerHTML = 'Напиток №' + (countOfmenu + 1);
    rec = clone.querySelectorAll('input[type="x"]');
    for (let x of rec) x.name = 'milk' + countOfmenu;
    list[countOfmenu - 1].after(clone);
}
function moveList()
{
    let list = document.querySelectorAll ('fieldset');
    let move = this.parentNode;
    if (list.length > 1) 
    {
        move.remove();
        list = document.querySelectorAll ('fieldset');
        for (let i = 0; i < list.length; i++)
        {
            rec = list[i].querySelectorAll('input[type="x"]');
            for (let x of rec) x.name = 'milk' + i;
            list[i].children[0].innerHTML = 'Напиток №' + (i + 1);
        }

    };  
}