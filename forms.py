from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, PasswordField, SubmitField, BooleanField, DateField, FloatField, \
    RadioField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange, Regexp, EqualTo, Email, ValidationError
from flask_wtf.file import FileRequired, FileAllowed, FileField, MultipleFileField, FileSize
from flask_wtf.csrf import generate_csrf
from datetime import date


class FormUser(FlaskForm):
    name = StringField('Имя ', validators=[DataRequired(message='Имя обязательно для заполнения'),
                                           Length(min=3, max=100,
                                                  message='Имя должно быть не меньше трех символов'),
                                           Regexp('^[а-яА-ЯёЁa-zA-Z]+$',
                                                  message='Имя должно содержать только буквы')
                                           ])
    surname = StringField('Фамилия', validators=[DataRequired(message='Фамилие обязательно для заполнения'),
                                                 Length(min=3, max=100,
                                                        message='Фамилие должно быть не меньше трех символов'),
                                                 Regexp('^[а-яА-ЯёЁa-zA-Z]+$',
                                                        message='Фамилия должно содержать только буквы')
                                                 ])
    age = IntegerField('Возраст', validators=[DataRequired(message='Это поле обязательно для заполнения'), NumberRange(min=18, max=100)])

    email = StringField('Email', validators=[DataRequired(message='Email обязательное поле для заполнения'), Email(message='Некорректно введен email')])

    gender = RadioField('Пол', choices=[('Мужской', 'Мужской'), ('Женский', 'Женский'), ('Не выбран', 'default')],
                        default='Не выбран')

    psw1 = PasswordField('Пароль', render_kw={'autocomplete': 'current_password'}, validators=[DataRequired(message='Это поле обязательно для заполнения'),
                                                                                               Length(min=8,
                                                                                                      message='Пароль '
                                                                                                              'должен '
                                                                                                              'быть '
                                                                                                              'не '
                                                                                                              'меньше '
                                                                                                              '8 '
                                                                                                              'символов'),
                                                                                               Regexp(
                                                                                                   regex=r'^(?=.*\d)('
                                                                                                         r'?=.*['
                                                                                                         r'a-z])('
                                                                                                         r'?=.*['
                                                                                                         r'A-Z]).{8,}$',
                                                                                                   message='Пароль '
                                                                                                           'должен '
                                                                                                           'содержать '
                                                                                                           'прописные '
                                                                                                           'и '
                                                                                                           'строчные '
                                                                                                           'буквы '
                                                                                                           'цифры и '
                                                                                                           'символы')])
    psw2 = PasswordField('Повторите пароль', render_kw={'autocomplete': 'current_password'},
                         validators=[DataRequired(message='Это поле обязательно для заполнения'), EqualTo('psw1', message='Пароли не совпадают')])

    remember = BooleanField('Запомнить', default=False)

    submit = SubmitField('Зарегестрироваться')

    @staticmethod
    def csrf():
        return generate_csrf()


class FormFiles(FlaskForm):
    file = FileField('Выберите файл', validators=[FileRequired(), FileAllowed(['jpg', 'png', 'jpeg'],
                                                                              message='Файл должен быть только с '
                                                                                      'расширениями ".jpg",".png",'
                                                                                      '"jpeg"')])
    submit = SubmitField('Отправить')


class YearRenge(object):
    def __init__(self, min_year, max_year, message=None):
        self.min_year = min_year
        self.max_year = max_year
        if not message:
            message = f'Год должен быть не ранее {min_year} и не позднее {max_year}.'
        self.message = message

    def __call__(self, form, field):
        print(field.data)
        if field.data:
            print(field.data.year)
            year = field.data.year
            print(year)
            if year < self.min_year or year > self.max_year:
                raise ValidationError(self.message)


class FormProducts(FlaskForm):
    photo = MultipleFileField('Загрузите фотографии',
                              validators=[FileRequired('Выберите хотя бы один файл для загрузки'),
                                          FileAllowed(['jpg', 'png', 'jpeg'],
                                                      message='Файл не имеет утвержденного расширения: jpg, png, jpeg'),
                                          FileSize(max_size=5 * 1024 * 1024,
                                                   message='Максимальный размер файла - 5 МБ.'),
                                          Length(min=1,
                                                 max=5,
                                                 message='Выберите от 1 до 5 файлов для загрузки.')])
    model = StringField('Модель', validators=[DataRequired(message='Это поле обязательно для заполнения'), Length(min=1, max=100)])
    year = DateField('Год выпуска', format='%Y-%m-%d', validators=[DataRequired(message='Введите правильную дату'),
                                                                   YearRenge(1950, date.today().year)])
    price = FloatField('Цена в долларах',
                       validators=[DataRequired(message='Введите числа'),
                                   NumberRange(min=1, max=50000, message='Цена не должно привышать 50000 доллоров')])
    count = IntegerField('Количество',
                         validators=[DataRequired('Введите сколько имеется в наличии'), NumberRange(min=1)])
    description = TextAreaField('Описание')

    submit = SubmitField('Отправить')
