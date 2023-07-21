from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    """Checks if user email is already in use
    """
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def no_spaces_in_username(form, field):
    username = field.data
    if ' ' in username:
        raise ValidationError("Username can't contain spaces.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[
                           DataRequired(), username_exists, no_spaces_in_username])
    email = StringField('email', validators=[
                        DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(), EqualTo(
        'repeat_password', message='Passwords must match')])
    repeat_password = StringField(
        'repeat_password', validators=[DataRequired()])
