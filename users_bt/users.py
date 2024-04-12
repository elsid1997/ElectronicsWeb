from flask import Blueprint, redirect, render_template, url_for, g, request, jsonify, make_response
from forms import FormUser, FormFiles, FormProducts
from werkzeug.security import generate_password_hash, check_password_hash
from models.db_models import Users
from flask_login import login_required, login_user, current_user, logout_user

reg_bp = Blueprint('users_bt', __name__, template_folder='templates', static_folder='static')


@reg_bp.route('/profile', methods=['GET', 'POST', 'PUT'])
@login_required
def profile():
    usersAvaForm = FormFiles()
    formUser = FormUser()
    productsForm = FormProducts()

    if request.method == 'PUT':

        if formUser.validate():
            try:
                formUser.psw1.data = generate_password_hash(formUser.psw1.data)
                db = g.db
                res = Users.query.get_or_404(current_user.id)
                formUser.populate_obj(res)
                db.session.commit()
                login_user(res)

                user_data = request.form.to_dict()
                del user_data['csrf_token']
                del user_data['psw1']
                del user_data['psw2']

                if 'gender' not in user_data:
                    user_data['gender'] = formUser.gender.data
                user_data['date'] = current_user.date.strftime('%Y-%m-%d')

                response_data = {'success': user_data}
                return jsonify(response_data)
            except Exception as e:
                print(str(e))
                db.session.rollback()
                response_data = {'userIsExisting': 'Пользователь с таким Email существует'}
                return jsonify(response_data)
        else:
            errors = formUser.errors
            response_data = {'errors': errors}
            return jsonify(response_data)

    if request.args.get('log_out'):
        logout_user()
        return redirect(url_for('index'))

    return render_template('auth/profile.html', formUser=formUser, csrf=formUser.csrf(), usersAvaForm=usersAvaForm,
                           productsForm=productsForm)


@reg_bp.route('/userava', methods=['POST', 'GET'])
def userava():
    img = current_user.photo
    response = make_response(img)
    response.headers['Content-Type'] = 'image/jpg'

    usersAvaForm = FormFiles()

    if request.method == 'POST':
        if usersAvaForm.validate():
            try:
                img = usersAvaForm.file.data.read()
                ava_user = Users.query.filter_by(id=current_user.id).first()
                ava_user.photo = img
                g.db.session.commit()
                response = {'success': 'Фотография профиля обновлена'}
                return jsonify(response)
            except Exception as e:
                print(f'error : {str(e)}')
        else:
            response = {'error': usersAvaForm.errors}
            return jsonify(response)

    return response


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
                        age=form.age.data, gender=form.gender.data)
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


@reg_bp.route('/products_valid', methods=['POST'])
def products_valid():
    products = FormProducts()
    print(products.photo.data)
    if products.validate_on_submit():
        print(products.photo.data, products.model.data, products.price.data, products.year.data)
        return jsonify({'success': 'Товар отправлен на рассмотрение'})
    else:
        print(products.errors)
        response_data = {'error': products.errors}
        return jsonify(response_data)

