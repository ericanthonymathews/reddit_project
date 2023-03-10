from app.models import db, Post, environment, SCHEMA


def seed_posts():
    post1 = Post(
        user_id=2,
        community_id=3,
        title="Just watched the show. Can't say enough I'm in!",
        body="I don't think I need to explain the premise to you all. But the pace of this show is amazing! A very peaceful dynamic between everyone, and the competition is very light-hearted (uwu). When time starts, everyone calmly begins baking. I fall asleep to this show."
    )
    post2 = Post(
        user_id=3,
        community_id=2,
        title="AITA for being made out of corn flour?",
        body="Title says it all pretty much. Am I an arepa just because I'm made out of corn flour? My friends have been noticing that I might be an arepa lately. Thanks in advance."
    )
    post3 = Post(
        user_id=2,
        community_id=1,
        title="I HATE it when it's too cold for my starter to be active.",
        body="I freggin' hate it when I wake up and there are no level mark differences in my starter jar. It was too cold last night? Like: is the yeast even active. Rhetorical. But is the yeast even active? Anyone feel me?"
    )
    post4 = Post(
        user_id=4,
        community_id=4,
        title="Pretty sure Subway's grains aren't natty'",
        body="Yea so they say the bread is made from all natural whole grains, but I'm starting to suspect that their bread size and taste are chemically enhanced. Bread looks bigger than sourdough I've been proofing for some time now. Maybe I'm just peanut butter n' jealous."
    )
    post5 = Post(
        user_id=5,
        community_id=5,
        title="I can't feel my bread.",
        body="I woke up this morning, and I couldn't feel my bread. What is wrong with me: does anyone feel bread?"
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")
