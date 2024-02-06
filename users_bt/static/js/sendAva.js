document.addEventListener('DOMContentLoaded',function (){
    console.log('sendAva.js')
    function sendAva(event,form){
        event.preventDefault()
        const formData = new FormData(form)

        obj = fetch('http://127.0.0.1:5000/auth/userava')
        console.log(obj )
    }
    window.sendAva = sendAva
})