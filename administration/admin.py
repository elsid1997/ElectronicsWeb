from flask import Blueprint, render_template, jsonify
from models.db_models import Users

admin_bt = Blueprint('admin', __name__, template_folder='templates', static_folder='static')


def serialize(user):
    return {
        'name': user.name,
        'surname': user.surname,
        'email': user.email,
        'admin': user.admin,
    }


@admin_bt.route('/')
def index():
    return render_template('admin/index.html')


@admin_bt.route('/get_users')
def get_users():
    users = Users.query.all()
    serialized_users = [serialize(user) for user in users]
    return jsonify(serialized_users)
