 if(localStorage.getItem('accounts') == null){
    let data = JSON.stringify([{name: 'Admin', password: '12345'}]);
    localStorage.setItem('accounts', data);
}

document.querySelector('.btn-login').addEventListener('click', login);

function login(){
    if(document.querySelector('form p.alert')){
        document.querySelector('form p.alert').remove();
    }
    let name = document.getElementById('name').value;
    let password = document.getElementById('password').value;
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    
    let found = false;
    
    accounts.forEach(acc => {
        if(acc.name == name && acc.password == password){
            found = true;
            localStorage.setItem('loggedInUser', name);
            if(name == 'Admin'){
                window.location.href = 'index.html';
            } else {
                window.location.href = 'profile.html';
            }
        }
    });

    if(!found){
        let err = document.createElement('p');
        err.innerText = 'Invalid Username OR Password';
        err.classList.add('alert', 'alert-danger', 'mt-3');
        document.querySelector('form').appendChild(err);
    }
}
console.log(JSON.parse(localStorage.getItem('accounts')));