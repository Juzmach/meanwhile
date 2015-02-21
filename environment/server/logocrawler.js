var http = require('http');

var crawl = function(url) {
    http.get(url, function(res) {
        try {
            var chunk = "";
            res.on('data', function(data) {
                chunk += data;
            });
            res.on('end', function() {
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

module.exports = {
    crawl: crawl
}
