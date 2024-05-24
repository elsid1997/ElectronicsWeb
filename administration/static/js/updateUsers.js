import {changeDataUser,oldRow} from './change.js'

console.log('updateUsers.js is working')

export async function sendChangedDataUser(){
    try{
        const row = this.closest('tr');
        const inputs = row.querySelectorAll('input[type="text"],input[type="radio"]');

        const formData = {
            name : inputs[0].value,
            surname : inputs[1].value,
            oldEmail : JSON.parse(localStorage.getItem('userData'))[row.id].email,
            email: inputs[2].value,
            admin: inputs[3].checked ,
        };

        let url = window.location.href
        if (url.indexOf('#') != -1){
            url = url.split('#')[0] + 'change'
        }else{
            console.log(url.indexOf('#'))
            url += 'change'
        }
        console.log(url)

        const requestOptions = {
            method : 'PUT',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(formData)
        }

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            console.log('response is working')
            const error = await response.json()
            throw new Error(JSON.stringify(error));
        }else{
            const data = await response.json()
            oldRow(data,row.id)
        }

   }catch (error){  handleFetchError(error) };
}

function handleFetchError(error){
    const messageError = JSON.parse(error.message);
    displayError(messageError);
}

function displayError(messageError){
    const alert = createErrorAlert()
    const h3 = document.createElement('h3');
    h3.innerText = 'Данные введены некорректно';
    h3.setAttribute('style', `
        text-align: center;
        background-color: red;
        border-radius: 10px 10px 0 0;
        width: 100%;
        color: #fff;
        padding: 5px;
        margin-bottom: 10px;
        box-sizing: border-box;
    `);
    alert.appendChild(h3)

    for(let key in messageError){
        const errorMessage = document.createElement('p');
        errorMessage.innerText = messageError[key][0];
        errorMessage.setAttribute('style', `
            text-align: center;
            font-size: 18px;
            margin: 5px;
        `)
        alert.appendChild(errorMessage);
    };

    const btn = createButton(alert);

    alert.appendChild(btn);
    document.body.appendChild(alert)
}

function createErrorAlert(){

    const alert  = document.createElement('div')
    alert.id = 'error-window';
    alert.setAttribute('style',`
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        border: 1px solid black;
        border-radius: 10px;
        z-index: 4;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        min-width: 350px;
        min-height: 100px;
    `)
    return alert
}

function createButton(alert){

    const btn = document.createElement('button')
    btn.textContent = 'Понятно'
    btn.setAttribute('style',`
        border: none;
        background-color: rgb(14,89,187);
        color: #fff;
        font-size: 20px;
        width: 100px;
        border-radius: 5px;
        padding:  5px;
        margin: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    `)
    btn.addEventListener('mouseover',()=> btn.style.backgroundColor = 'rgb(46, 83, 163)')
    btn.addEventListener('mouseout',()=> btn.style.backgroundColor = 'rgb(14,89,187)')
    btn.addEventListener('click',()=> alert.remove())
    return btn
}
