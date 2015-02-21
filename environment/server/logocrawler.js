var http = require('http');
var request = require('request');

var crawl = function(url, callback) {

    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var name, logo, techs;

            findName(body, function(nimi) {
                name = nimi;
                logo = findLogo(body, getBaseUrl(url));
                findTechs(body, url, function(frontArray, backArray) {
                    callback({
                        name: name, 
                        logo: logo, 
                        frontend: frontArray,
                        backend: backArray
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

var findName = function(data, callback) {
       var index = data.indexOf('<head>');
       var nameIndex = data.indexOf('<title>');
       var endIndex = data.indexOf('<', nameIndex+1);

       var nimi = data.slice(nameIndex+"<title>".length, endIndex) ;
       var replacables = ["Etusivu", ".fi", ".com" ];
       for (var i in replacables)
       {
            nimi = nimi.replace(replacables[i], '');
       }


       console.log(nimi);

       callback(nimi);
}

var getBaseUrl = function(url) {
    if (url.indexOf('http') >= 0)
    {
        return url.slice(0, url.indexOf("/", "http://".length)+1);
    }
    return url.slice(0, url.indexOf('/'));
}
var getUrlWithOutHTTP = function(url){
        var parsettu = url.split("/");
        console.log(parsettu);
        var urli = parsettu[2];
        console.log(urli);
         return urli;
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
    var front= [];
    var back = [];
    if (findBuzzword(data, url, "WordPress")) front.push("WordPress");
    if (findBuzzword(data, url, "PHP")) front.push("PHP");
    if (findBuzzword(data, url, "angular")) front.push("AngularJS");

    findServer(data, url, function(server) {
        back.push(server);
        callback(front, back);
    });
}

var headerit = function(url, callback) {
    request(url, function(error, response, body) {
        console.log('server');
        console.log(response.headers.server);
        callback(response.headers);
    });
}

var findBuzzword = function(data,url, word) { //katsoo onko lähde koodissa WPressiä
    if(data.indexOf(word) > -1) {
            return true;
    } 
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
