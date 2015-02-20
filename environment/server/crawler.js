var http = require('http');

var crawl = function(app, url) {
    http.get(url, function(res) {
        var chunk = "";
        res.on('data', function(data) {
            chunk += data;
        });
        res.on('end', function() {
            return findLogo(chunk, getBaseUrl(url));
        });
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
    var linkFoundAt = data.indexOf("<img src=\"", logoFoundAt-150);
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
