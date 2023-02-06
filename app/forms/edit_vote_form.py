from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class EditVoteForm(FlaskForm):
    value = IntegerField('value', validators=[DataRequired()])
