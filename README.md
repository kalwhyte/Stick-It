# Stick-It 
**[trello-clone]**
Stick-It is a trello clone with some abstract features such as drag and drop, image background, made using Django Rest Framework, SASS, React, and Redis.

## Features
- Register and Login
    - JWT Authentication to connect DRF and React
    - Can login with username or email
- Projects (Teams)
    - Create Projects
    - Invite members to join projects via one time link
    - Change member access level - Admin or Normal
        - Admin can edit project details, invite new members, and change other members' access levels.
- Boards
    - Create personal boards or project boards
    - Recently Viewed Boards
    - Starred Boards
    - Create and reorder lists
    - Create, reorder, and change list of cards
        - Add labels to cards
        - Assign members to cards
        - Add attachments to cards
        - Add comments to cards
    - Search
        - Autocomplete (Debounced)
    - Unsplash API Integration
        - Set environment variable REACT_APP_UNSPLASH_API_ACCESS_KEY with access key
    - Automatically adapt header and board title styling based on brightness of board background
- Notifications
    - When someone assigns you to a card
    - When someone comments on a card you're assigned to
    - When you're invited to a project
    - When someone makes you admin of a project

## Getting Started
1. Install [Python](https://www.python.org/downloads/), [Yarn](https://classic.yarnpkg.com/en/docs/install/), [Redis](https://redis.io/download).
2. Clone the repo
```
$ git clone https://github.com/kalwhyte/Stick-It.git
$ cd Stick-It
```
3. Install [pipenv](https://pypi.org/project/pipenv/), a python virtual environment manager. Install backend dependencies and run migrations to create database. Default database is SQLite.
```
$ cd backend
$ pipenv install
$ pipenv run python manage.py migrate
```
4. Install frontend dependencies.
```
$ cd frontend
$ yarn install
```
5. Run redis on port 6380
``` 
$ redis-server --port 6380
```
6. Run both frontend and backend servers with following commands in appropriate directories.
```
$ pipenv run python manage.py runserver
$ yarn start
```

## Screenshots

# Using Postman to test the API

|-----------------------------------------------------------------|
Project List: To test the project list endpoint, make a GET request to the base URL, which is usually something like http://127.0.0.1:8000/projects/. This will retrieve a list of projects.
|-----------------------------------------------------------------|
    GET http://127.0.0.1:8000/projects/

Project Detail: To test the project detail endpoint for a specific project, make a GET request to a URL that includes the project's primary key (pk), such as http://127.0.0.1:8000/projects/1/, replacing 1 with the actual project's ID.
|-----------------------------------------------------------------|
    GET http://127.0.0.1:8000/projects/1/
Project Member List: To test the project member list endpoint for a specific project, make a GET request to a URL that includes the project's primary key, followed by /members/, such as http://127.0.0.1:8000/projects/1/members/.
|-----------------------------------------------------------------|
    GET http://127.0.0.1:8000/projects/6/members/
Project Member Detail: To test the project member detail endpoint for a specific member within a project, make a GET request to a URL that includes both the project's primary key and the member's primary key, such as http://127.0.0.1:8000/projects/1/members/2/, replacing 1 and 2 with the actual project and member IDs.
|-----------------------------------------------------------------|
    GET http://127.0.0.1:8000/projects/6/members/7/


Send Project Invite: To test sending a project invite, you would typically use a POST request to the project invite URL, such as http://127.0.0.1:8000/projects/1/invite/, replacing 1 with the actual project's ID. You'll need to provide the necessary data in the request body.
|-----------------------------------------------------------------|

Accept Project Invite: To test accepting a project invite, you would typically use a GET or POST request to the project invite URL with the token parameter, such as http://127.0.0.1:8000/projects/join/your-token/, replacing your-token with the actual token received when being invited to the project.
