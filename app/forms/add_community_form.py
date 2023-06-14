from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired, ValidationError

from app.models import Community


def no_spaces_in_name(form, field):
    """Checks the username for spaces



    Raises:
        ValidationError: Username can't contain spaces
    """
    name = field.data
    if ' ' in name:
        raise ValidationError("Username can't contain spaces.")


def name_exists(form, field):
    # Checking if username is already in use
    name = field.data
    community = Community.query.filter(Community.name == name).first()
    if community:
        raise ValidationError('Community name is already in use.')


class AddCommunityForm(FlaskForm):
    name = StringField('name', validators=[
                       DataRequired(), no_spaces_in_name, name_exists])
    header = StringField('header', validators=[DataRequired()])
    about = TextField('about', validators=[DataRequired()])
