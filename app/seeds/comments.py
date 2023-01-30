from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    comment1 = Comment(
        user_id=2,
        post_id=2,
        description="@OP, cornflour tortillas as well as tamales are also made with cornflour, Just because you're made of it doesn't necessarily make you and Arepa. Hope that helps.",
    )
    comment2 = Comment(
        user_id=3,
        post_id=3,
        description="You can always keep it in a warmer place. Sorry if that doesn't exist for you"
    )
    comment3 = Comment(
        user_id=3,
        post_id=1,
        description="Welcome to the community, baker."
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")
