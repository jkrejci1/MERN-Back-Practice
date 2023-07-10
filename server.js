//THIS WORKED DO AS IS HERE FOR CREATING CONNECTION BETWEEN FRONT AND BACK END YEEESSSSSSSSSSS WOOOOPPPYYYY


/**
 * Requests:
 * GET -> Gets info from backend/database
 * POST -> Creates new info to put into backend/database
 * DELETE -> Deletes data from backend/database
 * PATCH -> Updates data from the backend/database like updating certain fields
 */

//Entry level to register the app
//Use install dotenv in terminall to import .env variables
require('dotenv').config()

//Require express
const express = require('express')
const path = require('path')

//Use cors for cross server communication
var cors = require('cors')

//Require mongoose for database
const mongoose = require('mongoose')

//Require the routes
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


const PORT = process.env.PORT || 5000

//Connect to MongoDB RETURNS A PROMISE
mongoose.connect("mongodb+srv://jkrejci1988:12345@mernapp.qtbtpsh.mongodb.net/?retryWrites=true&w=majority")

    .catch((error) => {
        console.log(error) //Log any error that happens when trying to connect
    })

//Start up the app and store it in app
const app = express()

//Create middleware to use json to access data in the requests later in routes
app.use(express.json()) //Any request that comes in -> Passes data to requests object to access in request handler

//UNCOMMENT WHEN WE WANT TO PUSH TO AZURE AND CREATE NEW BUILD IN THE FRONT END TO HAVE THOSE FILES REPLACE ANY UPDATED PUBLIC FOLDER BUILD FILES
app.use(express.static(path.join(__dirname + "/public"))) //Attempt for connecting MERN FRONT TO BACK
app.use(cors())

//Register global middleware
app.use((req, res, next) => {
    //Next goes to the next piece of middlware, needs to be invoked when finsihed
    console.log(req.path, req.method) //Shows us the path and the method to log the requests
    next()
})

//Routes (/api/workouts -> Only fire these routes when you come to the first path, can be anything)
app.use('/api/workouts', workoutRoutes) //So when we fire to '/api/workouts' then we need to use those specific routes that will check for the route after the last forward slash from the given requirement -> for any request -> GET POST DELETE ... etc
app.use('/api/user', userRoutes) //So when we fire to '/api/workouts' then we need to use those specific routes that will check for the route after the last forward slash from the given requirement -> for any request -> GET POST DELETE ... etc

//COMMENT WHEN TESTING OUT WHEN NOT PUSHING TO AZURE
//Fixes loading error on login and signup page where there isn't any get requests; when we refresh on the page and get failed to GET /*
app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

//Might need to put login and signup here if we want to be able to refresh those pages that's WHY WE GET THE /login or /signup ERRORS WHEN REFRESHING THOSE PAGES OR ENTERING THEM MANUALLY BUT NOT WHEN WE CLICK ON THE BUTTON
app.listen(PORT)