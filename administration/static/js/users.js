console.log('users js is working');
document.addEventListener('DOMContentLoaded',function(){
    function getUser(){
        console.log('getUser is working');
        const currentUrl = window.location.href;
        console.log(currentUrl)
        let obj = fetch(currentUrl+'get_users')
        obj.then(res=> res.json()).then(res => {
            console.log(res)
            let tableBody = document.querySelector('tbody')
            console.log(tableBody)
            for(i=0;i< res.length;i++){
                let newRow = tableBody.insertRow();

                let cel1 = newRow.insertCell(-1);
                cel1.textContent = res[i].name

                let cel2 = newRow.insertCell(-1);
                cel2.textContent = res[i].surname

                let cel3 = newRow.insertCell(-1);
                cel3.textContent = res[i].email

                let cel4 = newRow.insertCell(-1);
                cel4.textContent = res[i].admin

                let cel5 = newRow.insertCell(-1);
                let imgChange = document.createElement('img');
                imgChange.src = "static/img/icons/change.png";
                imgChange.alt = 'change';
                imgChange.classList.add('change');
                cel5.appendChild(imgChange);

                let cel6 = newRow.insertCell(-1);
                let imgDelete = document.createElement('img');
                imgDelete.src = "static/img/icons/delete.png";
                imgDelete.alt = 'delete';
                imgDelete.classList.add('delete')
                cel6.appendChild(imgDelete)
            }
        })
    };
    getUser()
    window.getUser = getUser;
})
