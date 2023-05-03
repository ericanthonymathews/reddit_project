from datetime import datetime

from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import EditCommentForm
from app.models import Comment, Post, db

comment_routes = Blueprint('comments', __name__)


@comment_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_post_comment(id):
    """edits and returns post or errors preventing the edit

    Args:
        id (_type_): number

    Returns:
        _type_: dict
    """
     form = EditCommentForm()
      form['csrf_token'].data = request.cookies['csrf_token']
       if form.validate_on_submit():
            comment = Comment.query.get(id)
            comment.edited_by = form.data['edited_by']
            comment.description = form.data['description']
            comment.updated_at = datetime.now()
            db.session.commit()
            updated_post = Post.query.get(comment.post_id)
            return updated_post.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_post_comment(id):
  """Removes the comment description and returns the deleted post or returns errors

  Args:
      id (_type_): number

  Returns:
      _type_: dict
  """

    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)
        comment.edited_by = form.data['edited_by']
        comment.description = form.data['description']
        comment.updated_at = datetime.now()
        comment.is_deleted = True
        db.session.commit()
        updated_post = Post.query.get(comment.post_id)
        return updated_post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
