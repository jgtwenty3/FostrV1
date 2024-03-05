#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Shelter, Animal

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Seed Users
        for _ in range(10):  # Adjust the number of users you want
            user = User(
                username=fake.user_name(),
                _password_hash=fake.password(),
                usertype=rc(['admin', 'user']),
                email=fake.email(),
                phone=fake.phone_number(),
                address=fake.address(),
            )
            db.session.add(user)

        # Seed Shelters
        for _ in range(5):  # Adjust the number of shelters you want
            shelter = Shelter(
                user_id = randint(1,10),
                name=fake.company(),
                owner=fake.name(),
                address=fake.address(),
                email=fake.company_email(),
                phone = fake.phone_number(),
                about = fake.sentence()
            )
            db.session.add(shelter)

        db.session.commit()

        # Seed Animals
        for _ in range(30):  # Adjust the number of animals you want
            species = rc(['Dog', 'Cat'])
            image_url = (
                'https://placekitten.com/300/200' if species == 'Cat'
                else 'https://placedog.net/500/400'  # Use placepuppy for smaller puppy images
            )

            animal = Animal(
                name=fake.first_name(),
                image=image_url,
                arrival=fake.date_this_decade(),
                rescuer = fake.name(),
                rescuedfrom = fake.address(),
                species=species,
                age=randint(1, 10),
                sex=rc(['Male', 'Female']),
                breed=fake.word(),
                color=fake.color_name(),
                weight=randint(1, 50),
                description=fake.text(),
                rabies = fake.date(),
                snap = fake.date(),
                dhpp = fake.date(),
                spayneuter = rc(['yes', 'no']),
                specialneeds=fake.sentence(),
                adoptionstatus=rc(["Available", "Adopted", "Fostr'd"]),
                destination=fake.address(),
                microchip = randint(1, 999999),
                shelter_id=randint(1, Shelter.query.count()),  # Ensure there are shelters in the database
                user_id=randint(1, User.query.count()),  # Ensure there are users in the database
            )
            db.session.add(animal)

        db.session.commit()

        print("Seed completed!")