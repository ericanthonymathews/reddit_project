from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class AddVoteForm(FlaskForm):
    post_id = IntegerField('post_id', validators=[DataRequired()])
    value = IntegerField('value', validators=[DataRequired()])
