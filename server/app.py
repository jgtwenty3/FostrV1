from flask import Flask, request, session, redirect, url_for, render_template, jsonify
from flask_bcrypt import Bcrypt
from sqlalchemy import desc
from flask_socketio import SocketIO, emit

from config import app, db, migrate, api

from models import db, User, Shelter, Animal, Message, Chat

# Views
socketio = SocketIO(app, cors_allowed_origins="*")

chats = [
    {"id": 1, "user1": 1, "user2": 2},
    {"id": 2, "user1": 1, "user2": 3},
    # ... other chat entries
]
messages = [
    {"id": 1, "chat_id": 1, "sender": 1, "content": "Hello, how are you?"},
    {"id": 2, "chat_id": 1, "sender": 2, "content": "I'm good, thank you!"},
    # ... other message entries
]

def get_authenticated_user_id():
    return  current_user.id
   

def home():
    return ''

@app.route('/signup', methods=['POST'])
def signup():
    json_data = request.get_json()

    # Validate required fields
    required_fields = ['username', 'password', 'email', 'usertype', 'phone', 'address']
    for field in required_fields:
        if field not in json_data:
            return {'error': f'Missing required field: {field}'}, 400

    # Validate usertype
    valid_usertypes = ['user', 'admin']
    if json_data['usertype'] not in valid_usertypes:
        return {'error': f'Invalid usertype. Must be one of: {", ".join(valid_usertypes)}'}, 400
    
    

    # Create a new user instance
    new_user = User(
        username=json_data['username'],
        password_hash=json_data['password'],  # Use password_hash instead of password
        usertype=json_data['usertype'],
        email=json_data['email'],
        phone=json_data['phone'],
        address=json_data['address'],
    )

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return {'message': 'User registered successfully'}, 201


@app.route('/login', methods=['POST'])
def login():
    json_data = request.get_json()

    # Validate required fields
    required_fields = ['username', 'password']
    for field in required_fields:
        if field not in json_data:
            return {'error': f'Missing required field: {field}'}, 400

    user = User.query.filter(User.username == json_data.get('username')).first()

    if not user:
        return {'error': 'User not found'}, 404

    if not user.authenticate(json_data.get('password')):
        return {'error': 'Invalid password'}, 401

    # Update session with user_id and user_type
    session['user_id'] = user.id
    session['user_type'] = user.usertype

    socketio.emit('message', {'content': f'Welcome, {user.username}!'}, namespace='/')

    return user.to_dict(), 200  


@app.route('/check_session', methods=['GET'])
def check_session():
    user_id = session.get('user_id')

    if user_id is not None:
        user = User.query.get(user_id)
        if user:
            return user.to_dict(), 200
    return {}, 401

