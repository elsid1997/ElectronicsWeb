function sendPosts(event){
event.preventDefault();

console.log('function exam is working')

let url = '/auth/products_valid';

let form = event.target;

let formData = new FormData(form);

console.log(formData)

let urlParams = new URLSearchParams(formData).toString();

console.log(urlParams)

let xhr = new XMLHttpRequest();

console.log(xhr)

xhr.open('POST', url, true);

xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

xhr.onreadystatechange = function (){
    if (xhr.readyState == 4){
        console.log(xhr.readyState)
        if(xhr.status == 200){
            console.log(xhr.status)
            console.log(JSON.parse(xhr.responseText))
        };
    };
};

xhr.send(urlParams)
};