from flask import Blueprint, jsonify, request
from app.models import db, Comment, Post
from flask_login import login_required, current_user
from app.forms import EditCommentForm
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_post_comment(id):

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
