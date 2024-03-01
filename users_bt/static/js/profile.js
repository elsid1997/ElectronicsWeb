document.addEventListener('DOMContentLoaded', function(){
    console.log('profile.js')

    // Функция для изменения отображаемого изображения в зависимости от выбранной опции

    var optionSelect = document.querySelectorAll('#options-select option');

    function changeImage(event) {
        let indexOption = event.target.selectedIndex;
        let urlImage = optionSelect[indexOption].value;
        let photo = document.querySelector('#product-photo');

        photo.src = urlImage;
    };

    window.changeImage = changeImage;

   // функция для изменения текста внутри кнопок выбора изображения
    function changeTextButton(event){

        let inputTarget = event.target;
        let fileFromInput = inputTarget.files;
        let textSpanFile = inputTarget.previousElementSibling;
        let imageElementPhotos = document.getElementById('product-photo');
        let imageElementProfile = document.getElementById('photo-profile');

        if (fileFromInput.length > 5) {

            textSpanFile.style.backgroundColor = 'red';
            textSpanFile.innerText = 'Максимум 5 файлов';

        } else if ( inputTarget.multiple && fileFromInput[0] != undefined) {
            textSpanFile.style.backgroundColor = 'rgb(14, 89, 187)';
            imageElementPhotos.src = URL.createObjectURL(fileFromInput[0]);
            textSpanFile.innerText = `Выбрано ${fileFromInput.length}`;

            let selectPhoto = document.getElementById('option-select');

            for(let i=1 ; i < fileFromInput.length + 1 ;i++) {
                optionSelect[i].innerText = `Фото ${i}`;
                optionSelect[i].value = URL.createObjectURL(inputTarget.files[i-1]);
                optionSelect[i].style.display='inline'
            };
        } else if (!inputTarget.multiple && fileFromInput[0] != undefined) {
            imageElementProfile.src = URL.createObjectURL(fileFromInput[0]);
            textSpanFile.innerText = fileFromInput[0].name;
        };

    };

    // Прослушиватель событий для input выбора изображения

    document.querySelectorAll('.input-file input[type=file]').forEach(function(inputFile){

        inputFile.addEventListener('change', changeTextButton);

    });

    // Прослушиватель событий для события нажатия на кнопку «btn-change»

    document.getElementById('btn-change').addEventListener('click', function(event){

        event.target.style.display = 'none';

        let profileDiv = document.getElementById('profile-div');
        let userParagraph = document.querySelectorAll('.user-p');

        profileDiv.style.height = 'auto';

        userParagraph.forEach(function (p) {
            p.style.display = 'none';
        });

        let btnLogOut = document.getElementById('log-out');
        btnLogOut.style.display = 'none';

        var divForm = document.querySelector('.div-form');
        let divDisplay = window.getComputedStyle(divForm).display;

        if (divDisplay === 'none') {
            divForm.style.display = 'flex';
        } else {
            divForm.style.display = 'none';
        };

        // Прослушиватель событий для события щелчка по флажку 'password-checkbox'

        let passwordCheckbox = document.getElementById('password-checkbox');
        passwordCheckbox.addEventListener('click', function (event) {
            let passwordInputs = document.querySelectorAll('#psw1,#psw2');
            if (passwordCheckbox.checked) {
                passwordInputs.forEach(function (input) {
                    input.type = 'text';
                });
            } else {
                passwordInputs.forEach(function (input) {
                    input.type = 'password';
                });
            }
        });

    // Создание и обработка кнопки закрытия

        let btnClose = document.getElementById('button-close');

        if (btnClose === null) {
            btnClose = document.createElement('button');
            btnClose.type = 'button';
            btnClose.id = 'button-close';
            btnClose.innerText = 'Отменить';
            btnClose.style.border = 'none';
            btnClose.style.background = 'none';
            btnClose.style.textDecoration = 'underline';
            btnClose.style.margin = '10px 0 10px 0';
            btnClose.style.fontSize = '16px';
            btnClose.style.color = 'red';
            divForm.appendChild(btnClose);
        } else {
            btnClose.style.display = 'inline-block';
        };
        btnClose.addEventListener('click', function () {
            btnLogOut.style.display = 'inline-block';
            event.target.style.display = 'inline-block';
            btnClose.style.display = 'none';
            divForm.style.display = 'none';
            profileDiv.style.height = '780px';

            userParagraph.forEach(function (p) {
                p.style.display = 'block';
            });
        });
    });

    // AJAX запрос

    function sendPullRequest(event, form) {
        event.preventDefault();
        let url = '/auth/profile';
        let formData = new FormData(form);
        let urlParams = new URLSearchParams(formData).toString();
        console.log(urlParams);

        let xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Обработка успешного ответа
        function handleSuccess(response){
            if (response.success) {
                let userParagraph = document.querySelectorAll('.user-p');
                userParagraph.forEach(function (p) {
                    let span = p.querySelector('span');
                    let i = span.textContent.indexOf(':');
                    let resString = span.textContent.slice(0, i + 2);
                    p.querySelector('span').textContent = resString + response.success[p.id.slice(0, -5)];
                    p.style.display = 'block';
                });
                let divForm = document.querySelector('.div-form');
                divForm.style.display = 'none';

                let btnClose = document.getElementById('button-close');
                btnClose.style.display = 'none';

                let btnChange = document.getElementById('btn-change');
                btnChange.style.display = 'inline-block';

                let btnLogOut = document.getElementById('log-out');
                btnLogOut.style.display = 'inline-block';
            } else if (response.errors) {
                for (let key in response.errors) {
                    let er = document.getElementById(key + '_error');
                    er.innerText = response.errors[key];
                    er.style.display = 'block';
                }
            } else if (response.userIsExisting) {
                let div = document.getElementById('flash');
                if (div === null) {
                    let div = document.createElement('div');
                    div.innerText = response.userIsExisting;
                    div.id = 'flash';

                    document.querySelector('.div-form').insertBefore(div, document.querySelector('.form-request'));
                };
            };
        };

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // Проверяем успешный запрос
                if (xhr.status === 200) {
                    // Обрабатываем успешный ответ
                    handleSuccess(JSON.parse(xhr.responseText));
                } else {
                    // Обработка ошибки
                    console.error('Ошибка выполнения PUT-запроса');
                    console.error('Статус:', xhr.status);
                }
            }
        };

         xhr.send(urlParams);
    };

    window.sendPullRequest = sendPullRequest;
});