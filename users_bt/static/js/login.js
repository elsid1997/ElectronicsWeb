$(document).ready(function(){

if(flash_message){
$('#flash').css({
'display':'flex'
}).text(flash_message)
}

$('#login-form').submit(function(event){
event.preventDefault();

var formData = $(this).serialize()

$.ajax({
type:'POST',
url:'/auth/login',
data:formData,
success:function(data){
if (data.status == 'success'){
if (next_url != 'None'){
window.location.href=next_url
}else{
window.location.href='/auth/profile'
};
}else if(data.status == 'error'){
console.log(data.message)
 $('#flash').css({'display':'flex'}).text(data.message)
}},
error:function(error){
console.log(error)
}
})

})
})