// Imports and constants
var express = require('express');
var app = express();
var fs = require('fs');
var portnumber = process.env.PORT || 3000;

// Start the server
app.listen(portnumber, function(){
    console.log("Server running on port " + portnumber);
});

// Tell the server where the css and javascript are located
app.use('/css', express.static(__dirname + '/css'));
app.use('/javascript', express.static(__dirname + '/javascript'));
app.use('/sdk', express.static(__dirname + '/sdk'));

// GET /
app.get('/', function(req, res){
    res.status(200).sendFile(__dirname + "/index.html");
}); 