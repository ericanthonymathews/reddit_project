from flask_wtf import FlaskForm
from wtforms import IntegerField, TextField
from wtforms.validators import DataRequired


class AddCommentForm(FlaskForm):
    description = TextField('description', validators=[DataRequired()])
    post_id = IntegerField('post_id', validators=[DataRequired()])
