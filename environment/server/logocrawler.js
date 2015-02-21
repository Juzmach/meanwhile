var http = require('http');

var crawl = function(url, callback) {
    
    console.log("halp");
    http.get(url, function(res) {
        try {
            console.log('i work');
            var chunk = "";
            res.on('data', function(data) {
                chunk += data;
            });
            res.on('end', function() {
                console.log("end");
                
                callback({
                    //name findSiteName //palauttaa titlen.
                    name: findName(url),
                    logo: findLogo(chunk, getBaseUrl(url)),
                    techs: findTechs(chunk, url)
                });
            });
            res.on('error', function(err) {
                console.log('panic panic panic ' + err);
                callback(null);
            });
        } catch (e) {
            console.log("oops" + e);
        }
    });
}

var findName = function(url) {
    var headeri = headerit(url);
}

var getBaseUrl = function(url) {
    if (url.indexOf('http') >= 0)
    {
        return url.slice(0, url.indexOf("/", "http://".length));
    }
    return url.slice(0, url.indexOf('/'));
}

var getSiteName = function(data) {
    var nimi =  data.slice( (data.indexOf( "<title>")+7 ) , (data.indexOf("</title>"))) ;
        console.log(nimi);
        return nimi;
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

var findTechs = function (data, url) {
    console.log("testi2");
    var techs = [];
    if (findBuzzword(data, url, "WordPress")) techs.push("WordPress");
    if (findBuzzword(data, url, "PHP")) techs.push("PHP");
    techs.push(findServer(data, url));
    return techs;
}


//
var headerit = function(url) {
    var newurl = url.slice(url.indexOf(".")+1, url.indexOf('/', url.indexOf("."))); //strips off http://www.
    console.log(newurl);
    var options = {method: 'HEAD', host: newurl, port: 80, path: '/'};
    var req = http.request(options, function(res) {
        console.log((res.headers));
        return res.headers;
    });
    req.end();
}

var findBuzzword = function(data,url, word) { //katsoo onko lähde koodissa WPressiä
var substr ="WordPress"
if(data.indexOf(word) > -1) {
    console.log("true") //tähän joku palautus
    return true;
}else{
     console.log("false") }
     return false;
}
var getUrlWithOutHTTP = function(url){
        var parsettu = url.split("/");
        var urli = parsettu[2];
         return urli;
    }

var findServer = function  (data,url) {
     var options = {method: 'HEAD', host: getUrlWithOutHTTP((url)), port: 80, path: '/'};
var req = http.request(options, function(res) {
    var myJSon = JSON.stringify(res.headers);
    var serverName = JSON.parse(myJSon);
    return serverName.server;
  }
);
req.end();
}

module.exports = {
    crawl: crawl
}
