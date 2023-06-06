from flask import Blueprint, jsonify, request, session
from flask_login import current_user, login_required, login_user, logout_user

from app.forms import LoginForm, SignUpForm
from app.models import User, db

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """Simple function that turns the WTForms validation errors into a simple list

    Args:
        validation_errors (dict): A dictionary containing a list of errors for each field. Empty if the form hasn’t been validated, or there were no errors.

    Returns:
        list: strings containing error info (field and error)
    """

    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate() -> dict:
    """
     Authenticates a user.

    Returns:
        dict: {
            'id': 123,
            'username': 'someperson2',
            'email': 'realperson@gmail.com',
            'is_deleted': False,
        }
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """Logs a user out

    Returns:
        string: Confirmation that the user is logged out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """Creates a new user using WTForm data and logs them in

    Returns:
        dict: dictionary of new user created
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
