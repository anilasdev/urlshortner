
# Getting Started with URL shortener api

  
The objective of this application is to provide a RESTFull API URL Shortener in Nodejs.

It provides the following functionalities :

-   Shorten URL (with possible customization)
-   Redirect to original URL when request short URL
-   Provide the access count on a short URL

  
  ## Stacks used
  - Nodejs / Express Js
  - knexjs/objectionjs (ORM)
  - Postgresql
  - Heroku (for deployment)
  - Heroku Postgres (Addon to Postgresql server) 

## Available Scripts

  

In the project directory, you can run:

  

### `npm install`
Install the node dependencies

### `knex migrate:latest`
This run the available migrations. Make sure to set up the env variable before you run the migrations.
  ```
DB_HOST=
DB_USER-
DB_PASS=
DB_NAME=
DB_PORT=
BASE_URL=http://localhost:8000`
```

### `npm start`
This runs the node application at port 8000. If you ping to ``http://localhost:8000/status``, it should respond ``Ok``
## Deployment

This repository is set up with Heroku configuration. Anything that is pushed to ``main`` branch will trigger heroku deployment.

## Environment Variables
```
BASE_URL = https://api-urlshort.herokuapp.com
DATABASE_URL={YOUR_DATABASE_INSTANCE_URL}
```