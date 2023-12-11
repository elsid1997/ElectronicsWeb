import datetime
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()
migrate = Migrate()

class Users(db.Model,UserMixin):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    surname = db.Column(db.String(200))
    age = db.Column(db.Integer)
    psw = db.Column(db.String(200))
    email = db.Column(db.String(200), unique=True)
    photo = db.Column(db.LargeBinary)
    date = db.Column(db.DateTime, default=datetime.datetime.now())
    # post_id = []

    def __repr__(self):
        return f'<user : {self.id}>'

# class Admins(db.Model):
#     pass
#
#
# class Drons(db.Model):
#     pass
#
#
# class PhotoCameras(db.Model):
#     pass
#
#
# class Comments(db.Model):
#     pass
#
#
# class Orders(db.Model):
#     pass
