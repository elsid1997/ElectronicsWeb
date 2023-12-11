$(document).ready(function(){
$('body').on('click','#password-checkbox',function(){
if($(this).is(':checked')){
$('#psw1,#psw2').attr('type','text');
}else{
$('#psw1,#psw2').attr('type','password');
};
});
console.log('js function is working')
$('.form-register').submit(function(event){
console.log('function submit is warking')
event.preventDefault();
var formData = $(this).serialize()
//console.log(formData)

$.ajax({
type:'POST',
url:'/auth/registration',
data:formData,
//contentType: 'application/json',  // Установите Content-Type
success:function(data){

if (data.status == 'error' && document.getElementById('flash') == null){

let div = document.createElement('div')
div.innerText=data.message
div.id='flash'
document.querySelector('.div-form').insertBefore(div,document.querySelector('.form-register'))

}else if (data['form_error']){
for(var key in data['form_error']){
let er = document.getElementById(key+'_error')
er.innerText = data['form_error'][key]
er.style.display='block'
}
}else if (data.status == 'success'){

window.location.href='/auth/profile'
};
},
error:function(error){
console.log(error.responseText)
}
})
})
})