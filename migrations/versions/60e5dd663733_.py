"""empty message

Revision ID: 60e5dd663733
Revises: 726549548463
Create Date: 2023-11-02 20:41:33.067851

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '60e5dd663733'
down_revision = '726549548463'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('surname', sa.String(length=200), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('surname')

    # ### end Alembic commands ###