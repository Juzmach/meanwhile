var logocrawler = require('./logocrawler');

var crawl = function(app, urls) {
    
    var siteObjects = [];

    for (var u in urls)
    {
        var site;
        if (urls[u].substr('https') != -1) {
        } else {
            var site = logocrawler.crawl(urls[u]);
        }
        if (site) 
        {
            siteObjects.append(site);
        } 
    }

    return siteObjects;

}


module.exports = {
    crawl: crawl
}
