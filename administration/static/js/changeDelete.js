document.addEventListener('DOMContentLoaded', function(){
    console.log('changeDelete is working')
    let changeUserAdmin = document.getElementsByClassName('changeAdmin')
    console.log(changeUserAdmin)
    for(let change of changeUserAdmin){
        change.addEventListener('click', function(){
            console.log('change is working')
            let  adminTd = this.previousSibling
            adminTd.textContent = ''
        })
    }
})