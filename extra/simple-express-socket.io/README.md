# Express

```js
const express = require('express')
const path = require('path')

const app = express()
```

Express makes it easy to handle HTTP requests.

To handle requests, you define a series of middleware functions. Middleware functions are functions that have access to:

- the request object (`req`),
- the response object (`res`), and
- the next middleware function in the series (`next`).

```js
app.use(function (req, res, next) {
  console.log('Hello, World!')
  next() // executes the next middleware
})
```

## Middleware

🤔.. (middleware) -> (middleware) -> (middleware)

Think of it as a list of middleware functions. When a request comes in, Express executes the first middleware in the list. It's then up to that middleware to decide when to execute the next middleware function in the list. And it does so by executing `next`.

Middleware functions can also define conditions under which they are executed. If when handling a request those conditions are not met, Express skips the middleware and evaluates the next one.

```js
app.METHOD(PATH, HANDLER)
```

## HTTP Methods

There's multiple HTTP methods. You can specify for which HTTP method your middleware executes:

- `app.use` matches any HTTP method
- `app.get` matches GET requests
- `app.post` matches POST requests
- `app.put` matches PUT requests
- `app.delete` matches DELEte requests

Therefore, `app.get` is a simple way to create a middleware function that gets executed only if the request's HTTP method is of type `GET`.

```js
app.use(function (req, res, next) {
  console.log('Hello! I\'m a middleware for all kinds of requests!')
  next()
})
app.get(function (req, res, next) {
  console.log('I only handle GET requests!')
  next()
})
app.post(function (req, res, next) {
  console.log('I only handle POST request!')
  next()
})
```

You can read more about HTTP Methods [here]( http://www.restapitutorial.com/lessons/httpmethods.html).

You can test your server against different types of requests using [Postman](https://www.getpostman.com/).

## Path

You can make middleware functions execute only when a desired path matches 
the request's URL.

```js
app.use('/', function (req, res, next) {
  console.log('I get executed on requests that match the "/" URL')
  next()
})
app.use('/games', function (req, res, next) {
  console.log('I get executed on requests that match the "/games" URL')
  next()
})
app.use('/games', function (req, res, next) {
  console.log('I get executed on GET requests that match the "/games" URL')
  next()
})
```

If you ran the server locally, and used Postman to send a GET request with URL "/games" to `localhost:3000`, the server's output would be the following:

```output
Hello, World!
Hello! I'm a middleware for all kinds of requests!
I get executed on requests that match the "/" URL
I get executed on requests that match the "/games" URL
I get executed on GET requests that match the "/games" URL
```

## Sending files

You can use the `res.sendFile` method to send a file and close the request.

We can easily make handlers for the `index.html` and `bundle.js` files in our `public` directory:

> NB: `__dirname` is a global variable with the directory name of the current module.

```js
app.get('/', function (req, res) {
  // we omit the `next` argument since we intent to finish the request here,
  // no need to execute any following handler
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/bundle.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'bundle.js'))
})
```

## Sending static files

A handler for serving each static file... it gets repetitive, doesn't it?

Indeed, there's a middleware function for automating this process. You give 
it a directory, and if the request URL matches a file in that directory, it 
sends that file and closes the request.

```js
app.use(express.static('public'))
```

By convention, URLs finishing with '/' are requesting the 'index.html' file
located in the same 'directory'.

Examples: (using 'public' as container directory for the static assets)
URL / -> ./public/index.html
URL /games/ -> ./public/games/index.html
URL /products/ -> ./public/products/index.html
URL /products/bundle.js -> ./public/products/bundle.js

## Dynamic paths

How to handle dynamic paths? e.g. for handling paths for user profiles?
Use the following syntax, and you'll be able to obtain the dynamic variable
as a parameter in `req.params`.

```js
app.get('/user/:userId', function (req, res) {
  const userId = req.params.userId
  console.log(`Someone is visiting ${userId}'s profile`)
  /**
   * To handle this type of request, you usually fetch information from a
   * database, and use it to render dynamic content thanks to a template engine.
   * 
   * Dynamic content is generated 'on the fly', while static content is just 
   * files in your filesystem.
   */
   res.send(`Welcome to ${userId}'s profile! Under construction.`)
})
```

## Fire it up

Finally, tell the Express app to start listening to a port in your computer. 
It's a good practise to use an environment variable for easy customisation.

```js
const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
  console.log(`Express listening on port ${PORT}!`)
})
```

You can set environment variables for a process you want to execute 
prepending them on the command line. They should appear inside the `process.env` object.

```sh
PORT=3000 node index.js
```

You can follow more Express tutorials and read more about it at:
https://expressjs.com/en/guide/routing.html


# Socket.io

Socket.io allows you to easily establish a socket connection between a 
client and a server, and to send messages in both directions. It also has 
utilities for creating rooms, namespaces, and broadcasting messages inside 
them.

```js
const SOCKET_PORT = 4242
const io = require('socket.io')(SOCKET_PORT)
// listens for socket connections on port 4242,
// effectively creating a 'socket server'
```

Set a handler for the `'connection'` event that gets fired every time a socket
connection is established with the server:

```js
const worldState = {}
io.on('connection', function (socket) {
  /**
   * This function gets executed for each socket that establishes a connection.
   * You can interact with the socket using the `socket` instance given as an 
   * argument to the handler.
   */
  console.log(`${socket.id} just connected to the server!`)

  // send a message through the socket to the client
  socket.emit('welcome!', worldState)

  /**
   * Set a handler for messages of type 'XXX' coming from the client through 
   * the socket.
   */
  socket.on('XXX', function (arg1, arg2) {
    // do stuff

    // send a message through every socket except the current one
    socket.broadcast.emit('someoneDidXXX', socket.id)
  })
})
```

## Connecting from the client

To connect to this Socket.IO app, your client code should look like the following:

```js
const URI = 'http://kipos.me:4242'
const socket = require('socket.io-client')(URI)

socket.on('connect', function () {
  console.log('I was able to connect to the server via socket!')
  socket.emit('XXX')
})
```

Where URI is the host and port to which you wish to establish a socket connection, and therefore there should be a Socket.IO app listening to that same port on the target machine.

If a URI is not specified, by default it tries to establish the socket connection to the same host and port that served you the website. e.g., if `http://kipos.me/game` served you the website, `socket.io-client` will try to establish a connection with `http://kipos.me:80`. For this to work, your Express app and your Socket.IO app must share the same port.

> NB: uri syntax is scheme://host:port/path
>
> When the port is not specified, it defaults to the scheme/protocol's port. e.g. these are equivalent, the first ones are just omitting the default port.
>
> - http://dasilvacont.in <-> http://dasilvacont.in:80
> - https://google.com <-> https://google.com:443

Useful for testing locally:

```js
const socket = require('socket.io-client')(`localhost:${PORT}`)
```

This way you can serve your client's html & js directly from the filesystem * instead of using Express. It will only work locally though.

> `localhost` resolves to your local machine

## Sharing a port between Express and Socket.IO

Socket.IO tutorials suggest an obscure way of doing so. Here's a simpler way found in [StackOverflow](https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen):

```js
const express = require('express')
const app = express()

// app.use/routes/etc...

const server = app.listen(3033)
const io = require('socket.io').listen(server)

io.on('connection', function (socket) {
  // ...
})
```

You can check [Socket.io's documentation](http://socket.io/docs/) to find out more.