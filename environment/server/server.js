var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();
    sitemodel = require('../models/site.js');
    Site = mongoose.model('Site');

var runServer = function(options) {
    if(!options.port) {
        //throw "Error, no port";
    }
    var port = options.port;
    console.log('port from options: ' + port);

    //mongoose
    var mongooseConn;
    var connect = function() {
        var options = {server: {socketOptions: {keepAlive: 1}}};
        mongooseConn = mongoose.connect("mongodb://db_1/", options);
    };
    connect();
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.on('disconnected', connect);
    mongoose.connection.on('connected', function(){
	console.log('mongodb connected');
    });

    var pub = __dirname + '/../public';
    app.use(express.static(pub));
    app.use(bodyParser.urlencoded({extended:true}));

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/../public/');


    //Always use pretty html.
    app.locals.pretty = true;


    var server = app.listen(port, function() {
        console.log('port: ' + server.address().port);
        console.log(server.address().address);
        console.log("server running..");
    });

    require('./routes')(app);

    //Start crawling
    require('./crawlall')();
    
    return {app: app, server: server, mongConn: mongooseConn};

}

module.exports = function(options) {
    return runServer(options);
}
