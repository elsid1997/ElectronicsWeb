console.log('deleteUsers.js is working')
export function sendChangedDataUser(){
    const row = this.closest('tr');
    const inputs = row.querySelectorAll('input[type="text"],input[type="radio"]');
    console.log(inputs.length)
    const formData ={}
    if (inputs.length == 5){

    }
    const formData = {
        name : inputs[0].value,
        surname : inputs[1].value,
        email: inputs[2].value,
        administrator: inputs[3].checked ,
    };
    console.log(formData)
    inputs.forEach(input => {
        let value;

        if(input.type === 'radio'){
            if(input.checked){
                value = input.value
            }
        }else {
            value = input.value;
            console.log(value)
        }
    })
}
