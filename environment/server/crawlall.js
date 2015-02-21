var logocrawler = require('./logocrawler');
var mongoose = require('mongoose'),
    sitemodel = require('../models/site'),
    Site = mongoose.model('Site');

var crawlAll = function() {
    //var url = ;
    //var url = "http://www.hs.fi/";
    var urls = ["http://www.mcdonalds.fi/fi.html", "https://www.google.com","http://www.cloetta.fi/", "http://www.hs.fi/", "https://github.com"]; //, "www.fazer.fi", "www.iltasanomat.fi", "www.volvocars.com", "www.finnair.com"];

    crawl(urls, function(sites) {
        for (var s in sites)
        {
            var newSite = new Site({logo: sites[s].logo, frontend: sites[s].frontend, backend: sites[s].backend, sitename: sites[s].name});
            newSite.save(function (err, newSite) {
                if (err) {
		    console.log('error');
		    console.log(err);
		    }
            });
        }
    });
}

var crawl = function(urls, callback) {
    
    var siteObjects = [];

    var count = 0;
    for (var u in urls)
    {
        var site;
        //if (urls[u].indexOf('https') != -1) {
        //    //add https crawler
        //} else {
            count++;
            logocrawler.crawl(urls[u], function(result) {
                count--;
                if (result) 
                {
                    siteObjects.push(result);
                } 
                if (count === 0) callback(siteObjects);
            });
        //}
    }
    console.log("found "+siteObjects.length);
    return siteObjects;
}


module.exports = function() {
	return crawlAll();
}
