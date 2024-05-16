// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/comments', function(req, res, next) {
    fs.readFile(__dirname + '/comments.json', function(err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/comments', function(req, res, next) {
    fs.readFile(__dirname + '/comments.json', function(err, data) {
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(comments));
        });
    });
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});