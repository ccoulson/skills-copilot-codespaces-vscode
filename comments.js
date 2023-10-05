//create web server
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());

const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

//listen for requests
app.listen(3000, () => console.log('listening at 3000'));
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});
app.post('/api', (request, response) => {
    console.log('i got a request');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});