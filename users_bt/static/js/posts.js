function sendPosts(event){
event.preventDefault();

console.log('function exam is working')

let url = '/auth/products_valid';

let form = event.target;

let formData = new FormData(form);

console.log('files',formData.get('photo'))
console.log(formData)

'вы не должны устанавливать заголовок'
'Content-Type вручную, поскольку браузер автоматически устанавливает правильное значение для данных FormData.'

//let urlParams = new URLSearchParams(formData).toString();

//console.log(urlParams)

let xhr = new XMLHttpRequest();

console.log(xhr)

xhr.open('POST', url, true);

//xhr.setRequestHeader('Content-type', 'multipart/form-data');

function handleSuccess(response){
    if(response.success){
        console.log(response.success)
        let p = document.getElementById('success')
        p.innerText = response.success
        p.style.display = 'flex'

    }else if(response.error){
         for (let key in response.error){
            let er = document.getElementById(key+'_error')
            er.innerText = response.error[key]
             er.style.display='block '
        };
    };
};



xhr.onreadystatechange = function (){
    if (xhr.readyState == 4){
        console.log(xhr.readyState)
        if(xhr.status == 200){
            console.log(xhr.status)
            console.log(JSON.parse(xhr.responseText))
            handleSuccess(JSON.parse(xhr.responseText))
        };
    };
};

xhr.send(formData);
};