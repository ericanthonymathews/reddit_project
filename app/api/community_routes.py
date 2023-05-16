from datetime import datetime

from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import AddCommunityForm, AddPostForm, EditCommunityForm, EditPostForm
from app.models import Community, Post, db

community_routes = Blueprint('communities', __name__)

# get all communities


@community_routes.route('/')
def communities():
    """Returns all communities available

    Returns:
        dict: all communities
    """
    communities = Community.query.all()
    if communities:
        return {"communities": [community.to_dict() for community in communities]}
    else:
        return {"communities": []}

# add a single community


@community_routes.route('/', methods=["POST"])
@login_required
def add_community():
    """Adds a single community to the database and returns the new community or errors out and returns errors

    Returns:
        dict: new community
    """
    form = AddCommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        community = Community(
            user_id=current_user.id,
            name=form.data['name'],
            header=form.data['header'],
            about=form.data['about']
        )
        db.session.add(community)
        db.session.commit()
        return community.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# get community information by id


@community_routes.route('/<int:id>')
def community_by_id(id):
    """Returns the information for a single community or an empty dictionary if the community doesn't exist

    Args:
        id (number): id of single community

    Returns:
        dict: information for one community
    """
    community = Community.query.get(id)
    if community:
        return community.to_dict()
    else:
        return {}

# edit a community by id


@community_routes.route('/<int:id>', methods=["PUT"])
def edit_community(id):
    """Edits and returns the community or returns the error and a 401

    Args:
        id (number): id of the community

    Returns:
        dict: edited single community
    """
    form = EditCommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        community = Community.query.get(id)
        community.header = form.data['header']
        community.about = form.data['about']
        community.edited_by = current_user.username
        community.updated_at = datetime.now()
        db.session.commit()
        return community.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
    """Takes the id of a community and returns the posts for that community

    Args:
        id (number): id of single community

    Returns:
       dict: all the posts for the single community
    """
    posts = Post.query.filter_by(community_id=id).all()
    if posts:
        return {"posts": [post.to_dict() for post in posts]}
    else:
        return {"posts": []}


@community_routes.route("/<int:community_id>/posts/<int:id>", methods=["PUT"])
@login_required
def edit_post(community_id, id):
    """
    Edits a Post and returns the edited post
    """
    form = EditPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(id)
        post.edited_by = form.data['edited_by']
        post.body = form.data['body']
        post.updated_at = datetime.now()
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
