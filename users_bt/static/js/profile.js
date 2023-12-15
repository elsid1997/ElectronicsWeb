$(document).ready(function(){
$('.input-file input[type=file]').on('change', function(){
	let file = this.files[0];
	$(this).closest('.input-file').find('.input-file-text').html(file.name);
});

let btnChange =document.getElementById('btn-change')

btnChange.addEventListener('click',function(event){

event.target.style.display = 'none'

let userParagraph = document.getElementsByClassName('user-p')
for (let p of userParagraph){
p.style.display = 'none'
}

let btnLogOut = document.getElementById('log-out')
btnLogOut.style.display = 'none'

let form = document.getElementById('change-form')

if ( form == null){

form = document.createElement('form');
form.method='post';
form.id = 'change-form'

let inputName = document.createElement('input');
inputName.placeholder = 'Введите имя:'
inputName.type = 'text';
inputName.name = 'name';
inputName.id = 'name';
form.appendChild(inputName);

let inputSurname = document.createElement('input')
inputSurname.placeholder = 'Введите фамилие:'
inputSurname.type = 'text'
inputSurname.name = 'surname'
inputSurname.id = 'surname'
form.appendChild(inputSurname)

let inputAge = document.createElement('input')
inputAge.placeholder = 'Введите возраст:'
inputAge.type = 'number'
inputAge.max = 100
inputAge.min = 18
inputAge.required = true
form.appendChild(inputAge)

let inputEmail = document.createElement('input')
inputEmail.placeholder = 'Введите Email:'
inputEmail.type = 'text'
inputEmail.name = 'email'
inputEmail.id = 'email'
form.appendChild(inputEmail)

let inputPassword = document.createElement('input')
inputPassword.placeholder = 'Введите пароль:'
inputPassword.type = 'password'
inputPassword.name = 'psw1'
inputPassword.id = 'psw1'
form.appendChild(inputPassword)

let inputCheck = document.createElement('input')
inputCheck.placeholder = 'Повторите пароль:'
inputCheck.type = 'password'
inputCheck.name = 'psw2'
inputCheck.id = 'psw2'
form.appendChild(inputCheck)


let submitButton = document.createElement('input');
submitButton.className = 'btn-submit';
submitButton.type='submit';
submitButton.value='Отправить';
form.appendChild(submitButton)

let container = document.getElementById('container')
container.appendChild(form)

}else{ form.style.display = 'flex'};//end if change-form

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
form.style.display = 'none'
for (let p of userParagraph){
    p.style.display = 'block'
};})

})
})


