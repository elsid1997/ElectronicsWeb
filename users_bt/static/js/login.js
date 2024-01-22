$(document).ready(function() {

    // Показать flash сообщение, если оно есть
    if (flash_message) {
        $('#flash').css({
            'display': 'flex'
        }).text(flash_message);
    }

    // Обработка отправки формы логина
    $('#login-form').submit(function(event) {
        event.preventDefault();

        var formData = $(this).serialize();

        // Отправка AJAX запроса на сервер для авторизации
        $.ajax({
            type: 'POST',
            url: '/auth/login',
            data: formData,
            success: function(data) {
                if (data.status == 'success') {
                    // Если успешно, перенаправить на следующую страницу или профиль
                    if (next_url != 'None') {
                        window.location.href = next_url;
                    } else {
                        window.location.href = '/auth/profile';
                    }
                } else if (data.status == 'error') {
                    // В случае ошибки, вывести сообщение об ошибке
                    console.log(data.message);
                    $('#flash').css({
                        'display': 'flex'
                    }).text(data.message);
                }
            },
            error: function(error) {
                // В случае ошибки AJAX запроса, вывести сообщение об ошибке в консоль
                console.log(error);
            }
        });

    });
});
