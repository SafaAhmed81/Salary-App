function totalMonthlyHours(dailyWorkingHours, weeklyDays, monthlyWeeks){
    let monthlyHours = dailyWorkingHours * weeklyDays * monthlyWeeks;
    return monthlyHours;
}

function hourlyRate(salary, totalMonthlyHours){
    let hourRate = salary / totalMonthlyHours;
    return hourRate;
}

function extraValue(extraHours, hourlyRate, jobTitle){
    let e;
    switch(jobTitle){
        case 'Operator':
            e = extraHours * hourlyRate;
            break;
        case 'Salesman':
            e = extraHours * hourlyRate * 1.5;
            break;
        case 'Admin':
            e = extraHours * hourlyRate * 2;
            break;
        default:
            e = 0;
            break;
    }
    return e;
}

function grossSalary(basicSalary, bonus, penalties, extra){
    let gross = parseFloat(basicSalary) + parseFloat(bonus) - penalties + extra;
    return gross;
}

function taxValue(gross, taxRate){
    let taxes = gross * taxRate;
    return taxes;
}

function netSalary(gross, taxes){
    return gross - taxes;
}

async function getCurrencyRate(crncy){
    let apiKey = '8e16d6ee9fcc36ea3920a01a';
    let apiCurrency = crncy;
    let apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${apiCurrency}`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    let finalResult = await data.conversion_rates.EGP;
    return finalResult;
}


function convertNumbers(nums = [], rate){
    let results = nums.map(num => (num * rate).toFixed(2));
    return results;
}

function createAccount(name, password = '123'){    
    if(localStorage.getItem('accounts') == null){
        let data = JSON.stringify([{name: 'Admin', password: '12345'}]);
        localStorage.setItem('accounts', data);
    }
    let newEmployee = {
        name: name, 
        password: password,
    };
    let currentAccounts = JSON.parse(localStorage.getItem('accounts'));
    currentAccounts.push(newEmployee);
    // localStorage.removeItem('accounts')
    localStorage.setItem('accounts', JSON.stringify(currentAccounts));    
    /* Sample */
    /*
    [
        {name: 'Ali', password: '123'},
        {name: 'Hany', password: '123'},
        {name: 'Adel', password: '123'}
    ]
    */
    //console.log(localStorage.getItem('accounts'));
}

/* To test the API function */
/* 
async function getNumbers(){
    let result = await getCurrencyRate();
    console.log(result);
}

getNumbers();
*/
// Default Employee for testing


let accounts = JSON.parse(localStorage.getItem('accounts'));
if(!accounts.find(acc => acc.name == 'safa')){
    accounts.push({name: 'safa', password: '123'});
    localStorage.setItem('accounts', JSON.stringify(accounts));
}