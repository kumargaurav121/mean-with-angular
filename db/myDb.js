const mongoose = require('mongoose');
const database = require('./../config/database');

mongoose.Promise = global.Promise;
mongoose.connect(database.uri, (err) => {
    if(err){
        console.log('COuld Not connect to the Database');
    } else{
        //console.log(database.secret);
        console.log(`Connected to the database ${database.db}`);
    }
});

module.exports = {mongoose};
