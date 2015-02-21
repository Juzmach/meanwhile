var logocrawler = require('./logocrawler');

var crawl = function(app, urls, callback) {
    
    var siteObjects = [];

    var count = 0;
    for (var u in urls)
    {
        var site;
        if (urls[u].indexOf('https') != -1) {
            //add https crawler
        } else {
            count++;
            console.log('count+' + count);
            logocrawler.crawl(urls[u], function(result) {
                count--;
                console.log('count-' + count);
                if (result) 
                {
                    siteObjects.push(result);
                } 
                if (count === 0) callback(siteObjects);
            });
        }

        
    }
    console.log("found "+siteObjects.length);
    return siteObjects;

}


module.exports = {
    crawl: crawl
}
