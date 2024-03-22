document.addEventListener('DOMContentLoaded', function (){
    console.log('pagination.js is working')

    function createPagination(totalRecords, recordsPerPage, currentPages){

        console.log('createPagination is working')

        const totalPages = Math.ceil(totalRecords / recordsPerPage);
        const pagination = document.getElementById('pagination')
        pagination.innerHTML = '';

        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.textContent = 'Назад';
        prevButton.classList.add('back-page');
        pagination.appendChild(prevButton);

        for(let i=1; i < totalPages; i++){
            const pageButton = document.createElement('a');
            pageButton.href = '#';
            pageButton.textContent = i;
            if (i === currentPages) {
                pageButton.classList.add('active');
            }
            pagination.appendChild(pageButton);
        };

        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.textContent = 'Вперед';
        nextButton.classList.add('next-page');
        pagination.appendChild(nextButton);
    }

    function createTableRows(res){

        console.log('createTableRows is working')

        let userDataString = localStorage.getItem('userData')

        if(userDataString) {

            let res = JSON.parse(userDataString)

            let tableBody = document.querySelector('tbody')

//            console.log(tableBody.innerHTML.trim())
            if(!tableBody.innerHTML.trim()) {
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

                const totalRecords = res.length;
                const currentPage = 1;
                const recordsPerPage = 20

                createPagination(totalRecords, recordsPerPage, currentPage)
            }

        }
    }

    window.createTableRows = createTableRows
})