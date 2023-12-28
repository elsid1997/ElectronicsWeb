from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, PasswordField, SubmitField, BooleanField, DateField, FloatField
from wtforms.validators import DataRequired, Length, NumberRange, Regexp, EqualTo, Email, ValidationError
from flask_wtf.file import FileRequired, FileAllowed, FileField, MultipleFileField
from flask_wtf.csrf import generate_csrf
from datetime import date

class FormUser(FlaskForm):
    name = StringField('Имя :', validators=[DataRequired(),
                                            Length(min=3, max=100,
                                                   message='Имя должно быть не меньше трех символов'),
                                            Regexp('^[а-яА-ЯёЁa-zA-Z]+$',
                                                   message='Имя должна содержать только буквы')
                                            ])
    surname = StringField('Фамилия :', validators=[DataRequired(),
                                                   Length(min=3, max=100,
                                                          message='Фамилие должно быть не меньше трех символов'),
                                                   Regexp('^[а-яА-ЯёЁa-zA-Z]+$',
                                                          message='Фамилия должна содержать только буквы')
                                                   ])
    age = IntegerField('Возраст :', validators=[DataRequired(), NumberRange(min=18, max=100)])

    email = StringField('Email :', validators=[DataRequired(), Email(message='некорректно введен email')])

    psw1 = PasswordField('Пароль :', validators=[DataRequired(),
                                                 Length(min=8, message='Пароль должен быть не меньше 8 символов'),
                                                 Regexp(regex=r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$',
                                                        message='Пароль должен содержать прописные и строчные буквы цифры и символы')])
    psw2 = PasswordField('Повторите пароль :',
                         validators=[DataRequired(), EqualTo('psw1', message='Пароли не совпадают')])

    remember = BooleanField('Запомнить :', default=False)

    submit = SubmitField('Зарегестрироваться')

    @staticmethod
    def csrf():
        return generate_csrf()


class FormFiles(FlaskForm):
    file = FileField('Выберите файл', validators=[FileRequired(), FileAllowed(['jpg', 'png', 'jpeg'])])
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
                                          FileAllowed(['jpg', 'png', 'jpeg']),
                                          Length(min=1,
                                                 max=5,
                                                 message='Выберите от 1 до 5 файлов для загрузки.')])
    model = StringField('Модель', validators=[DataRequired(), Length(min=1, max=100)])
    year = DateField('Год выпуска', format='%Y-%m-%d', validators=[DataRequired(), YearRenge(1950, date.today().year)])
    price = FloatField('Цена в долларах', validators=[DataRequired(), NumberRange(min=1, max=50000)])
    submit = SubmitField('Отправить')
