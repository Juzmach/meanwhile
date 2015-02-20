module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/partials/:name', function(req, res){
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.get('/pinterest/', function(req, res, next) {
        var search = req.query.searchTerm;
        var count = req.query.count;
        //etc, name it something sensible

        //get data from database or something
        var placeholder = [
            {
                name: 'ebin',
                imageUrl: 'http://i.imgur.com/39FeKXX.jpg'
            },
            {
                name: 'ses',
                imageUrl: 'http://i.imgur.com/pF3kAjQ.gif'
            },
            {
                name: 'tuosta',
                imageUrl: 'http://i.imgur.com/sAl3Kht.jpg'
            },
            {
                name: 'oispa',
                imageUrl: 'http://i.imgur.com/eCaGqmX.jpg'
            },
            {
                name: 'eispä',
                imageUrl: 'http://i.imgur.com/Vbjrhbl.jpg'
            },
            {
                name: 'test',
                imageUrl: 'http://i.imgur.com/weXsTcY.gif'
    	}];

        res.json(placeholder);
    });
};
