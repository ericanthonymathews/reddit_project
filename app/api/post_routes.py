from flask import Blueprint, jsonify, request
from app.models import db, Post
from flask_login import login_required, current_user
from app.forms import EditPostForm
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime


post_routes = Blueprint('posts', __name__)

# get all posts


@post_routes.route('/')
def posts():
    posts = Post.query.all()
    if posts:
        return {"posts": [post.to_dict() for post in posts]}
    else:
        return {"posts": []}

# get post by id


@post_routes.route('/<int:id>')
def post(id):
    post = Post.query.get(id)
    if post:
        return post.to_dict()
    else:
        return {}


@post_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_post(id):
    """
    Creates a new Post and returns the new post
    """
    form = EditPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(id)
        post.edited_by = form.data['edited_by']
        post.body = form.data['body']
        post.updated_at = datetime.now()
        post.is_deleted = True
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
