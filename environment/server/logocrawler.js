var http = require('http');
var request = require('request');

var crawl = function(url, callback) {

    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var name, logo, techs;

            findName(url, function(nimi) {
                name = nimi;
                logo = findLogo(body, getBaseUrl(url));
                techs = findTechs(body, url, function(techArray) {
                    callback({
                        name: name, 
                        logo: logo, 
                        techs: techArray
                    });
                });
            });
        }
        else {
            console.log('request error');
            console.log(error);
            console.log(response.statusCode);
        }
    });
}

var findName = function(url, callback) {
    headerit(url, function(headerit) {
       console.log(headerit); 
       //
       //Parsi nimi headereista
       var nimi = "";

       callback(nimi);
   });
}

var getBaseUrl = function(url) {
    if (url.indexOf('http') >= 0)
    {
        return url.slice(0, url.indexOf("/", "http://".length));
    }
    return url.slice(0, url.indexOf('/'));
}

var getSiteName = function(data) {

}

var findLogo = function(data, url) {
    var logoFoundAt = data.indexOf('logo');
    var linkFoundAt = data.indexOf("<img src=\"", logoFoundAt-150); //just a random number, let's hope we don't run into longer links
    var linkEndsAt = data.indexOf('"', linkFoundAt+10);
    var link = data.slice(linkFoundAt+"<img src=\"".length, linkEndsAt);
    if (link.indexOf('http') == -1) 
    {
        return url+link;
    } else {
        return link;
    }

}

var findTechs = function (data, url, callback) {
    var techs = [];
    if (findBuzzword(data, url, "WordPress")) techs.push("WordPress");
    if (findBuzzword(data, url, "PHP")) techs.push("PHP");

    findServer(data, url, function(server) {
        techs.push(server);
        callback(techs);
    });
}


//
var headerit = function(url, callback) {
    request(url, function(error, response, body) {
        console.log('server');
        console.log(response.headers.server);
        callback(response.headers);
    });
}

var findBuzzword = function(data,url, word) { //katsoo onko lähde koodissa WPressiä
    var substr ="WordPress";
    if(data.indexOf(word) > -1) {
        console.log("true") //tähän joku palautus
            return true;
    } else{
        console.log("false") }
    return false;
}
var getUrlWithOutHTTP = function(url){
    var parsettu = url.split("/");
    var urli = parsettu[2];
    return urli;
}

var findServer = function  (data,url, callback) {
    request(url, function(error, response, body) {
        console.log('server');
        console.log(response.headers.server);
        callback(response.headers.server);
    });
}

module.exports = {
    crawl: crawl
}
