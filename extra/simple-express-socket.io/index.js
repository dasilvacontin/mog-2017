const express = require('express')
const path = require('path')

const app = express()

/**
 * Express makes it easy to handle HTTP requests.
 * 
 * To handle requests, you define a series of middleware functions. Middleware 
 * functions are functions that have access to:
 * 
 * - the request object (`req`),
 * - the response object (`res`), and
 * - the next middleware function in the series (`next`).
 * 
 * 
 * 🤔 (middleware) -> (middleware) -> (middleware)
 * 
 * Think of it as a list of middleware functions. When a request comes in, 
 * Express executes the first middleware in the list. It's then up to that 
 * middleware to decide when to execute the next middleware function in the 
 * list. And it does so by executing `next`.
 */
app.use(function (req, res, next) {
  console.log('Hello, World!')
  next() // executes the next middleware
})

/**
 * Middleware functions can also define conditions under which they are 
 * executed. If when handling a request those conditions are not met, Express 
 * skips the middleware and evaluates the next one.
 * 
 * ```js
 * app.METHOD(PATH, HANDLER)
 * ```
 * 
 * There's multiple HTTP methods. You can specify for which HTTP method your 
 * middleware executes:
 * 
 * - `app.use` matches any HTTP method
 * - `app.get` matches GET requests
 * - `app.post` matches POST requests
 * - `app.put` matches PUT requests
 * - `app.delete` matches DELEte requests
 * 
 * Therefore, `app.get` is a simple way to create a middleware function that 
 * gets executed only if the request's HTTP method is of type `GET`.
 *
 * You can read more about HTTP Methods here: 
 * http://www.restapitutorial.com/lessons/httpmethods.html
 * 
 * You can test your server against different types of requests using
 * [Postman](https://www.getpostman.com/).
 */
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

/**
 * You can make middlewares function execute only when a desired path matches 
 * the request's URL.
 *
 * If you used Postman to send a GET request with URL "/games" to 
 * `localhost:3000`, the server's output would be the following:
 * 
 * ```output
 * Hello, World!
 * Hello! I'm a middleware for all kinds of requests!
 * I get executed on requests that match the "/" URL
 * I get executed on requests that match the "/games" URL
 * I get executed on GET requests that match the "/games" URL
 * ```
 */
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

/**
 * You can use the `res.sendFile` method to send a file and close the request.
 * 
 * We can easily make handlers for the `index.html` and `bundle.js` files in 
 * our `public` directory.
 *
 * NB: `__dirname` is a global variable with the directory name of the current 
 * module.
 */
app.get('/', function (req, res) {
  // we omit the `next` argument since we intent to finish the request here,
  // no need to execute any following handler
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/bundle.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'bundle.js'))
})

/**
 * A handler for server each static file... it gets repetitive, doesn't it?
 *
 * Indeed, there's a middleware function for automating this process. You give 
 * it a directory, and if the request URL matches a file in that directory, it 
 * sends that file and closes the request.
 *
 * By convention, URLs finishing with '/' are requesting the 'index.html' file
 * located in the same 'directory'.
 * 
 * Examples: (using 'public' as container directory for the static assets)
 * URL / -> ./public/index.html
 * URL /games/ -> ./public/games/index.html
 * URL /products/ -> ./public/products/index.html
 * URL /products/bundle.js -> ./public/products/bundle.js
 */
app.use(express.static('public'))

/**
 * How to handle dynamic paths? e.g. for handling paths for user profiles?
 * Use the following syntax, and you'll be able to obtain the dynamic part
 * as a variable.
 */
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

/**
 * Finally, tell the Express app to start listening to a port in your computer. * It's a good practise to use an environment variable for easy customisation.
 * 
 * You can set environment variables for a process you want to execute 
 * prepending them on the command line:
 *
 * ```sh
 * PORT=3000 node index.js
 * ```
 * 
 * They should appear inside the `process.env` object.
*/
const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
  console.log(`Express listening on port ${PORT}!`)
})

/**
 * You can follow more tutorials and read more about Express at:
 * https://expressjs.com/en/guide/routing.html
 */