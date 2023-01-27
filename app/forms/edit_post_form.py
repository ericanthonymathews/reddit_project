from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired


class EditPostForm(FlaskForm):
    edited_by = StringField('edited_by', validators=[DataRequired()])
    body = TextField('body', validators=[DataRequired()])
