import datetime
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()
migrate = Migrate()


class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    surname = db.Column(db.String(200))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(), default=None)
    psw = db.Column(db.String(200))
    email = db.Column(db.String(200), unique=True)
    photo = db.Column(db.LargeBinary)
    date = db.Column(db.DateTime, default=datetime.datetime.now())
    admin = db.Column(db.Boolean, default=False)
    myDrons = db.relationship('Drons', backref='Users', lazy=True)
    myCameras = db.relationship('Cameras', backref='Users', lazy=True)

    def __str__(self):
        return self.email
    def __repr__(self):
        return f'<user : {self.id}>'


# class Admins(db.Model):
#     pass
#
#
class Drons(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String)
    date = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Numeric(5, 2))
    photo = db.Column(db.LargeBinary, nullable=True, default=None)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


class Cameras(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String)
    date = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Numeric(5, 12))
    photo = db.Column(db.LargeBinary, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

# class Comments(db.Model):
#     pass
#
#
# class Orders(db.Model):
#     pass
