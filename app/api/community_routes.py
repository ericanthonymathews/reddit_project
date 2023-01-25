from flask import Blueprint, jsonify, request
from app.models import db, Post, Community
from flask_login import login_required, current_user

community_routes = Blueprint('communities', __name__)


@community_routes.route('/<int:id>')
def community_by_id(id):
    community = Community.query.get(id)
    if community:
        return community.to_dict()
    else:
        return {}

# get all posts by communityId


@community_routes.route('/<int:id>/posts')
def posts_by_id(id):
    posts = Post.query.filter_by(community_id=id).all()
    if posts:
        return {"posts": [post.to_dict() for post in posts]}
    else:
        return {"posts": []}
