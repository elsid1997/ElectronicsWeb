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
            throw new Error(`Ошибка при выполнении запроса: ${response.status} ${response.statusText} ${answerServer.error}`)
        }
        else{
            console.log(answerServer.message)
        }
    }catch(error){
        console.log(error.message)
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
