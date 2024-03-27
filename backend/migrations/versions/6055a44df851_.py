"""empty message

Revision ID: 6055a44df851
Revises: 1e50cb39b744
Create Date: 2023-12-06 00:11:50.518490

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6055a44df851'
down_revision = '1e50cb39b744'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.alter_column('value',
               existing_type=mysql.VARCHAR(length=6),
               type_=sa.String(length=5),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('company', schema=None) as batch_op:
        batch_op.alter_column('value',
               existing_type=sa.String(length=5),
               type_=mysql.VARCHAR(length=6),
               existing_nullable=False)

    # ### end Alembic commands ###