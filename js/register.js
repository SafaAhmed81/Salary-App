document.querySelector('.btn-register').addEventListener('click', register);

function register(){
    document.querySelectorAll('form p.alert').forEach(el => el.remove());

    let name = document.getElementById('name').value.trim();
    let password = document.getElementById('password').value.trim();
    let confirmPassword = document.getElementById('confirmPassword').value.trim();

    if(name == '' || password == '' || confirmPassword == ''){
        showAlert('Please fill all fields', 'danger');
        return;
    }

    if(password !== confirmPassword){
        showAlert('Passwords do not match', 'danger');
        return;
    }

    if(localStorage.getItem('accounts') == null){
        localStorage.setItem('accounts', JSON.stringify([{name: 'Admin', password: '12345'}]));
    }

    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let exists = accounts.find(acc => acc.name == name);

    if(exists){
        showAlert('This name is already taken', 'danger');
        return;
    }

    accounts.push({name: name, password: password});
    localStorage.setItem('accounts', JSON.stringify(accounts));

    showAlert('Account created! Redirecting...', 'success');

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

function showAlert(msg, type){
    document.querySelectorAll('form p.alert').forEach(el => el.remove());
    let err = document.createElement('p');
    err.innerText = msg;
    err.classList.add('alert', 'alert-' + type, 'mt-3');
    document.querySelector('form').appendChild(err);
}