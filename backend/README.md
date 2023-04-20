
# Assignment for Internship position at “Mobilicis India Private Limited”

A “Node.js” Application using Express Framework and MongoDB Database and
Connected it to Frontend application developed using ReactJS.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (you need to provide your valid Mongodb Connection String)

`MONGODB_ATLAS`



## Run Locally

Clone the project

```bash
  https://github.com/namanbisht08/project_kunal
```

Go to the project directory

```bash
  cd my-project
```

Initialize project directory

```bash
  npm init -y
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node app.js
```




## API Reference

#### Get all Users

```http
  GET /api/users
```

#### Query 1) Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”. 

```http
  GET /api/q1
```

#### Query 2) Male Users which have phone price greater than 10,000.. 

```http
  GET /api/q2
```

#### Query 3) Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name. 

```http
  GET /api/q3
```

#### Query 4) Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit. 

```http
  GET /api/q4
```



#### Query 5) Show the data of top 10 cities which have the highest number of users and their average income.

```http
  GET /api/q5
```


