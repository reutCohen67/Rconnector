const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(5000, ()=> {
    return console.log('server running in port 5000');
});
