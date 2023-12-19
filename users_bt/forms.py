from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, NumberRange, Regexp, EqualTo, Email
from flask_wtf.file import FileRequired, FileAllowed, FileField
from flask_wtf.csrf import generate_csrf

class FormUser(FlaskForm):
    name = StringField('Имя :', validators=[DataRequired(),
                                            Length(min=3, max=100,
                                                   message='Имя должно быть не меньше трех символов')])
    surname = StringField('Фамилия :', validators=[DataRequired(),
                                                   Length(min=3, max=100,
                                                          message='Фамилие должно быть не меньше трех символов')])
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

    file = FileField('Выберите файл', validators=[FileRequired(), FileAllowed(['jpg', 'png'])])
    submit = SubmitField('Отправить')
