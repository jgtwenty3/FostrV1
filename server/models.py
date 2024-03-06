from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime

from config import db

bcrypt = Bcrypt()



class User(db.Model, SerializerMixin):
    __tablename__= 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    _password_hash = db.Column(db.String(100), unique = True, nullable=False)
    usertype = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    address = db.Column(db.String(255), nullable=False)

    @hybrid_property
    def password_hash(self):
        """getter"""
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, new_password):
        """setter"""
        pass_hash = bcrypt.generate_password_hash(new_password.encode('utf-8'))
        self._password_hash = pass_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8')) if self._password_hash else False

    # Add relationships
    animals = db.relationship('Animal', back_populates='user')

    # Update serialization rules
    serialize_rules = ['-animal.user']

    def __repr__(self):
        return f'<User {self.id}: {self.username}>'


class Shelter(db.Model, SerializerMixin):
    __tablename__ = 'shelters'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String, unique=True, nullable=False)
    owner = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False, unique = True)
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.String, nullable = False, unique = True)
    about = db.Column(db.String)
    

    # Add relationships
    animals = db.relationship('Animal', back_populates='shelter')

    # Update serialization rules
    serialize_rules = ['-animals.shelter']

    def __repr__(self):
        return f'<Shelter {self.id}: {self.name}>'

class Message(db.Model):
        __tablename__ = 'messages'

        id = db.Column(db.Integer, primary_key = True)
        sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
        receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
        chat_id = db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
        content = db.Column(db.String(255), nullable = False)
        timestamp = db.Column(db.DateTime, default = datetime.utcnow, nullable = False)

        sender = db.relationship('User', foreign_keys=[sender_id], backref = 'sent_messages')
        receiver = db.relationship('User', foreign_keys = [receiver_id], backref = 'received_messages')
        chat = db.relationship('Chat', back_populates='messages') 


        def to_dict(self):
            return {
                'id': self.id,
                'sender': self.sender.username,
                'receiver': self.receiver.username,
                'content': self.content,
                'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S')
            }

class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    arrival = db.Column(db.String)
    rescuer = db.Column(db.String)
    rescuedfrom = db.Column(db.String)
    species = db.Column(db.String)
    age = db.Column(db.Integer)
    sex = db.Column(db.String)
    breed = db.Column(db.String)
    color = db.Column(db.String)
    weight = db.Column(db.Integer)
    description = db.Column(db.String)
    rabies = db.Column(db.String)
    snap = db.Column(db.String)
    dhpp= db.Column(db.String)
    spayneuter = db.Column(db.String)
    specialneeds = db.Column(db.String)
    adoptionstatus = db.Column(db.String)
    destination = db.Column(db.String)
    microchip = db.Column(db.String)
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelters.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Add relationships
    shelter = db.relationship('Shelter', back_populates='animals' )
    user = db.relationship('User', back_populates='animals')

    # Update serialization rules
    serialize_rules = ['-shelter.animals', '-user']

class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Define the foreign key relationship with the Message model
    messages = db.relationship('Message', back_populates='chat', viewonly=True)

    def __init__(self, sender_id, receiver_id):
        self.sender_id = sender_id
        self.receiver_id = receiver_id

    def to_dict(self):
        return {
            'id': self.id,
            'user1_id': self.user1_id,
            'user2_id': self.user2_id,
            # Add other fields as needed
        }

    

    def __repr__(self):
        return f'<Animal {self.id}: {self.name}>'



    
