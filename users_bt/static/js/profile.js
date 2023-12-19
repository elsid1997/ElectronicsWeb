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


