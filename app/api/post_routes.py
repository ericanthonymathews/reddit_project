from flask import Blueprint, jsonify, request
from app.models import db, Post
from flask_login import login_required, current_user


post_routes = Blueprint('posts', __name__)

# get all posts


@post_routes.route('/')
def posts():
    posts = Post.query.all()
    if posts:
        return {"posts": [post.to_dict() for post in posts]}
    else:
        return {"posts": []}
