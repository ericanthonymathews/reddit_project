from flask import Blueprint, jsonify, request
from app.models import db, Post, Comment
from flask_login import login_required, current_user
from app.forms import EditPostForm, AddCommentForm
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime
from operator import itemgetter


post_routes = Blueprint('posts', __name__)

# get all posts


@post_routes.route('/<string:type>')
def get_posts(type):
    """Takes in a type and returns all posts according to type value

    Args:
        type (string): short word description for the sorted posts

    Returns:
        dict: all posts
    """
    if type == 'new':
        posts = Post.query.all()
        if posts:
            return {"posts": [post.to_dict() for post in posts]}
        else:
            return {"posts": []}
    elif type == 'popular':
        posts = Post.query.all()
        if posts:
            posts_by_popularity = [post.to_dict() for post in posts]

            new = sorted(
                posts_by_popularity, key=itemgetter('total'))
            return {"posts": new}
        else:
            return {"posts": []}

# get post by id


@post_routes.route('/<int:id>')
def post(id):
    """Takes an id number and returns the post associated

    Args:
        id (number): id of the post

    Returns:
        dict: All the related post information
    """
    post = Post.query.get(id)
    if post:
        return post.to_dict()
    else:
        return {}


@post_routes.route("/<int:id>", methods=["POST"])
@login_required
def add_post_comment(id):
    """Takes the id of the post as well as form data, creates a comment for the post, and returns the updated post or returns an error

    Args:
        id (number): id of the post to be commented on

    Returns:
        dict: the updated post data containing the comment
    """
    form = AddCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=current_user.id,
            description=form.data['description'],
            post_id=form.data['post_id'],
        )
        db.session.add(comment)
        db.session.commit()
        updated_post = Post.query.get(id)
        return updated_post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_post(id):
    """Takes the id of a post as well as form data and returns the edited post or the error

    Args:
        id (number): id of the post to be edited

    Returns:
        dict: the updated post information
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
