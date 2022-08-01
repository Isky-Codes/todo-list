const express = require('express'); //importing express module
const app = express(); //saving the call to express to the app variable
const MongoClient = require('mongodb').MongoClient; //makes it possible to use methods associated with MongoClient and talk to our database.
const PORT = 2121; //setting a constant to determine the location where our server will be listening
require('dotenv').config(); //allows us to look for variables inside of the .env file


let db, //declares a db variable
    dbConnectionStr = process.env.DB_STRING, //assisgns the connection string from the .env file
    dbName = 'todo'; //declaring a variable and assigning the name of the database we will be using

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //Creating a connection to MongoDB, and passing in our connection string and passing in an additional property
    .then(client => { //waiting for the connection and proceeding if successful and passing in client information
        console.log(`Connected to ${dbName} Database`); //Console logs a message if database connection is established
        db = client.db(dbName); //assigning the declared db variable  that contains a db client factory method
    }); //closing the .then

//middlewares
app.set('view engine', 'ejs'); //sets ejs as the default render method
app.use(express.static('public')); //allows middleware to access the public directory
app.use(express.urlencoded({ extended: true })); //tells express to decode and ecode URLs where the header matches the content
app.use(express.json()); //helps to parse JSON


app.get('/',async (request, response)=>{ // starts a GET method when the root route is accessed, sets up req and res parameter.
    const todoItems = await db.collection('todos').find().toArray(); //setting a constant that awaits to convert all collection to an array
    const itemsLeft = await db.collection('todos').countDocuments({completed: false}); //sets a constant that will await a count of all documents that have the property of completed set to false to display later in ejs
    response.render('index.ejs', { items: todoItems, left: itemsLeft }); //rednering the EJS file and passing through the database items and the count remaining inside of an object
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
});

app.post('/addTodo', (request, response) => { // starts a POST method when the addToDo route is accessed, sets up req and res parameter
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false}) //references the todos collections and uses the insertOne method to insert a new document into the todos, gives a completed value of false by default
    .then(result => {  //if insert is succesful, proceed
        console.log('Todo Added'); //console.logs the action
        response.redirect('/'); //refresh the page to the '/' route
    }) //closes .then
    .catch(error => console.error(error)); //if an error is caught, console log the error
}); //close the POST method function

app.put('/markComplete', (request, response) => { // starts a PUT method when the markComplete route is accessed, sets up req and res parameter
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ //look in the db for one item matching the name of the item passed in from the main.js file that was clicked on
        $set: {
            completed: true //set completed value to true
          }
    },{
        sort: {_id: -1}, //moves item to the bottom of the list
        upsert: false //prevents insertion if item does not already exist
    })
    .then(result => { //starts a then if the update was successful
        console.log('Marked Complete'); //console logs successful completion
        response.json('Marked Complete'); //sends respons back to sender
    })
    .catch(error => console.error(error)); //catching errors

});

app.put('/markUnComplete', (request, response) => { // starts a PUT method when the markUnComplete route is accessed, sets up req and res parameter
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ //look in tShe db for one item matching the name of the item passed in from the main.js file that was clicked on
        $set: {
            completed: false //set completed value to false
          }
    },{
        sort: {_id: -1}, //moves item to the bottom of the list
        upsert: false //prevents insertion if item does not already exist
    })
    .then(result => { //starts a then if the update was successful
        console.log('Marked Complete'); //console logs successful completion
        response.json('Marked Complete'); //sends response back to sender
    })
    .catch(error => console.error(error)); //catching errors

});

app.delete('/deleteItem', (request, response) => { //starts a DELETE method when the deleteItem route is accessed, sets up req and res parameters
    db.collection('todos').deleteOne({thing: request.body.itemFromJS}) //looks in the database for the one item matching the name of the item passed in main.js that was clicked on and removes it from the database
    .then(result => { //starts a then
        console.log('Todo Deleted'); //console logs successful deletion
        response.json('Todo Deleted'); //sends response back to sender
    })
    .catch(error => console.error(error)); //catches errors

});

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});