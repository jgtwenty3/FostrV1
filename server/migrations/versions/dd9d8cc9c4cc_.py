"""empty message

Revision ID: dd9d8cc9c4cc
Revises: b5bc030caaec
Create Date: 2024-03-06 11:37:06.075408

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dd9d8cc9c4cc'
down_revision = 'b5bc030caaec'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.drop_constraint('fk_messages_animal_id_animals', type_='foreignkey')
        batch_op.drop_column('animal_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.add_column(sa.Column('animal_id', sa.INTEGER(), nullable=False))
        batch_op.create_foreign_key('fk_messages_animal_id_animals', 'animals', ['animal_id'], ['id'])

    # ### end Alembic commands ###
