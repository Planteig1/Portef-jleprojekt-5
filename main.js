// Express
const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
// Makes it possible to read JSON from post requests
app.use(express.json());

//SQL
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Planteig2667',
    database: 'portefolje5'
});

// List of endpoints

// - Search for cafe

// -/cafes - Shows all cafes
app.get('/cafes',(req, res) => {
    // Fetch all the cafes from the database.
    connection.query(
        'SELECT * FROM `cafes`',
        function (err, result) {
            console.log("Found all cafes in the database")
            res.send(result)
        }
    )
})
// -/cafes/:cafe_id - Shows the cafe based on id
app.get('/cafes/search/:cafe_id',(req, res) => {
    // Get the parameter
    let cafeId = req.params.cafe_id;

    //Fetch the data based on cafe ID
    connection.query(
        'SELECT * FROM `cafes` WHERE cafe_id = ?',
        [cafeId],
        function (err, result) {
            console.log("You searched for the cafe with id " + cafeId)
            res.send(result)
        }
    )

})
// -/cafes?city=? - Shows the cafes based on city
app.get('/cafes/search',(req, res) => {
    // Get the query parameter
    const city = req.query.city

    //Fetch the data based on city
    connection.query(
        'SELECT * FROM `cafes` WHERE city = ?',
        [city],
        function (err, result) {
            console.log("You searched for the city " + city)
            res.send(result)
        }
    )
})

// - Create cafe and user

// -/create/cafes - Creates a cafe
app.post('/create/cafe',(req, res) => {
    // Get the query parameters
    const name = req.body.name;
    const city = req.body.city;
    const wifi = req.body.wifi;
    const music = req.body.music
    const priceRange = req.body.priceRange
    const rating = req.body.rating
    const address = req.body.address

    // Check to see if its already made
    connection.query(
        'SELECT * FROM `cafes` WHERE name = ? AND address = ?',
        [name,address],
        function (err, result2 ) {
            if (result2.length === 0) {
                // If there is not already a cafe with the same name and address
                //Insert the data
                connection.query(
                    'INSERT INTO `cafes` (name, city, wifi, music, price_range, rating, address) VALUES (?,?,?,?,?,?,?)',
                    [name, city, wifi, music, priceRange, rating, address],
                    function (err, result) {
                        res.send(`You successfully added your cafe: ${name} to the database!`)
                    }
                )
            } else {
                // Give error code.
                res.status(418).send("Theres already a cafe with the same name at this address")
            }
        }
    )
})

// -/create/user - Creates a user
app.post('/create/user',(req, res) => {
    // Get the query parameter
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    // Check if the username or email is already in use
    connection.query(
        'SELECT * FROM `users` WHERE username = ? AND email = ?',
        [username, email],
        function (err, result1) {
            if(result1.length === 0) {
                // If not create the user.
                connection.query(
                    'INSERT INTO `users`(username, email, password, last_name, first_name) VALUES(?,?,?,?,?)',
                    [username, email, password, firstName, lastName],
                    function (err, result) {
                        res.send(`You've successfully created a account. WELCOME!`)
                    }
                )
            } else {
                res.status(418).send("Email or username is already in use.")
            }
        }
    )
})

// -/user/:user_id - Search for data about user - Created view to exclude password (Could be done in js, but here we are :) )

app.get('/user/:userId',(req, res) => {
    // Get the parameter
    const userId = req.params.userId;

    connection.query(
        'SELECT * FROM `user_information` WHERE user_id = ?',
        [userId],
        function (err, result) {
            //Check to see if a result is returned
            if (result.length === 1) {
                res.send(result);
            } else {
                // The user doesn't exists
                res.status(404).send(`Sorry! We cant find the user you're looking for!`)
            }

        }
    )
})

// Add favorite cafe to user

// -/favorite/add - Adds a favorite functionality
app.post('/favorite/add',(req, res) => {
    // Get the query parameter
    const cafeId = req.body.cafeId
    const userId = req.body.userId

    // If they already has favorited a specific cafe
    connection.query(
        'SELECT * FROM `favorites` WHERE cafe_id = ? AND user_id = ?',
        [cafeId, userId],
        function (err, result1) {
            if (result1.length === 0) {
                // The user has not favorited this cafe before
                // Create the favorite connection
                connection.query(
                    'INSERT INTO `favorites`(cafe_id, user_id) VALUES (?,?)',
                    [cafeId, userId],
                    function (err , result) {
                        res.send(`The user with ID: ${userId} has added the cafe with ID: ${cafeId} to their favorite tab`);
                    }
                )
            } else {
                // The user already has favorited this cafe - Remove the favorite
                connection.query(
                    'DELETE FROM `favorites` WHERE cafe_id = ? AND user_id',
                    [cafeId, userId],
                    function (err, result) {
                        res.send(` The user with ID: ${userId}. Has removed cafe with the ID: ${cafeId} from his favorite tab`);
                    }
                )
            }
        }
    )
})


// -/favorites/:user_id

app.get('/favorites/:userId',(req, res) => {
    // Get the parameter value
    const userId = req.params.userId;

    //Fetch the data.
    connection.query(
        'SELECT * FROM `favorites` WHERE user_id = ?',
        [userId],
        function (err, result) {
            res.send(result);
        }
    )
})



