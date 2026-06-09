 if(!localStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser') == ''){
    window.location.href = 'login.html';    
}

let name = localStorage.getItem('loggedInUser');
document.getElementById('profileName').innerText = name;

function showPhotoMode(){
    document.getElementById('uploadBtn').style.display = 'none';
    document.getElementById('profileCard').classList.remove('text-center');
    document.getElementById('profileCard').style.maxWidth = '500px';
    document.getElementById('profileCard').classList.add('d-flex', 'align-items-center', 'gap-4');
    document.getElementById('imgWrapper').classList.remove('mb-3');
}

// لو الصورة محفوظة من قبل
let savedImg = localStorage.getItem('profileImg_' + name);
if(savedImg){
    document.getElementById('profileImg').src = savedImg;
    showPhotoMode();
}

// رفع صورة جديدة
document.getElementById('uploadImg').addEventListener('change', function(){
    let file = this.files[0];
    if(!file) return;
    let reader = new FileReader();
    reader.onload = function(e){
        let base64 = e.target.result;
        localStorage.setItem('profileImg_' + name, base64);
        document.getElementById('profileImg').src = base64;
        showPhotoMode();
    }
    reader.readAsDataURL(file);
});

// عرض الرواتب
let data = JSON.parse(localStorage.getItem('show'));
if(data){
    let monthCounter = 1;
    data.forEach(emp => {
        if(emp[0] == name){
            let row = document.createElement('tr');
            let monthTd = document.createElement('td');
            monthTd.innerText = 'Month ' + monthCounter;
            row.appendChild(monthTd);
            monthCounter++;
            emp.forEach(item => {
                let tData = document.createElement('td');
                tData.innerText = item;
                row.appendChild(tData);
            });
            document.querySelector('table tbody').appendChild(row);
        }
    });
}