# ts-node-starter
A simple boilerplate to start a node back-end application
## Install dependencies
`npm install`
## Start application
`npm start`
## Live reloading
This project uses nodemon to live reloading code inside *src* folder
## Demo
https://ts-node-starter.herokuapp.com
## Endpoints
|Method|Endpoint|Description|Is authentidated|
|---|---|---|---|
|POST|/auth/signup|Create an account|No|
|POST|/auth/signin|Login in an account|No|
|GET|/users|Get all users|Yes|
|GET|/users/:id|Get user by id|Yes|
|POST|/users|Create an user|Yes|
|PUT|/users/:id|Update an user by id|Yes|
|DELETE|/users/:id|Delete an user by id|Yes|
