const express = require('express');
const path = require('path');

const {mongoose} = require('./../db/myDb');

const app = express();

const port = process.env.PORT || 3000;

const dirpath = path.join(__dirname, '../client/dist/');

//console.log(dirpath);

app.use(express.static(dirpath));


app.get('*', (req, res) => {
    //res.send('<h1>Hello World</h1>');
    res.sendFile(dirpath + 'index.html');
})

app.listen(port, () => {
    console.log(`App is Running on port ${port}`);
})