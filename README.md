# Flask React Project

This is the starter for the Flask React project.

## Getting started

1. Clone this repository (only this branch)

2. Install dependencies

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## MVP List

Bread-It is a Reddit clone where users can read, like, and comment on posts within communities and on the home page.<p>
Live site: [Bread-It](https://bread-it.onrender.com/)<p>

## 1. New account creation, log in, log out, and guest/demo login

- Users can sign up, log in, and log out.
- Users can use a demo log in to try the site.
- Users can't use certain features without logging in.
- Logged in users are directed to the home page which displays the most recent posts.
- Logged out users are only able to use read functionality.
- Demo button for logging in.

## 2. Posts

- Logged in user can add a post.
- Logged in users can edit and delete their own post.
- Logged in users can vote on a post.

## 3. Comments

- Logged in user can add a comment on a post.
- Logged in users can edit and delete their own comment.
- If the post belongs to the user, the comment will denote that fact with a star and the text "OP"

## 4. Communities

- Logged in users can make communities.
- Logged in users (eventually mods) can edit their own communities.

## 5. Votes

- Logged in users can make upvote or downvote a post.
- Logged in users can edit their vote or delete their vote by pressing clicking on arrows.

## USER STORIES

## Users

### Sign Up

- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  - When I'm on the `/` page:
    - I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the sign-up form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the sign-up form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.

### Log in

- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  - When I'm on the `/` page:
    - I would like to be able to enter my email and password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the lob-up form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the log-in form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      - So that I can try again without needing to refill forms I entered valid data into.

### Demo User

- As an unregistered and unauthorized user, I would like an easy to find and clear button on both the signup and login modals to allow me to visit the site as a guest without signing up or logging in.
  - When I'm on any page:
    - I can click on a Demo User button to log me in and allow me access as a normal user.
      - So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

- As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  - While on any page of the site:
    - I can log out of my account and be redirected to a page displaying the home page.
      - So that I can easily log out to keep my information secure.

## Posts

### Create Posts

- As a logged in user, I want to be able to make new posts.
  - When I'm on the `/communities/:communityId` page:
    - I can write and submit a new post.

### Viewing Songs

- As a logged in _or_ logged out user, I want to be able to view a selection of posts.
  - When I'm on the `/`, `/communities/:communityId`, or
    `/communities/:communityId/posts/:postId` page:
    - I can see posts, votes, and number of reviews
    - I can click on posts and see the posts as well as their votes and reviews.

### Updating Posts

- As a logged in user, I want to be able to edit my posts by clicking an Edit button associated with the posts on the
  `/communities/:communityId/posts/:postId` page.
  _ I can click "Edit" to make permanent changes to the post.
  _ So that I can edit the post body.

### Deleting Posts

- As a logged in user, I want to be able to delete my posts by clicking a Delete button associated with the post on the
  `/communities/:communityId/posts/:postId` page.
  - I can click "Delete" to permanently delete the body I have posted.

## Comments

### Create Comments

- As a logged in user, I want to be able to post new comments.
  - When I'm on the `/communities/:communityId/posts/:postId` page:
    - I can write in a form and click on the `Add a Comment` to add a comment.
    - I can create a comment, and upon creation, it renders on the post's detail page.

### Viewing Comments

- As a logged in _or_ logged out user, I want to be able to view a selection of comments.

  - When I'm on the `/`, `/communities/:communityId`, or
    `/communities/:communityId/posts/:postId` page:

    - I can see comment in the on the post details page.
    - I can see the number of comments anywhere the post is diplayed.

### Updating Comments

- As a logged in user, I want to be able to edit my comments by clicking an Edit button associated with the comment on the `/communities/:communityId/posts/:postId` page.
  - I can click "Edit" to make permanent changes to the community I have posted.
    - So that I can change the community if it needs to be edited.
  - Edits show time of edit

### Deleting Comments

- As a logged in user, I want to be able to delete my comments by clicking a Delete button on the comment.
  - When I'm on the`/communities/:communityId/posts/:postId` page:
    - I can click "Delete" to permanently delete a comment I have created.
    - Record of a comment will still exist on the page.

## Communities

### Create Communities

- As a logged in user, I want to be able to host new communities.
  - When I'm on the `/` page:
    - I can click on the `Add a Community` button that directs me to a formpage.
    - I can create a community, and upon creation, I'm navigated to that new community.

### Viewing Communities

- As a logged in _or_ logged out user, I want to be able to view a selection of Communites.

  - When I'm on the `/` page:

    - I can see playlists in the `popular communities` section.
    - I can click on these communities and see the info and posts associated.

  - When I'm on the `/communities/:communityId` page:
    - I can view the posts within the community.
    - I can see the about, name, and header of the community
    - I can see the associated information of the each post in the community.

### Updating Communities

- As a logged in user, I want to be able to edit my communities by clicking an Edit button associated with the community on the `/communities/:communityId` page.
  - I can click "Edit" to make permanent changes to the community I have posted.
    - So that I can change the community if it needs to be edited.

## Votes

### Create Votes

- As a logged in user, I want to be able to vote on posts.
  - When I'm on the `/`, `/communities/:communityId`, or
    `/communities/:communityId/posts/:postId` page:
    - I can click on an arrow button that votes on the post.

### Viewing Votes

- As a logged in _or_ logged out user, I want to be able to view votes associated with each post.

  - When I'm on the any page with a post:

    - I can see post's votes.
    - I can see the value of my own vote via colored in arrows.

### Updating Votes

- As a logged in user, I want to be able to edit my votes by clicking the opposite voting button associated with the post.
  - I can click "Upvote" or "Downvote" to make permanent changes to the vote.
    - So that I can change the vote to reflect my current opinion of the post.

### Deleting Votes

- As a logged in user, I want to be able to delet my votes by clicking the same voting button associated with the post as my original vote.
  - I can click "Upvote" or "Downvote" to make permanent changes to the vote.
    - So that I can remove my vote to reflect my current opinion of the post.
