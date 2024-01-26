document.addEventListener('DOMContentLoaded', function(){
    console.log('profileAva.js')
    // Ассинхронный запрос для обновления фото профиля
//    xhr = new XMLHttpRequest()
//    console.log(xhr)
    let examPromise = new Promise(function(resolve,reject){
        setTimeout(() => resolve('done'),5000)
    })
    console.log(examPromise)
    examPromise.then(result => alert(result))

    setTimeout(console.log('hello'),3000)
});