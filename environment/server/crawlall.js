var logocrawler = require('./logocrawler');

var crawl = function(app, urls) {
    
    var siteObjects = [];

    for (var url in urls)
    {
        var site = logocrawler.crawl(url);
        //if (site) 
        //{
        //    siteObjects.append({logo: site});
        //} 
    }

    return siteObjects;

}


module.exports = {
    crawl: crawl
}
