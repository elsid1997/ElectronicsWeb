document.addEventListener('DOMContentLoaded', function(){
    console.log('sendPosts.js')

    function sendPosts(event){

        event.preventDefault();
        const formData = new FormData(event.target)

        // Используем интерфейс Fetch api
        obj = fetch('http://127.0.0.1:5000/auth/products_valid',{method:'POST',body:formData})
        obj.then(res=>res.json()).then(data=>{
            if(data.error){
                for (let key in data.error){
                    let er = document.getElementById(key+'_error')
                    er.innerText = data.error[key]
                     er.style.display='block '
                };
            }else if(data.success){
                let p = document.getElementById('success')
                p.innerText = data.success
                p.style.display = 'flex'
            }
        }).catch(error => console.error('Ошибка:', error));

    }
    window.sendPosts = sendPosts

});