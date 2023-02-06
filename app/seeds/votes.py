from app.models import db, Vote, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_votes():
    vote1 = Vote(
        user_id=2, post_id=1, value=1)
    vote2 = Vote(
        user_id=2, post_id=2, value=1)
    vote3 = Vote(
        user_id=3, post_id=2, value=-1)
    vote4 = Vote(
        user_id=4, post_id=4, value=1)
    vote5 = Vote(
        user_id=5, post_id=5, value=1)

    db.session.add(vote1)
    db.session.add(vote2)
    db.session.add(vote3)
    db.session.add(vote4)
    db.session.add(vote5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_votes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.votes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM votes")

    db.session.commit()
