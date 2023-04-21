from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field) -> None:
    """
    Checking if password matches

    Raises:
        ValidationError: No such user exists.
        ValidationError: Password was incorrect.
    """
    password: str = field.data
    email: str = form.data['email']
    user: str = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[
                        DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
