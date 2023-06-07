from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import AddVoteForm, EditVoteForm
from app.models import Vote, db

vote_routes = Blueprint('votes', __name__)

# get votes by userId


@vote_routes.route('/')
@login_required
def votes_by_user_id():
    """Returns all the votes made by the user based on id

    Returns:
        list: vote dictionaries
    """
    votes = Vote.query.filter_by(user_id=current_user.id).all()
    if votes:
        return {"votes": [vote.to_dict() for vote in votes]}
    else:
        return {"votes": []}


@vote_routes.route('/', methods=["POST"])
@login_required
def add_vote():

    form = AddVoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        vote = Vote(
            user_id=current_user.id,
            post_id=form.data['post_id'],
            value=form.data['value'],
        )
        db.session.add(vote)
        db.session.commit()
        return vote.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@vote_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_vote(id):

    form = EditVoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        vote = Vote.query.get(id)
        vote.value = form.data['value']
        db.session.commit()
        return vote.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@vote_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_vote(id):

    vote = Vote.query.get(id)
    db.session.delete(vote)
    db.session.commit()
    return {"deleted_vote_id": id}
