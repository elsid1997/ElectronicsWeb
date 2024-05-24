from flask import Blueprint, render_template, jsonify, abort, request, g
from models.db_models import Users
from flask_login import login_required, current_user
from forms import FormUser

admin_bt = Blueprint('admin', __name__, template_folder='templates', static_folder='static')


def serialize(user):
    return {
        'name': user.name,
        'surname': user.surname,
        'email': user.email,
        'admin': user.admin,
    }


@admin_bt.route('/')
@login_required
def index():
    return render_template('admin/index.html')


@admin_bt.route('/get_users')
@login_required
def get_users():
    print('get users is working')
    try:
        users = Users.query.all()
        serialized_users = [serialize(user) for user in users]
        print(serialized_users)
        return jsonify(serialized_users)
    except Exception as e:
        abort(500, descripton=str(e))


@admin_bt.route('delete', methods=['DELETE'])
@login_required
def delete():
    email = request.get_json()

    if not email:
        return jsonify({'error': 'Ошибка связанная с электронной почтой'}), 400

    user = Users.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'Такого пользователя не существует'}), 404

    try:
        g.db.session.delete(user)
        g.db.session.commit()
        return jsonify({'message': 'Пользователь удален'}), 200
    except Exception as e:
        g.db.session.rollback()
        return jsonify({'error': 'Ошибка при удалении пользователя', 'details': str(e)}), 500


@admin_bt.route('/change', methods=['PUT'])
@login_required
def change():
    json_data = request.get_json()
    if json_data:

        form_change = FormUser(name=json_data.get('name'),
                               surname=json_data['surname'],
                               email=json_data['email']
                               )
        response_data = {}
        error_data = {}

        for key in json_data:
            if key != 'admin' and key != 'oldEmail':
                if form_change[key].validate(form_change):
                    value = form_change[key].data
                    response_data[key] = value
                else:
                    error_data[key] = form_change[key].errors

        if error_data:
            return jsonify(error_data), 400
        else:
            user = Users.query.filter_by(email=json_data['oldEmail']).first()
            if not user:
                error_data['error'] = ['Пользователь не найден']
                return jsonify(error_data), 404
            else:
                user.name = form_change.name.data
                user.surname = form_change.surname.data
                user.email = form_change.email.data
                user.admin = json_data.get('admin')
                response_data['admin'] = json_data['admin']
            try:
                g.db.session.commit()
            except Exception as e:
                g.db.session.rollback()
                if 'UNIQUE constraint failed' in str(e):
                    return jsonify({'error': ['Пользователь с таким Email существует']}), 500
                print(str(e))
                return jsonify({'error': str(e)}), 500

            return response_data, 200
    else:
        return jsonify({'error': ['Данные отсутствуют']}), 400
