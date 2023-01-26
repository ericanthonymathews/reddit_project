from flask import Blueprint, jsonify, request
from app.models import db, Post, Community
from app.forms import AddPostForm
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages

community_routes = Blueprint('communities', __name__)

# get community information by id


@community_routes.route('/<int:id>')
def community_by_id(id):
    community = Community.query.get(id)
    if community:
        return community.to_dict()
    else:
        return {}

# add a post to a community by id


@community_routes.route('/<int:community_id>/posts', methods=['POST'])
@login_required
def add_post(community_id):
    """
    Creates a new Post and returns the new post
    """
    form = AddPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            community_id=community_id,
            user_id=current_user.id,
            title=form.data['title'],
            body=form.data['body']
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

 # get all posts by communityId


@community_routes.route('/<int:id>/posts')
def posts_by_id(id):
    posts = Post.query.filter_by(community_id=id).all()
    if posts:
        return {"posts": [post.to_dict() for post in posts]}
    else:
        return {"posts": []}
