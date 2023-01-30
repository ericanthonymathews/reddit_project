from app.models import db, Community, environment, SCHEMA


def seed_communities():
    whysosourdough = Community(
        user_id=2,
        name='WhySoSourDough',
        header="Why So Sourdough?",
        about="You know exactly what we're talkin' 'bout: succinct summaries of your bread-related woes. You can ask about anything sourdough-related as well. We're committed to creating a safe place to talk about sourdough starters, levains, literally anything. Number one rule is patience."
    )
    aita = Community(
        user_id=2,
        name='AITA',
        header="Am I The Arepa?",
        about="A place to discuss whether or not your an Arepa. Then we can discuss if you are THE arepa."
    )
    greatbritishbakingshow = Community(
        user_id=3,
        name='GreatBritishBakingShow',
        header="Great British Baking Show",
        about="Community to discuss the greatness of the Great British Baking Show. Let the calm energy of baking and bread permeate reddit until it becomes breadit. It starts here ladies, gentlemen, all you fine folks."
    )

    db.session.add(whysosourdough)
    db.session.add(aita)
    db.session.add(greatbritishbakingshow)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_communities():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.communities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM communities")

    db.session.commit()
