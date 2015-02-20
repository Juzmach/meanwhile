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
        //mongooseConn = mongoose.createConnection("mongodb://localhost/", options);
        mongooseConn = mongoose.connect("mongodb://db_1/", options);
    };
    connect();
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.on('disconnected', connect);
    mongoose.connection.on('connected', function(){
        console.log('jeejee');
    });


    var pub = __dirname + '/../public';
    app.use(express.static(pub));
    //app.use(bodyParser.urlencoded({extended:true}));


    //Use jade
    //app.set('view engine', 'jade');
    app.set('view engine', 'ejs');


    //Always use pretty html.
    app.locals.pretty = true;


    var server = app.listen(port, function() {
        console.log('port: ' + server.address().port);
        console.log(server.address().address);
        console.log("server running..");
    });

    //var url = "http://www.mcdonalds.fi/fi.html";
    //var url = "http://www.hs.fi/";
    var urls = ["http://www.cloetta.fi/"]; //, "http://www.hs.fi/"];

    require('./routes')(app);

    var crawler = require('./crawlall'); 
    var sites = crawler.crawl(app, urls);
    for (var site in sites)
    {
        console.log('i work');
        var newSite = new Site({logo: site.logo});
        newSite.save(function (err, newSite) {
            if (err) console.log(err);
        });
    }
    
    //everything sockets related
    //require('./sockets').initCons(io, passport, mongooseSessionStore, persistenceHandler);

    return {app: app, server: server, mongConn: mongooseConn};

}

module.exports = function(options) {
    return runServer(options);
}
