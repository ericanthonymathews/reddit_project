"""empty message

Revision ID: 2b8ca8eadb17
Revises: 287d29918e04
Create Date: 2023-01-29 11:52:28.387806

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2b8ca8eadb17'
down_revision = '287d29918e04'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('communities', sa.Column('edited_by', sa.String(length=50), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('communities', 'edited_by')
    # ### end Alembic commands ###