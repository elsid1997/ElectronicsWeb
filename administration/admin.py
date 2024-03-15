from flask_admin import Admin
from flask_admin.form import Select2Widget
from flask_admin.contrib.sqla import ModelView
from models.db_models import Users, Drons, Cameras

admin = Admin()


class UsersView(ModelView):
    # form_columns = [
    #     'name',
    #     'surname',
    #     'age',
    #     'gender',
    #     'psw',
    #     'email',
    #     'photo',
    #     'date',
    #     'myDrons',
    #     'myCameras'
    # ]
    #
    # column_list = [
    #     'name',
    #     'surname',
    #     'age',
    #     'gender',
    #     'psw',
    #     'email',
    #     'photo',
    #     'date',
    #     'myDrons',
    #     'myCameras'
    # ]

    column_searchable_list = ['email']

    column_formatters = {
        'psw':
            lambda v, c, m, p: m.psw[:50] + '...' if m.psw else '',

        'photo': lambda view, context, model, name: 'profile photo' if model.photo else None,
    }

class DronsView(ModelView):

    column_labels = {
        'user_id': 'User email'
    }

    form_columns = [
        'model',
        'date',
        'price',
        'photo',
        'user_id'
    ]

    column_list = [
        'model',
        'date',
        'price',
        'photo',
        'user_id'
    ]

def init_admin(app, db):
    admin.init_app(app)

    admin.add_view(UsersView(Users, db.session))
    admin.add_view(DronsView(Drons, db.session))
    admin.add_view(ModelView(Cameras, db.session))
