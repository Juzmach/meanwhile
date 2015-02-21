var logocrawler = require('./logocrawler');

var crawl = function(app, urls) {
    
    var siteObjects = [];

    for (var u in urls)
    {
        var site = logocrawler.crawl(urls[u]);
        if (site) 
        {
            siteObjects.append({logo: site});
        } 
    }

    return siteObjects;

}


module.exports = {
    crawl: crawl
}
