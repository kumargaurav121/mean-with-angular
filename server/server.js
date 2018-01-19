const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const {mongoose} = require('./../db/myDb');

const app = express();
const router = express.Router();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


const authentication = require('../router/authentication')(router);






const port = process.env.PORT || 3000;

const dirpath = path.join(__dirname, '../client/dist/');

//console.log(dirpath);

app.use(express.static(dirpath));
app.use('/authentication', authentication);





app.get('*', (req, res) => {
    //res.send('<h1>Hello World</h1>');
    res.sendFile(dirpath + 'index.html');
})

app.listen(port, () => {
    console.log(`App is Running on port ${port}`);
})