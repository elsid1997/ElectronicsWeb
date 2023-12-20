from flask import Blueprint, redirect, render_template, url_for, g, request, jsonify, make_response
from users_bt.forms import FormUser, FormFiles
from werkzeug.security import generate_password_hash, check_password_hash
from models.db_models import Users
from flask_login import login_required, login_user, current_user, logout_user

reg_bp = Blueprint('users_bt', __name__, template_folder='templates', static_folder='static')


@reg_bp.route('/profile', methods=['GET', 'POST', 'PUT'])
@login_required
def profile():
    file = FormFiles()
    form = FormUser()

    is_auth = current_user.is_authenticated
    user_name = current_user.name
    user_surname = current_user.surname
    user_age = current_user.age
    user_email = current_user.email
    user_date = current_user.date.strftime('%Y-%m-%d')
    user_photo = current_user.photo

    if request.method == 'POST':
        if file.validate():
            try:
                img = file.file.data.read()
                ava_user = Users.query.filter_by(id=current_user.id).first()
                ava_user.photo = img
                g.db.session.commit()
            except Exception as e:
                print(f'error : {str(e)}')
        else:
            print(file.errors)

    if request.method == 'PUT':
        if form.validate():
            print(request.form)
            print(request.data.decode('utf-8'), 'put is working')
        else:
            print(form.errors)
            data = form.errors
            print(jsonify(data))
            response_data = {'message': 'PUT request успешно обработан', 'data': data}
            return jsonify(response_data)

    if request.args.get('log_out'):
        logout_user()
        return redirect(url_for('users_bt.register'))

    return render_template('auth/profile.html', form=form, csrf=form.csrf(), file=file, is_auth=is_auth,
                           user_name=user_name,
                           user_surname=user_surname, user_age=user_age, user_date=user_date,
                           user_email=user_email, user_photo=user_photo)


@reg_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('users_bt.profile'))
    form = FormUser()
    next_url = request.args.get('next')
    if request.method == 'POST':
        print('request is warking')
        user = Users.query.filter(Users.email == form.email.data).first()
        if user and check_password_hash(user.psw, form.psw1.data):
            login_user(user, remember=form.remember.data)
            print(request.args.get('next'))
            return jsonify({'status': 'success'})
            # return redirect(request.args.get('next') or url_for('users_bt.profile'))
        else:
            return jsonify({'status': 'error', 'message': 'Такого пользователя не существует'})

    return render_template('auth/login.html', form=form, next_url=next_url)


@reg_bp.route('/registration', methods=['GET', 'POST'])
def register():
    form = FormUser()

    if form.validate_on_submit():
        print('form_validation_is working')
        hash_psw = generate_password_hash(form.psw1.data)
        db = g.db
        try:
            res = Users(name=form.name.data, surname=form.surname.data, email=form.email.data, psw=hash_psw,
                        age=form.age.data)
            db.session.add(res)
            db.session.commit()
            login_user(res)
            response_data = {'status': 'success', 'message': 'Регистрация прошла успешна'}
        except Exception as e:
            print(str(e))
            db.session.rollback()
            response_data = {'status': 'error', 'message': 'Пользователь с таким Email существует'}
        return jsonify(response_data)
    elif form.errors:
        return jsonify(form_error=form.errors)

    return render_template('auth/registration.html', form=form)


@reg_bp.route('/userava')
def userava():
    img = current_user.photo
    response = make_response(img)
    response.headers['Content-Type'] = 'image/jpg'
    return response
