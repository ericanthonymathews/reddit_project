from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired


class EditCommunityForm(FlaskForm):
    header = StringField('header', validators=[DataRequired()])
    about = TextField('about', validators=[DataRequired()])
