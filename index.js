import CoffeeList from "./coffeeList.js";

function readQueryData() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const result = {}
    for (let key of urlParams.keys()) {
        let data = key.match(/\b([a-zA-Z]+)*(\d*\.?\d+)/);
        if (!(data[2] in result)) {
            result[data[2]] = {beverage: [""], milk: [""], options: [""], details: [""]};
        }

        result[data[2]][data[1]] = urlParams.getAll(data[0]);
        if (data[1] === 'details') {
            result[data[2]][data[1]] = [boldMD(urlParams.getAll(data[0])[0])];
        }
    }
    return result;
}

function boldMD(str) {
    const keywords = ["срочно", "побыстрее", "быстрее", "поскорее", "скорее", "очень нужно"];
    let clone = str
    let lastI = 0;

    keywords.forEach(keyword => {
        let implace = "<b>" + 
        clone.slice(clone.toLowerCase().indexOf(keyword, lastI), clone.toLowerCase().indexOf(keyword, lastI) + keyword.length)
        + "</b>";
        if (clone.toLowerCase().indexOf(keyword, lastI) != -1) {
            clone = clone.slice(0, clone.toLowerCase().indexOf(keyword, lastI)) + implace 
            + clone.slice(clone.toLowerCase().indexOf(keyword, lastI) + keyword.length);
            lastI = clone.toLowerCase().indexOf(implace) + implace.length - 1;
        }
        
    });

    return clone;
}

function generateTable(table, data) {
    for (let element in data) {
        let row = table.insertRow();
        for (let key in data[element]) {
            let cell = row.insertCell();
            let text = data[element][key].join(', ');
            cell.innerHTML = text;
        }
    }
}

function checkoutButtonHandler(e) {
    
}

window.onload = function() {
    const coffeeList = new CoffeeList(document.getElementById('CoffeeList'))
    document.getElementById('AddButton').onclick = coffeeList.addItem.bind(coffeeList);

    let query = readQueryData();

    if (Object.entries(query).length != 0) {
        const responseModal = new bootstrap.Modal(document.getElementById('responseModal'))
        generateTable(document.getElementById('responseTable'), query);

        document.getElementById('checkoutButton').onclick = (e) => {
            e.preventDefault();
            let timeString = document.getElementById('inputTime').value

            let now = new Date();
            var datetime = new Date(now.getFullYear(),
            now.getMonth(), now.getDate(),
            timeString.substr(0, 2), timeString.substr(3, 2));
            if (datetime < new Date()) {
                alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее');
            }
            else {
                //document.getElementById("checkoutForm").submit();
                responseModal.hide()
            }
        }

        responseModal.show();
    }
};