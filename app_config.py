import os

class Config:
    SECRET_KEY = os.urandom(20)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///electronic_store.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAX_CONTENT_LENGTH = 50 * 1024 * 1024
