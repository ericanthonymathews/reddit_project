from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired


class EditCommentForm(FlaskForm):
    edited_by = StringField('edited_by', validators=[DataRequired()])
    description = TextField('description', validators=[DataRequired()])
