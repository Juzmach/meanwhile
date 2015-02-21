var http = require('http');

var crawl = function(url) {
    http.get(url, function(res) {
        try {
            var chunk = "";
            res.on('data', function(data) {
                chunk += data;
            });
            res.on('end', function() {
                findApache(chunk,getBaseUrl(url));
                findWP(chunk,getBaseUrl(url)); //tulostaa tarkistuksen consoliin
                findPHP(chunk,getBaseUrl(url)); //tulostaa tarkistuksen consoliin
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
        return url.slice(0, url.indexOf("/", "http://".length));
    }
    return url.slice(0, url.indexOf('/'));
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

var headerit =function(data,url){
 var options = {method: 'HEAD', host: 'solinor.com', port: 80, path: '/'};
var req = http.request(options, function(res) {
    console.log((res.headers));
  }
);
req.end();
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

var findApache = function  (data,url) {
     var options = {method: 'HEAD', host: 'solinor.fi', port: 80, path: '/'};
var req = http.request(options, function(res) {
    if(JSON.stringify(res.headers).indexOf("Apache")){
        console.log("APACHEEEE")
    }
  }
);
req.end();

}

module.exports = {
    crawl: crawl
}
