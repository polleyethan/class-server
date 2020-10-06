var CronJob = require('cron').CronJob;
var express = require('express');
const https = require('https');
var { iterateThrough} = require('./helperFuncs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var dbConfig = require('./config/dbConfig');
var apiRoutes = require('./routers/api.router');
var Class = require('./models/Class.model');






var app = express();

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });


var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use('/api',apiRoutes);

app.listen(port, () => {
    console.log("Server running on port "+port);

    new CronJob('* * * * * *', function() {
        
        Class.find({isOn:true, hasBeenConfirmed:true}, iterateThrough);
    
    }, null, true, 'America/Los_Angeles');

   });