@app.route('/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)
    session.pop('user_type', None)
    return {}, 204


@app.route('/animals', methods=['GET', 'POST'])
def all_animals():

    if request.method == 'GET':
        all_animals = Animal.query.all()
        results = []
        for animal in all_animals:
            results.append(animal.to_dict())
        return results, 200

    elif request.method == 'POST':
        json_data = request.get_json()
        new_animal = Animal(
            name=json_data.get('name'),
            image=json_data.get('image'),
            arrival=json_data.get('arrival'),
            rescuer=json_data.get('rescuer'), 
            rescuedfrom=json_data.get('rescuedfrom'), 
            species=json_data.get('species'),
            age=json_data.get('age'),
            sex=json_data.get('sex'),
            breed=json_data.get('breed'),
            color=json_data.get('color'),
            weight=json_data.get('weight'),
            description=json_data.get('description'),
            rabies=json_data.get('rabies'),
            snap=json_data.get('snap'),  
            dhpp=json_data.get('dhpp'),  
            specialneeds=json_data.get('specialneeds'), 
            adoptionstatus=json_data.get('adoptionstatus'),
            destination=json_data.get('destination'),
            microchip=json_data.get('microchip'),
            shelter_id=json_data.get('shelter_id'),
            user_id=json_data.get('user_id')
        )
        db.session.add(new_animal)
        db.session.commit()

        return new_animal.to_dict(), 201
        

@app.route('/animals/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def animals_by_id(id):
    
    animal = Animal.query.filter(Animal.id == id).first()

    if animal is None: 
        return {'error': "Animal not found"}, 404
    if request.method == 'GET':
        return animal.to_dict(), 200
    elif request.method == 'DELETE': 
        db.session.delete(animal)
        db.session.commit()
        return{}, 204
    elif request.method == 'PATCH':
        json_data = request.get_json()
        print(f"Received PATCH request with data: {json_data}")
    
        for field in json_data: 
            if field != "shelter":
                print(f"Updating field {field} with value {json_data[field]}")
                setattr(animal, field, json_data[field])

        db.session.add(animal)
        db.session.commit()

    return animal.to_dict(), 200

@app.route('/shelters', methods = ['GET', 'POST'])
def all_shelters ():
    if request.method == 'GET':
        all_shelters = Shelter.query.all()
        results = []
        for shelter in all_shelters:
            results.append(shelter.to_dict())
        return results, 200

    elif request.method == 'POST':
        json_data = request.get_json()

        try:
            new_shelter = Shelter(
                user_id = json_data.get('user_id'),
                name=json_data.get('name'),
                owner = json_data.get('owner'),
                address = json_data.get('address'),
                email = json_data.get('email'),
                phone = json_data.get('phone'),
                about = json_data.get('about')
            )
            db.session.add(new_shelter)
            db.session.commit()

            return new_shelter.to_dict(), 201
        except:
            return "Error adding new shelter", 400

@app.route('/shelters/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def shelters_by_id(id):
    shelter = Shelter.query.filter(Shelter.id == id).first()

    if shelter is None:
        return {'error': "Shelter not found"}, 404

    if request.method == 'GET':
        return shelter.to_dict(), 200
    elif request.method == 'DELETE':
        db.session.delete(shelter)
        db.session.commit()
        return {}, 204
    elif request.method == 'PATCH':
        json_data = request.get_json()

        for field in json_data:
            setattr(shelter, field, json_data.get(field))

        db.session.commit()

        return shelter.to_dict(), 200

@socketio.on('message')
def handle_message(data):
    sender_id = data.get('senderId')
    receiver_id = data.get('receiverId')
    content = data.get('content')

    # Save the message to the database
    new_message = Message(sender_id=sender_id, receiver_id=receiver_id, content=content)
    db.session.add(new_message)
    db.session.commit()

    # Emit the message to the sender and receiver
    emit('message', new_message.to_dict(), room=f'user_{sender_id}')
    emit('message', new_message.to_dict(), room=f'user_{receiver_id}')



@app.route('/messages', methods=['GET'])
def get_user_messages():
    user_id = session.get('user_id')

    if user_id is not None:
        try:
           
            page = int(request.args.get('page', 1))
            limit = int(request.args.get('limit', 10))

            
            offset = (page - 1) * limit

            # Fetch messages for the current user ordered by timestamp
            messages = Message.query.filter(
                (Message.sender_id == user_id) | (Message.receiver_id == user_id)
            ).order_by(desc(Message.timestamp)).offset(offset).limit(limit).all()

            # Convert messages to a list of dictionaries
            messages_list = [message.to_dict() for message in messages]

            return messages_list, 200

        except ValueError:
            return {'error': 'Invalid page or limit parameter'}, 400

    return {'error': 'User not authenticated'}, 401

@app.route('/create_chat', methods=['POST'])
def create_chat():
    try:
        data = request.get_json()
        sender_id = data.get('sender_Id')  # Make sure the keys match the frontend data
        receiver_id = data.get('receiver_Id')

        # Create a new chat
        new_chat = Chat(sender_id=sender_id, receiver_id=receiver_id)
        db.session.add(new_chat)
        db.session.commit()

        return jsonify({'message': 'Chat created successfully'}), 201
    except Exception as e:
        print(e)
        return jsonify({'error': 'Error creating chat'}), 500

@app.route('/chats', methods=['GET'])
def get_user_chats():
    user_id = session.get('user_id')

    if user_id is not None:
        # Fetch chats for the current user
        chats = Chat.query.filter(
            (Chat.sender_id == user_id) | (Chat.receiver_id == user_id)
        ).all()

        # Convert chats to a list of dictionaries
        chats_list = [chat.to_dict() for chat in chats]

        return chats_list, 200

    return {'error': 'User not authenticated'}, 401

    return {'message': 'Chat created successfully'}, 201

@app.route('/chats/<int:chat_id>/messages', methods=['GET'])
def get_chat_messages(chat_id):
    user_id = session.get('user_id')

    if user_id is not None:
        # Fetch messages for the specific chat
        messages = Message.query.filter_by(chat_id=chat_id).all()

        # Convert messages to a list of dictionaries
        messages_list = [message.to_dict() for message in messages]

        return messages_list, 200

    return {'error': 'User not authenticated'}, 401

@app.route('/chat/<int:chat_id>/messages', methods=['GET'])
def get_messages(chat_id):
    chat_messages = [message for message in messages if message['chat_id'] == chat_id]
    return jsonify(chat_messages)

@app.route('/chat/<int:chat_id>/send_message', methods=['POST'])
def send_message(chat_id):
    data = request.json
    content = data.get('content')
    sender = get_authenticated_user_id()
    new_message = {"id": len(messages) + 1, "chat_id": chat_id, "sender": sender, "content": content}
    messages.append(new_message)
    return jsonify({"success": True, "message": new_message})

if __name__ == '__main__':
    app.run(port=5555, debug=True)



