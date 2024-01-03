/* создаем функцию для выбора фотографии через option*/
let optionSelect = document.querySelectorAll('#options-select option');
console.log(optionSelect)
function changeImage(event){
    let indexOption = event.target.selectedIndex;
    let urlImage = optionSelect[indexOption].value;
    let photo = document.querySelector('#select-photo');
    console.log(photo)
    photo.src = urlImage;
};
$(document).ready(function(){
console.log('profile.js')
let inputFile = document.querySelectorAll('.input-file input[type=file]');

/* функция для изменения тектса в нутри выбранных файлов */
function changeText(event){
    let inputTarget = event.target;
    let fileInput = inputTarget.files;



    let textFile =inputTarget.previousElementSibling;

    let divImage = document.getElementsByClassName('photos')[0]
    let imageElementPhotos = document.getElementById('select-photo')
    let imageElementProfile = document.getElementById('photo-profile')

    if(fileInput.length > 5){
//        let buttonImage = document.querySelector('#multiple-files')
        textFile.style.backgroundColor ='red'
        textFile.innerText = 'Максимум 5 файлов'
    }else if(inputTarget.multiple == true && inputTarget.files.length > 0){
        textFile.style.backgroundColor = 'rgb(14,89,187)'
        imageElementPhotos.src = URL.createObjectURL(inputTarget.files[0])
        textFile.innerText = `Выбрано ${fileInput.length}`;
        let selectPhoto = document.getElementById('options-select');
        for(let i=1;i<fileInput.length+1;i++){
           optionSelect[i].innerText = "Фото "+i;
           optionSelect[i].value = URL.createObjectURL(inputTarget.files[i-1]);
           optionSelect[i].style.display='inline'
        };

    }else if(inputTarget.multiple == false){
        imageElementProfile.src = URL.createObjectURL(inputTarget.files[0])
        textFile.innerText = fileInput[0].name;
    };
};

for (let i of inputFile){
    i.addEventListener('change',changeText);
};


let btnChange =document.getElementById('btn-change')

btnChange.addEventListener('click',function(event){

event.target.style.display = 'none'

let userParagraph = document.getElementsByClassName('user-p')
for (let p of userParagraph){
p.style.display = 'none'
}

let btnLogOut = document.getElementById('log-out')
btnLogOut.style.display = 'none'


let divForm = document.getElementsByClassName('div-form')[0]

let divDisplay = window.getComputedStyle(divForm).display

if (divDisplay == 'none'){
divForm.style.display = 'flex';
}else{
divForm.style.display = 'none';
}

let passwordCheckbox = document.getElementById('password-checkbox')
passwordCheckbox.addEventListener('click',function(event){
 let passwordInputs = document.querySelectorAll('#psw1,#psw2');
    if (passwordCheckbox.checked){
        passwordInputs.forEach(function(input){
            input.type='text';
        })
    }else{
        passwordInputs.forEach(function(input){
            input.type='password'
        })
    }
})


let profileDiv = document.getElementById('profile-div')

let btnClose = document.getElementById('button-close')

if(btnClose == null){
btnClose = document.createElement('button')
btnClose.type='button'
btnClose.id = 'button-close'
btnClose.innerText = 'Отменить'
btnClose.style.border = 'none'
btnClose.style.background = 'none'
btnClose.style.textDecoration = 'underline'
btnClose.style.margin = '10px 0 10px 0'
btnClose.style.fontSize = '16px'
btnClose.style.color = 'red'
profileDiv.appendChild(btnClose)
}else{btnClose.style.display = 'inline-block'};

btnClose.addEventListener('click',function(){
btnLogOut.style.display = 'inline-block'
btnChange.style.display = 'inline-block'
btnClose.style.display = 'none'
divForm.style.display = 'none'
for (let p of userParagraph){
    p.style.display = 'block'
};})
})
})


// sozdanie ajax zaprosa na js

function sendPullRequest(event,form){

event.preventDefault()

let url = '/auth/profile';

let formData = new FormData(form)

let urlParams = new URLSearchParams(formData).toString();

console.log(urlParams)

let xhr = new XMLHttpRequest();

xhr.open('PUT', url, true);

xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//esli zapros k serveru uspeshen
function handleSuccess (response){
    console.log('PUT-запрос выполнен успешно')
    if (response.success){
        let userParagraph = document.querySelectorAll('.user-p')
        for(let p of userParagraph){
            let span = p.querySelector('span');
            let i = span.textContent.indexOf(':')
            let resString =  span.textContent.slice(0,i+2)
            p.querySelector('span').textContent = resString + response.success[p.id.slice(0,-5)]
            p.style.display = 'block'
        };
        let divForm = document.getElementsByClassName('div-form')[0]
        divForm.style.display = 'none'

        let btnClose = document.getElementById('button-close')
        btnClose.style.display = 'none'

        let btnChange = document.getElementById('btn-change')
        btnChange.style.display = 'inline-block'

        let btnLogOut = document.getElementById('log-out')
        btnLogOut.style.display = 'inline-block'
    }else if (response.errors){
         for (let key in response.errors){
        let er = document.getElementById(key+'_error')
        er.innerText = response.errors[key]
        er.style.display='block'
        };
    }else if(response.error_email){
        let div = document.getElementById('flash')
        if(div == undefined){
            let div = document.createElement('div')
            div.innerText=response.error_email
            div.id='flash'
            document.querySelector('.div-form').insertBefore(div,document.querySelector('.form-register'))
        };
    };
};

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    // Проверка успешности запроса
    if (xhr.status === 200) {
      // Обработка успешного ответа
      handleSuccess(JSON.parse(xhr.responseText));
    } else {
      // Обработка ошибки
      console.error('Ошибка выполнения PUT-запроса');
      console.error('Статус:', xhr.status);
    }
  }
};

xhr.send(urlParams)
};//end sendPullRequest
