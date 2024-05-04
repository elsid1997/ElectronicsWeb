console.log('deleteUsers.js is working')


export function sendChangedDataUser(){
    const row = this.closest('tr');
    const inputs = row.querySelectorAll('input[type="text"],input[type="radio"]');

    const formData = {
        name : inputs[0].value,
        surname : inputs[1].value,
        email: inputs[2].value,
        administrator: inputs[3].checked ,
    };

    const url = window.location.href + 'change'

    console.log(url)

    const requestOptions = {
        method : 'PUT',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(formData)
    }

    fetch(url, requestOptions).then(response => {
        if (!response.ok) {
            return response.json().then(error=>{
                throw new Error(JSON.stringify(error));
            })
        }
        return response.json()
    }).then(data => {
        console.log(data)
    }).catch(error =>{
        window.alert = function (error, timeout=null) {
            const alert  = document.createElement('div')
            alert.setAttribute('style',`
                position: fixed;
                background-color: #fff;
                border: 1px solid black;
                border-radius: 10px;
                z-index: 4;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 350px;
                height: 200px;
            `)
            const h3 = document.createElement('h3');
            h3.innerText = 'Данные введены некорректно';
            h3.setAttribute('style', `
                text-align: center;
                background-color: red;
                border-radius: 10px 10px 0 0;
                color: #fff;
                padding: 5px;
                margin-bottom: 10px;
            `);

            const errorMessage = document.createElement('p');
            errorMessage.innerText = error;

            alert.appendChild(h3)
            alert.appendChild(errorMessage);

            document.body.appendChild(alert)
        }
        alert(error)
    })
}
