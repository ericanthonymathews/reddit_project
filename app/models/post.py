from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))
    community_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("communities.id")))
    title = db.Column(db.String(300), nullable=False)
    body = db.Column(db.Text, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())
    edited_by = db.Column(db.String(50))

    # create one to many relationships
    user = db.relationship("User", back_populates='posts')
    community = db.relationship("Community", back_populates='posts')
    comments = db.relationship("Comment", back_populates="post")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.user.username,
            'user_is_deleted': self.user.is_deleted,
            'community_id': self.community_id,
            'community_name': self.community.name,
            "comments": [com.to_dict() for com in self.comments],
            'title': self.title,
            'body': self.body,
            'is_deleted': self.is_deleted,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'edited_by': self.edited_by
        }
