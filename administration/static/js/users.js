import {createTableData} from './pagination.js';

console.log('users js is working');

export function getUser() {
    console.log('getUser is working')
    const currentUrl = window.location.origin
    fetch(currentUrl + '/administration/get_users').then(res => {
        return res.json()
    }).then(res => {
        console.log(res)

        if (!res) {
            console.log('No result');
            let tableData = document.getElementById('table-data');
            let divNoResult = document.createElement('div');
            divNoResult.textContent = 'Пока что нет пользователей';
            divNoResult.style.fontSize = '20px';
            divNoResult.style.margin = '10px';
            tableData.insertAdjacentElement('afterend', divNoResult);
        }else{
            localStorage.setItem('userData',JSON.stringify(res));
            createTableData()
        }
    }).catch(error =>{
                console.error('there was a problem with the fetch operation: ', error);
            })
}

function checkUserData() {
    console.log('checkUserData is working');
    const userData = localStorage.getItem('userData');
    if (userData) {
        createTableData(JSON.parse(userData))
    }else{
        getUser()
    }
}
checkUserData()
