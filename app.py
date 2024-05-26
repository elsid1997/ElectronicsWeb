from flask import render_template, Flask, g
from app_config import Config
from users_bt.users import reg_bp
from administration.admin import admin_bt
from models.db_models import db, migrate, Users
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint(reg_bp, url_prefix='/auth')
app.register_blueprint(admin_bt, url_prefix='/administration')

db.init_app(app)
migrate.init_app(app, db)

login_manager = LoginManager(app)
login_manager.login_view = 'users_bt.login'
login_manager.login_message = 'Авторизуйтес для доступа к закрытым страницам'
login_manager.login_message_category = 'error'

print(app.config['MAX_CONTENT_LENGTH'])

# @app.route('/js/<path:filename>')
# def serve_js(filename):
#     return send_from_directory('js', filename, mimetype='application/javascript')

@login_manager.user_loader
def load_user(user):
    user = Users.query.get(int(user))
    return user


@app.before_request
def before_request():
    if not hasattr(g, 'db'):
        g.db = db


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/allgoods')
def allgoods():
    return render_template('allgoods.html')


@app.route('/on_sale')
def onsale():
    return render_template('onsale.html')


if __name__ == '__main__':
    app.run(debug=True)
