import {createTableData} from './pagination.js'

function deleteDataUser(email){
    let users = JSON.parse(localStorage.getItem('userData'));
    let index = users.findIndex(user => user.email ==  email);
    users.splice(index,1);
    console.log(users);
    localStorage.setItem('userData',JSON.stringify(users));
    let tr = document.getElementById(index);
    createTableData();
}

function displayMessage(){
    let div = document.createElement('div');
    div.style.borderRadius = '5px';
    div.id = 'display-message';
    div.style.position = 'absolute';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    return div
}

function close(){
    let btn = document.createElement('button')
    btn.style.width = '30px';
    btn.style.border = 'none';
    btn.style.height = '30px';
    btn.style.borderRadius = '50%';
    btn.style.position = 'absolute';
    btn.style.top = '0';
    btn.style.right = '0';
    btn.style.transform = 'translate(97%, -97%)';
    btn.style.backgroundColor = 'grey';
    btn.style.cursor = 'pointer';
    let line1 = document.createElement('div');
    line1.style.height = '2px';
    line1.style.width = '25px';
    line1.style.backgroundColor = 'black';
    line1.style.position = 'absolute';
    line1.style.top = '50%';
    line1.style.left = '50%';
    line1.style.transform = 'translate(-50%, -50%) rotate(45deg)';
    btn.appendChild(line1);
    let line2 = document.createElement('div');
    line2.style.height = '2px';
    line2.style.width = '25px';
    line2.style.backgroundColor = 'black';
    line2.style.position = 'absolute';
    line2.style.top = '50%';
    line2.style.left = '50%';
    line2.style.transform = 'translate(-50%, -50%) rotate(-45deg)';
    btn.appendChild(line2);

    btn.addEventListener('click',(event)=>{
        let div = document.getElementById('display-message');
        div.remove()
    })
    return btn
}

function errorResponse(error){
    let p = document.createElement('p');
    p.innerText = error;
    p.style.fontSize = '20px';
    p.style.fontWeight = 'bold';
    p.style.margin = '10px';

    let btn = close()

    let div = document.querySelector('#display-message')
    if( div == null){
        div = displayMessage();
    }else{
        div.innerHTML = '';
    }
    div.style.backgroundColor = '#fff';
    div.style.border = '5px double red';
    div.appendChild(p);
    div.appendChild(btn)

    let main = document.querySelector('main');
    main.appendChild(div)

}

function deletedSuccessFully(successFully){
    let p = document.createElement('p');
    p.innerText = successFully;
    p.style.fontSize = '20px';
    p.style.fontWeight = 'bold';
    p.style.margin = '10px';
    p.style.color = '#fff';
    let btn = close()
    let div = document.querySelector('#display-message')
    if( div == null){
        div = displayMessage();
    }else{
        div.innerHTML = '';
    }
    div.style.border = '5px solid rgb(14,89,187)';
    div.style.backgroundColor = 'green';
    div.appendChild(p);
    div.appendChild(btn);
    let main = document.querySelector('main');
    main.appendChild(div)

}

async function deleteUserQuery(email){
    console.log('deleteUserQuery is working');
    console.log(email)
    let url = window.location.href
    if (url.indexOf('#') != -1){
        url = url.split('#')[0] + 'delete'
    }else{
        console.log(url.indexOf('#'))
        url += 'delete'
    }
    console.log(url)
    console.log(url)
    const requestOptions = {
        method : 'DELETE',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(email)
    }
    try{
    console.log(requestOptions.body)
        const response = await fetch(url, requestOptions);
        const answerServer = await response.json()
        if(!response.ok){
            if(response.status == 400){
                throw new Error(answerServer.error)
            }else if(response.status == 404){
                throw new Error(answerServer.error)
            }
        }
        else{
            deletedSuccessFully(answerServer.message)
            deleteDataUser(email)
        }
    }catch(error){
        errorResponse(error.message)
    }
}

export function deleteUser(){
    console.log('deleteUser is working');
    let tr = this.parentNode.querySelectorAll('td');
    let email = 'email';
    for(let td of tr){
        if (td.id.indexOf(email) != -1){
            email = td.innerText
            deleteUserQuery(email)
            break;
        }
    }
}
