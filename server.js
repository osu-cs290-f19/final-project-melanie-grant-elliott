// Imports and constants
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var app = express();
var portnumber = process.env.PORT || 3000;
const dbSecret = JSON.parse(fs.readFileSync('./javascript/dbsecrets.json')).key;
const url = "mongodb+srv://catspotteam:" + dbSecret + "@cat-spot-vx3kz.mongodb.net/test?retryWrites=true&w=majority";
var db;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

MongoClient.connect(url, (err, database) => {
    if (err) return console.log(err);

    // Store the database object so that we can interact with it and get data from it
    db = database.db('cat-spot');
    db.collection('cat-spottings').createIndex({ createdAt: 1 });

    // Start the server
    app.listen(portnumber, function(){
        console.log("Server running on port " + portnumber);
    });

    // Tell the server where the css and javascript are located
    app.use('/css', express.static(__dirname + '/css'));
    app.use('/images', express.static(__dirname + '/images'));
    app.use('/javascript', express.static(__dirname + '/javascript'));
    app.use('/sdk', express.static(__dirname + '/sdk'));
    app.use(express.json());

    // GET / - gets index.html
    app.get('/', async function(req, res){

        // This gets cats that were spotted in the last 24 hours
        // this array contains cats in the form of [ {_id: 1, name: "cat name", lat: 123, long: 145, createdAt: date}, ... ]
        let cats = await db.collection('cat-spottings')
            .find({"createdAt":{$gt:new Date(Date.now() - 24*60*60 * 1000)}})
            .toArray();

        res.status(200).sendFile(__dirname + "/index.html");
        // Eventually, when we use views, we can call res.render('indexView', { 'catarray' : cats });
        // so that we can pass the backend cats to the front end
    });

    // GET /cat-locations - gets all cats from the database as a list
    // This is a helper function to script.js that allows the map to load all cat spottings as markers
    app.get('/cat-locations', async function(req, res){

        // This gets cats that were spotted in the last 24 hours
        // this array contains cats in the form of [ {_id: 1, name: "cat name", lat: 123, long: 145, createdAt: date}, ... ]
        let cats = await db.collection('cat-spottings')
            .find({"createdAt":{$gt:new Date(Date.now() - 24*60*60 * 1000)}}).toArray();
        res.status(200).send(cats);
    });

    // POST /cat-spotting - uploads a new cat to the database
    // example POST:
    // { "lat" : 44.5242, "long" : -123.2792, "color" : "white", ...etc }
    app.post('/cat-spotting', async function(req, res){

        // Parse the request, and use the body's values to create a new entry in the database
        await db.collection('cat-spottings').insertOne(
            {
                "lat" : req.body.lat,
                "long" : req.body.long,
                "color" : req.body.color,
                "energy" : req.body.energy,
                "sociability" : req.body.sociability,
                "createdAt" : new Date() //the date the POST is made is added automatically
            }
        );

        console.log("Saved " + req.body.color + " + cat at lat: " + req.body.lat + " and long: " + req.body.long + " to the db!");

        // When a POST request is made, the main page (index.html) is reloaded so that the newest cat will
        // show up in both the map and the timeline.
        res.redirect('/');
    });
  });
