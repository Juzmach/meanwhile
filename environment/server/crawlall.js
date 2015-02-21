var logocrawler = require('./logocrawler');
var mongoose = require('mongoose'),
    sitemodel = require('../models/site'),
    fs = require('fs'),
    byline = require('byline'),
    request = require('request'),
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

//var dumpUrl = "http://dump.solinor.com/dump/urldump/com.txt";
//var dumpUrl = "http://dump.solinor.com/dump/urldump/us.txt";
//var dumpUrl = "http://pastebin.com/raw.php?i=Wr10LZyC";
//var dumpUrl = "http://dump.solinor.com/dump/urldump/net.txt";
//var dumpUrl = "http://dump.solinor.com/dump/urldump/biz.txt";
//var dumpUrl = "http://pastebin.com/raw.php?i=u9yKnEEP";
var dumpUrl = "http://pastebin.com/raw.php?i=Jxzuwqnt"
var crawlDump = function() {
    var url = "";

    //aww yiss., read from dump line by line
    var stream = request(dumpUrl).pipe(byline.createStream());

    stream.on('data', function(line) {
        //console.log(line.toString('utf-8'));
        var url = line.toString('utf-8');
        if(url.toLowerCase().indexOf('http') !== 0 &&
            url.toLowerCase().indexOf('https') !== 0 &&
            url.toLowerCase().indexOf('www') !== 0) {
            url = "http://www." + url;
        }
        logocrawler.crawl(url, function(result) {
            console.log('got data!');
            console.log(result);
            var newSite = new Site({logo: result.logo, frontend: result.frontend, backend: result.backend, sitename: result.name});
            newSite.save(function (err, newSite) {
                if (err) {
                    console.log('error');
                    console.log(err);
                }
            });
        });
    });
}

var crawl = function(urls, callback) {
    
    var siteObjects = [];

    var count = 0;
    for (var u in urls)
    {
        var site;
            count++;
            logocrawler.crawl(urls[u], function(result) {
                count--;
                if (result) 
                {
                    siteObjects.push(result);
                } 
                if (count === 0) callback(siteObjects);
            });
    }
    console.log("found "+siteObjects.length);
    return siteObjects;
}

module.exports = function() {
	return crawlDump();
}

/*
module.exports = function() {
	return crawlAll();
}
*/
