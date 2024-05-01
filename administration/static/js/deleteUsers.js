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
    console.log(formData)

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
        return response.json()
    }).then(data => {
        console.log(data)
    })
}
