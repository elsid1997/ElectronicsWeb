$(document).ready(function(){

        console.log('registration.js is working')

        // Обработчик события для чекбокса "Показать пароль"

        $('body').on('click','#password-checkbox',function(){

            console.log('#password-checkbox is working')

            var passwordFields = $('#psw1, #psw2');

            if($(this).is(':checked')){
                passwordFields.attr('type','text');
            }else{
                passwordFields.attr('type','password');
            };

        });

        // Обработчик события для отправки формы

        $('.form-request').submit(function(event) {
            console.log('function submit is working')

            event.preventDefault();

            var formData = $(this).serialize()

            $.ajax({
                type:'POST',
                url:'/auth/registration',
                data:formData,
                //contentType: 'application/json',  // Раскомментируйте, если необходимо установить Content-Type
                success:function(data){

                    if (data.status == 'error' && document.getElementById('flash') == null){

                        // Если блока с сообщением об ошибке еще нет, добавляем его

                            var div = $('<div>', { id: 'flash', text: data.message });

                            $('.div-form').append(div);

                    } else if (data['form_error']) {
                        // Отоброжение полученных ошибок

                        for(var key in data['form_error']){
                            let er = $( '#' + key + '_error');
                            er.text(data['form_error'][key]);
                            er.css('display' , 'block');
                    }
                    } else if (data.status == 'success'){
                         // Если регистрация прошла успешно, перенаправляем пользователя

                         window.location.href='/auth/profile'
                    };
                },
                error:function(error){
                    console.log(error.responseText)
                }
            });
        });
});