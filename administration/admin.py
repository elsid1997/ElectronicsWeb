from flask import Blueprint, render_template, jsonify, abort
from models.db_models import Users
from flask_login import login_required, current_user

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
