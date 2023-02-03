from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Community(db.Model):
    __tablename__ = 'communities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    name = db.Column(db.String(50), nullable=False, unique=True)
    header = db.Column(db.String(60), nullable=False)
    about = db.Column(db.Text, nullable=False)
    edited_by = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    ## one to many relationships
    posts = db.relationship("Post", back_populates="community")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'header': self.header,
            'about': self.about,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'edited_by': self.edited_by,
            'user_id': self.user_id,
        }
