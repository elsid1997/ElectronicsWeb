//import { createPagination } from './pagination.js';

console.log('users js is working');

document.addEventListener('DOMContentLoaded',function(){
    function getUser(){
        console.log('getUser is working');
        const currentUrl = window.location.href;
//        console.log(currentUrl)
        let obj = fetch(currentUrl+'get_users')
        obj.then(res=> {
            if(!res.ok){
                throw new Error('Network response was not ok')
            }
            return res.json()
        }).then(res => {
            if (!res){
                console.log('not result');
                let tableData = document.getElementById('tabel-data');
                let divNoResult = document.createElement('div');
                divNoResult.textContent = 'Пока что нет пользователей';
                divNoResult.style.fontSize = '20px';
                divNoResult.style.margin = '10px';
                tableData.insertAdjacentElement('afterend', divNoResult);
            }else{
//                for(i=0; i < res.length; i++){
//                    res[i]['id'] = i
//                };
//                console.log(res)
                localStorage.setItem('userData', JSON.stringify(res))
                createTableData()
            }
        })
//        .catch( error=>{
//                console.log('there was a problem with the fetch operation: ',error);
//        })
    };

    function checkUserData(){
        console.log('checkUserData is working')
        if(!localStorage.getItem('userData')){
            getUser()
        }else{
            createTableData()
        }
    }
    checkUserData()
    window.checkUserData = checkUserData;
})
