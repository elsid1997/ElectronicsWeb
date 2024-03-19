document.addEventListener('DOMContentLoaded',function (){
    console.log('sendAva.js')
    function sendAva(event,form){
        event.preventDefault()
        const formData = new FormData(form)

        let obj = fetch('http://127.0.0.1:5000/auth/userava',{
            method:'POST',
            body:formData,
        })
        obj.then(res=>res.json()).then(data=>{
            if(data.error){
                let p =document.getElementById(Object.keys(data.error)[0]+'_error')
                p.style.display = 'inline-block'
                p.innerText = data.error.file[0]
            }else{
                if(!document.getElementById('photo-success')){
                    let p = document.createElement('p')
                    p.innerText = data.success
                    p.id = 'photo-success'
                    p.style.margin = '10px 10px'
                    p.style.backgroundColor = '#00CC66'
                    p.style.fontSize = '20px'
                    p.style.borderRadius = '5px'
                    p.style.display = 'inline-block'
                    p.style.color = '#fff'
                    p.style.padding = '5px'

                    form.appendChild(p)
                }
            }
        })
    }
    window.sendAva = sendAva
})