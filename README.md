# Northcoders News API

## *Welcome to Northcoders News backend!* 📰 💻

## Hosted App

Please access the hosted version of this API at: [insert hosted site]

## Project Background

This API was created as the backend service for a full-stack social news application, drawing inspiration from Reddit. The purpose of the API is to access application data programmatically and provide the information (users, articles, comments, and topic categories) to the frontend architecture. It is built using RESTful principles, Javascript, Express.js, PostgreSQL and node-postgres.

## Frontend Repo

The frontend repository can be found here:
The hosted frontend project can be found here:

## Endpoints

### *The API has the following endpoints available* 

GET /api/  

>returns a list of all of the available endpoints

GET /api/topics

>returns a list of topics (categories)

GET  /api/users

>returns a list of all current users

GET /api/articles

>returns a list of all articles
>*accepts queries*
>* filter by topic 
>* sort by any valid column
>* specify ascending or descending order of response 

GET /api/articles/:article_id

>returns a specific article, including associated comments

PATCH /api/articles/:article_id

>patches a specific article in order to add or remove a vote

POST /api/articles/:article_id/comments

>posts a new comment to a specific article

DELETE /api/articles/comments/:comment_id

>deletes a specific comment


## Minimum Requirements

### To run the App locally:
* Node v17.3.0
* NPM v8.3.1 
* Postgres v8.7.3 
* pg-format v1.0.4 
* dotenv v16.0.0
    
### To run test suite:
* Jest v27.5.1
* jest-extended v2.0.0
* jest-sorted v1.0.14
* Supertest v6.2.2

*Earlier versions have not been tested and may not work.*

## Setup

### CLI
Clone this repository locally

>git clone

Install dependencies with NPM 

>npm i

Install dev dependencies

>npm i -D jest
>npm i -D supertest
>npm i--save-dev jest-sorted
>npm i--dave-dev jest-extended

### Environment

#### Create two .env files in the root directory of the project to connect to the relevant database:

.env.test should contain

>PGDATABASE=nc_news_test

.env.development should contain

>PGDATABASE=nc_news

### CLI
Create the database
>npm run setup-dbs
Seed the database
>npm run seed

### Testing

Run all tests

>npm t 

Ignore utils tests

>npm app.test.js

### Running the server locally

>npm start

Once the app is running, it will open a local port (9090). Make requests to the server using an application like Insomnia and the available endpoints.

### Thank you for looking through this repository! Check out the frontend (*add link) to see the whole application in action.

👩🏽‍💻 ***I'm always happy to connect with new people and opportunities!*** 

👋🏽 Find me here on *[GitHub](https://github.com/maire-digital "let's connect!")*, or on *[LinkedIn](https://www.linkedin.com/in/maire-dev/ "let's connect!")* 