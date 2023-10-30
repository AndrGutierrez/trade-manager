"""empty message

Revision ID: ce09bc865593
Revises: abe4fd8e05af
Create Date: 2023-10-24 15:20:15.607434

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'ce09bc865593'
down_revision = 'abe4fd8e05af'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.drop_column('a')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.add_column(sa.Column('a', mysql.VARCHAR(length=255), nullable=True))

    # ### end Alembic commands ###