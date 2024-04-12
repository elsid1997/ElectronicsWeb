document.addEventListener('DOMContentLoaded',function(){
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
        createRows(tableBody, users.slice(startIndex, endIndex));
    }

    function createRows(tableBody, res){
        if(!res || !Array.isArray(res)){
            console.error('Invalid input data');
            return;
        }

        const fragment = document.createDocumentFragment();

        for(const user of res){
            const newRow = document.createElement('tr');

            const cellsData = ['name', 'surname','email', 'admin'];

            for(const data of cellsData){
                const cell = document.createElement('td');
                cell.textContent = user[data];
                newRow.appendChild(cell);
            }

            const changeCell = document.createElement('td');
            changeCell.classList.add('changeAdmin');
            const imgChange = document.createElement('img');
            imgChange.src = 'static/img/icons/change.png';
            imgChange.alt = 'change';
            imgChange.classList.add('change');
            changeCell.appendChild(imgChange);
            newRow.appendChild(changeCell);

            const deleteCell = document.createElement('td');
            deleteCell.classList.add('deleteAdmin');
            const imgDelete = document.createElement('img');
            imgDelete.src = 'static/img/icons/delete.png';
            imgDelete.alt = 'delete';
            imgDelete.classList.add('delete');
            deleteCell.appendChild(imgDelete);
            newRow.appendChild(deleteCell);

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

    function createTableData(){
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
        if(!tableBody.innerHTML.trim()){
            createRows(tableBody, res.slice(0,10));
        }

        let totalRecords = res.length;
        createPagination(totalRecords);
    }

    window.createTableData = createTableData;
})

//document.addEventListener('DOMContentLoaded', function (){
//    console.log('pagination.js is working')
//
//     function changePage() {
//        console.log('changePage is working');
//
//        let tableBody = document.querySelector('tbody');
//        tableBody.innerHTML = '';
//
//        let users = JSON.parse(localStorage.getItem('userData');
//        let currentPage = Number(this.textContent);
//        let backPage = currentPage - 1;
//        let nextPage = currentPage + 1;
//
//        if (currentPage !== '<' && currentPage !== '>'){
//
//            let a = Number(this.textContent)
//            let b = Number(this.previousSibling.textContent)
//
//            nextPage.id = a+1
//            backPage.id = a-1
//            console.log(this.textContent,this.previousSibling.textContent)
//
//            if(a > b){
//                  createRows(tableBody,users.slice(b*10,a*10))
//                  console.log(users.slice(b*10,a*100))
//                  console.log(users)
//            }else if(a===1){
//                createRows(tableBody,users.slice(0,a*10))
//            }else{
//                createRows(tableBody,users.slice(b/10,a/10))
//            }
//        }else if(this.textContent === '<' && !this.id || this.id == '0'){
//            nextPage.id = 2
//            backPage.id = 0
//            createRows(tableBody,users.slice(0,10))
//        }else if(this.textContent === '<' && this.id){
//
//            let back = Number(this.id)
//            nextPage.id = back + 1
//            backPage.id = back - 1
//
//            back *= 10
//            createRows(tableBody,users.slice(back-10,back))
//        }else if(this.textContent === '>' && !this.id){
//            nextPage.id= 3
//            backPage.id = 1
//            createRows(tableBody,users.slice(10,20))
//        }else if(this.textContent === '>' && this.id && users.slice((Number(backPage.id)+1)*10, (Number(nextPage.id))*10)[0]){
//            console.log(users.slice((Number(backPage.id)+1)*10, (Number(nextPage.id))*10)[0])
//            let next = Number(this.id)
//            nextPage.id = next + 1
//            backPage.id = next - 1
//            next*=10
//            createRows(tableBody,users.slice(next-10,next))
//        }else if(!users.slice((Number(backPage.id)+1)*10, (Number(nextPage.id))*10)[0]){
//            createRows(tableBody, users.slice((Number(backPage.id))*10, (Number(nextPage.id)-1)*10))
//        }
//    };
//    function createRows(tableBody,res){
//
//        console.log('createRows is working')
//
//        if(res){
//            for(i=0;i< res.length;i++){
//                let newRow = tableBody.insertRow();
//
//                let cel1 = newRow.insertCell(-1);
//                cel1.textContent = res[i].name
//
//                let cel2 = newRow.insertCell(-1);
//                cel2.textContent = res[i].surname
//
//                let cel3 = newRow.insertCell(-1);
//                cel3.textContent = res[i].email
//
//                let cel4 = newRow.insertCell(-1);
//                cel4.textContent = res[i].admin
//
//                let cel5 = newRow.insertCell(-1);
//                let imgChange = document.createElement('img');
//                imgChange.src = "static/img/icons/change.png";
//                imgChange.alt = 'change';
//                imgChange.classList.add('change');
//                cel5.appendChild(imgChange);
//
//                let cel6 = newRow.insertCell(-1);
//                let imgDelete = document.createElement('img');
//                imgDelete.src = "static/img/icons/delete.png";
//                imgDelete.alt = 'delete';
//                imgDelete.classList.add('delete')
//                cel6.appendChild(imgDelete)
//            }
//        }
//    }
//    function createPagination(totalRecords, recordsPerPage = 10){
//
//        console.log('createPagination is working')
//
//        const totalPages = Math.ceil(totalRecords / recordsPerPage);
//        const pagination = document.getElementById('pagination')
//        pagination.innerHTML = '';
//
//        const prevButton = document.createElement('a');
//        prevButton.href = '#';
//        prevButton.textContent = '<';
//        prevButton.classList.add('back-page');
//        prevButton.addEventListener('click',changePage)
//        pagination.appendChild(prevButton);
//
//        for(let i=1; i < totalPages+1; i++){
//            const pageButton = document.createElement('a');
//            pageButton.href = '#';
//            pageButton.textContent = i;
//            pageButton.addEventListener('click',changePage)
//            pagination.appendChild(pageButton);
//        };
//
//        const nextButton = document.createElement('a');
//        nextButton.href = '#';
//        nextButton.textContent = '>';
//        nextButton.classList.add('next-page');
//        nextButton.addEventListener('click',changePage)
//        pagination.appendChild(nextButton);
//    }
//
//    function createTableData(){
//
//        console.log('createTableRows is working')
//
//        let userDataString = localStorage.getItem('userData')
//
//        if(userDataString) {
//
//            let res = JSON.parse(userDataString)
//
//            let tableBody = document.querySelector('tbody')
//
//            if(!tableBody.innerHTML.trim()) {
//                    createRows(tableBody,res.slice(0,10))
//                }
//
//                const totalRecords = res.length;
//
//                createPagination(totalRecords)
//            }
//
//        }
//
//    window.createTableData = createTableData
//})