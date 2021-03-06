# Northcoders News API

## π° *Welcome to Northcoders News backend!* 

<br> π©π½βπ» Hi! I'm MΓ‘ire, and this repository is part of a portfolio piece created over five days during my time at *[Northcoders](https://northcoders.com/company/about-us)* full-stack Javascript development boot-camp 

ππ½ Find me here on *[GitHub](https://github.com/maire-digital "let's connect!")*, or on *[LinkedIn](https://www.linkedin.com/in/maire-dev/ "let's connect!")* 

## <br> Project Background

This API was created as the backend service for a full-stack social news application, drawing inspiration from Reddit. The purpose of the API is to access application data programmatically and provide the information (users, articles, comments, and topic categories) to the frontend architecture. It is built using `RESTful` principles, `Javascript`, `Express.js`, `PostgreSQL` and `node-postgres`.

*You can access a hosted version of this API on [Heroku](https://nc-news-maire.herokuapp.com/api/). Use the paths below to request data and explore the server.*

## <br> Endpoints <br>

### *The API has the following endpoints available* 

`GET /api/ ` 
* returns a list of all of the available endpoints

`GET /api/topics`
* returns a list of topics (categories)

`GET  /api/users`
* returns a list of all current users

`GET /api/articles`
* returns a list of all articles and *accepts queries*
* > `filter by` topic <br> `sort by` any valid column <br> specify `ascending` or `descending` order of response 

`GET /api/articles/:article_id`
* returns a specific article, including associated comments

`PATCH /api/articles/:article_id`
* patches a specific article in order to add or remove a vote

`POST /api/articles/:article_id/comments`
* posts a new comment to a specific article

`DELETE /api/articles/comments/:comment_id`
* deletes a specific comment


## <br> Minimum Requirements  <br>

### To run the App locally:
* `Node` v17.3.0
* `NPM` v8.3.1 
* `Postgres` v8.7.3 
* `pg-format` v1.0.4 
* `dotenv` v16.0.0
    
### To run test suite:
* `Jest` v27.5.1
* `jest-extended` v2.0.0
* `jest-sorted` v1.0.14
* `Supertest` v6.2.2

*Earlier versions have not been tested and may not work.*

## <br> Setup and running this repo locally

### CLI
Clone this repository locally:
```bash
git clone https://github.com/maire-digital/NC-News-BE
```

Install dependencies with NPM: 
```bash
npm i
```

Install dev dependencies:
```bash
npm i -D jest
npm i -D supertest
npm i--save-dev jest-sorted
npm i--dave-dev jest-extended
```

### <br> Environment

#### Create two .env files in the root directory of the project to connect to the relevant database:

`.env.test` should specify a connection to the test database:

>PGDATABASE=[insert test db name here]

`.env.development` should  specify a connection to the development database:

>PGDATABASE=[insert dev db name here]

### <br> CLI
Create the database:
```bash
npm run setup-dbs
```

Seed the database:
```bash
npm run seed
```

### <br> Testing

Run all tests:
```bash
npm t
```

Ignore utils tests:
```bash
npm t app.test.js
```

### <br> Running the server locally
```bash
npm start
```

Once the app is running, it will open a local port (9090). Make requests to the server using an application like `Insomnia` and the available endpoints. <br>

## <br>π ***Thank you for looking through this repository!*** 
### π₯ ***Check out the frontend on [GitHub](https://github.com/maire-digital/NC-News-FE) and [Netlify](https://maire-nc-news.netlify.app/) to see the whole application in action.***

<br>π©π½βπ» **I'm always happy to connect with new people and opportunities!** 

ππ½ Find me here on *[GitHub](https://github.com/maire-digital "let's connect!")*, or on *[LinkedIn](https://www.linkedin.com/in/maire-dev/ "let's connect!")* 
