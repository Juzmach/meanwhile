var http = require('http');


var crawl = function(url) {
    http.get(url, function(res) {
        try {
            var chunk = "";
            res.on('data', function(data) {
                chunk += data;
            });
            res.on('end', function() {
                getUrlWithOutHTTP(getBaseUrl(url));
                findServer(chunk,getBaseUrl(url));
                findWP(chunk,getBaseUrl(url)); //tulostaa tarkistuksen consoliin
                findPHP(chunk,getBaseUrl(url)); //tulostaa tarkistuksen consoliin
                findAngularJS(chunk,getBaseUrl(url));
                return findLogo(chunk, getBaseUrl(url));
            });
            res.on('error', function(err) {
                console.log('panic panic panic ' + err);
            });
        } catch (e) {
            console.log(e);
        }
    });
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

var findWP = function(data,url) { //katsoo onko lähde koodissa WPressiä
var substr ="WordPress"
if(data.indexOf(substr) > -1) {
    console.log("trueWP") //tähän joku palautus
}else{
     console.log("falseWP") }
}
var findPHP = function(data,url) { //katsoo onko .php tiedostoja
var substr =".php"
if(data.indexOf(substr) > -1) {
    console.log("truePHP") 
}else{
     console.log("falsePHP ")}
}

var findServer = function  (data,url) {
     var options = {method: 'HEAD', host: getUrlWithOutHTTP((url)), port: 80, path: '/'};
var req = http.request(options, function(res) {
    var myJSon = JSON.stringify(res.headers);
    var serverName = JSON.parse(myJSon);
    console.log(serverName.server);
  }
);
req.end();
}
var findAngularJS = function(data,url) { 
var substr ="angular"
if(data.indexOf(substr) > -1) {
    console.log("trueAngular") 
}else{
     console.log("falseAngular ")}
}


module.exports = {
    crawl: crawl
}
