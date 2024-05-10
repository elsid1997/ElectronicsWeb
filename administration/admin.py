from flask import Blueprint, render_template, jsonify, abort, request
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

        user = Users.query.filter_by(email=json_data['email']).first()

        if not user:
            error_data['error'] = ['Пользователь не найден']
            return jsonify(error_data), 404

        for key in json_data:
            if key != 'administrator':
                if form_change[key].validate(form_change):
                    value = form_change[key].data
                    response_data[key] = value
                else:
                    error_data[key] = form_change[key].errors

        if error_data:
            return jsonify(error_data), 400
        else:
            return response_data, 200
    else:
        return jsonify({'error': 'Данные отсутствуют'}), 400
