import {changeDataUser} from './change.js';
import {deleteUser} from './delete.js';

console.log('pagination.js is working')

function changePage(pageNumber) {
    console.log('changePage is working')

    let tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    let users = JSON.parse(localStorage.getItem('userData'));
    let backPage = document.querySelector('.back-page');
    let nextPage = document.querySelector('.next-page');

    let currentPage = pageNumber;
    let prevPage = currentPage - 1;
    let nextPageNum = currentPage + 1;
    let startIndex = (currentPage - 1) * 10;
    let endIndex = currentPage * 10;
    createRows(tableBody, users.slice(startIndex, endIndex),currentPage);
}

function createRows(tableBody, res, currentPage=1){
    if(!res || !Array.isArray(res)){
        console.error('Invalid input data');
        return;
    }

    const fragment = document.createDocumentFragment();

    let id;

    if(currentPage == 1){
        id = 0;
    }else{
        id = (currentPage - 1) * 10
    }

    for(const user of res){
        const newRow = document.createElement('tr');
        newRow.id = id

        const cellsData = ['name', 'surname','email', 'admin'];

        for(const data of cellsData){
            const cell = document.createElement('td');
            cell.id = data+id
            if(data == 'admin'){

                if(user[data] == null){

                    user[data] = false
                    console.log(user[data])

                }
                cell.textContent = user[data] == false ? 'No' : 'Yes';
            }else{
                cell.textContent = user[data];
            }
            newRow.appendChild(cell);
        }

        id++

        const changeCell = document.createElement('td');
        changeCell.classList.add('changeUser');
        const imgChange = document.createElement('img');
        imgChange.src = 'static/img/icons/change.png';
        imgChange.alt = 'change';
        imgChange.classList.add('change');
        changeCell.appendChild(imgChange);
        newRow.appendChild(changeCell);
        changeCell.addEventListener('click',changeDataUser)

        const deleteCell = document.createElement('td');
        deleteCell.classList.add('deleteUser');
        const imgDelete = document.createElement('img');
        imgDelete.src = 'static/img/icons/delete.png';
        imgDelete.alt = 'delete';
        imgDelete.classList.add('delete');
        deleteCell.appendChild(imgDelete);
        newRow.appendChild(deleteCell);
        deleteCell.addEventListener('click', deleteUser);

        fragment.appendChild(newRow);
    }

    tableBody.appendChild(fragment)
}

function createPagination(totalRecords){
    console.log('create pagination is working');

    const totalPages = Math.ceil(totalRecords / 10);
    const pagination = document.getElementById('pagination');



    if(!pagination){
        console.error('pagination element not found')
        return;
    }
    pagination.innerHTML= '';

    const handlePageClick = function(){
    const page = parseInt(this.textContent);
        if(!isNaN(page)){
            changePage(page);
        };
     };

    const prevButton = document.createElement('a');
    prevButton.href = '#';
    prevButton.textContent = '<';
    prevButton.classList.add('back-page');
    prevButton.addEventListener('click', function(event){
        event.preventDefault()
        const currentPage = document.querySelector('.active-page');
        if(currentPage != null){
            const pageNumber = +currentPage.textContent
            if(pageNumber != 1){
                currentPage.classList.remove('active-page')
                currentPage.previousSibling.classList.add('active-page')
                changePage(pageNumber - 1);
            }
        }else{
            prevButton.nextElementSibling.classList.add('active-page')
            return;
        }
    })

    pagination.appendChild(prevButton);

    for(let i = 1; i < totalPages + 1; i++){
    const pageButton = document.createElement('a')
    pageButton.href = '#';
    pageButton.textContent = i;
    pageButton.addEventListener('click', function(){
        changePage(parseInt(this.textContent));
    });

    pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement('a');
    nextButton.src = '#';
    nextButton.textContent = '>';
    nextButton.classList.add('next-page');
    nextButton.addEventListener('click', function(event){
        event.preventDefault()
        const currentPage = document.querySelector('.active-page');

        if(currentPage !== null){

            const pageNumber = +currentPage.textContent

            if(pageNumber < totalPages){
                currentPage.classList.remove('active-page')
                currentPage.nextElementSibling.classList.add('active-page')
                changePage(pageNumber + 1)
            }
        }else{
              const nextPageElement = document.querySelector('#pagination a:nth-child(3)');
              nextPageElement.classList.add('active-page')
              changePage(+nextPageElement.textContent)
        }

    });

    pagination.appendChild(nextButton);
};

export function createTableData(){
    console.log('createTableData is working');

    let userDataString = localStorage.getItem('userData');
    if(!userDataString){
        console.error('User data not found in localStorage');
        return;
    }

    let res;

    try{
        res = JSON.parse(userDataString);
    }catch (error){
        console.error('Error parsing user data: ',error);
        return;
    }

    let tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    createRows(tableBody, res.slice(0,10));

    let totalRecords = res.length;
    createPagination(totalRecords);
}


