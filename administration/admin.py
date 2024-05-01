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
    if request.method == 'PUT':
        json_data = request.get_json()
        form_change = FormUser(name=json_data.get('name'),
                               surname=json_data['surname'],
                               email=json_data['email']
                               )
        response_data = []
        if form_change.name.validate(form_change):
            name = form_change.name.data
            response_data.append(name)

        if form_change.surname.validate(form_change):
            surname = form_change.surname.data
            response_data.append(surname)

        if form_change.email.validate(form_change):
            email = form_change.email.data
            response_data.append(email)

        name_errors = form_change.name.errors
        surname_errors = form_change.surname.errors
        email_errors = form_change.email.errors
        return jsonify({'errors': [name_errors, surname_errors, email_errors]})
