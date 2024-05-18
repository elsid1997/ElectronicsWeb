function displayMessage(){
    let div = document.createElement('div');
    div.style.borderRadius = '5px';
    div.style.position = 'absolute';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    return div
}

function errorResponse(error){

    let p = document.createElement('p');
    p.innerText = error;
    p.style.fontSize = '20px';
    p.style.fontWeight = 'bold';
    p.style.margin = '10px';
    let div = displayMessage();
    div.style.backgroundColor = '#fff';
    div.style.border = '5px double red';
    div.appendChild(p);

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
    let div = displayMessage();
    div.style.border = '5px solid rgb(14,89,187)';
    div.style.backgroundColor = 'green';
    div.appendChild(p);

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
