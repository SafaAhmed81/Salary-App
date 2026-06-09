if(!localStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser') == ''){
    window.location.href = 'login.html';
}

document.querySelectorAll('form button')[0].addEventListener('click', calculateSalary);
document.querySelectorAll('form button')[1].addEventListener('click', clearEmployees);

async function calculateSalary(){
    /* Getting form Data */
    let name = document.getElementById('name').value;
    let basic = document.getElementById('basic').value;
    let bonus = document.getElementById('bonus').value;
    let Penalty = document.getElementById('Penalty').value;
    let extra = document.getElementById('extra').value;
    let jobTitle = document.getElementById('jobTitle').value;
    let currency = document.getElementById('currency').value;
    /* Getting form Data */
    /* Calculating Salary */
    let monthHours = totalMonthlyHours(8, 5, 4);
    let hour = hourlyRate(basic, monthHours);
    let extraV = extraValue(extra, hour, jobTitle);
    let gross = grossSalary(basic, bonus, Penalty, extraV);
    let tax = taxValue(gross, 0.22);
    let net = netSalary(gross, tax);
    /* Calculating Salary */
    /* Displaying Results */
    let convRate = await getCurrencyRate(currency);
    let convertedNumbers = convertNumbers([basic, bonus, Penalty, extraV, gross, tax, net], convRate);
    let rowData = [name, convertedNumbers[0], convertedNumbers[1], convertedNumbers[2], extra, hour, convertedNumbers[3], convertedNumbers[4], '20%', convertedNumbers[5], convertedNumbers[6]];
    if(localStorage.getItem('show') == null){
        localStorage.setItem('show', JSON.stringify([]));
    }
    let myData = JSON.parse(localStorage.getItem('show'));
    myData.push(rowData);
    localStorage.setItem('show', JSON.stringify(myData));
    createAccount(name, '123');
    showData();
    /* Displaying Results */
}

function showData(){
    if(localStorage.getItem('show') != null){
        let data = JSON.parse(localStorage.getItem('show'));
        document.querySelector('table tbody').innerHTML = '';
        data.forEach(rowData => {
            let row = document.createElement('tr');
            rowData.forEach(item => {
                let tData = document.createElement('td');
                tData.innerText = item;
                row.appendChild(tData);
            });
            document.querySelector('table tbody').appendChild(row);
        });
    }
}

function clearEmployees(){
    localStorage.clear(); 
    localStorage.setItem('show', JSON.stringify([])); 
    localStorage.setItem('accounts', JSON.stringify([{name: 'Admin', password: '12345'}]));
    showData();
}

showData();

/*
let show = [
    `
    <td>Ali</td>
    <td>5000</td>
    <td>500</td>
    <td>200</td>
    <td>7</td>
    <td>20</td>
    <td>140</td>
    <td>6000</td>
    <td>20%</td>
    <td>560</td>
    <td>4000</td>
    `,
    `
    <td>Ali</td>
    <td>5000</td>
    <td>500</td>
    <td>200</td>
    <td>7</td>
    <td>20</td>
    <td>140</td>
    <td>6000</td>
    <td>20%</td>
    <td>560</td>
    <td>4000</td>
    `,
    `
    <td>Ali</td>
    <td>5000</td>
    <td>500</td>
    <td>200</td>
    <td>7</td>
    <td>20</td>
    <td>140</td>
    <td>6000</td>
    <td>20%</td>
    <td>560</td>
    <td>4000</td>
    `,
].join('-');
localStorage.setItem('show', show);
*/