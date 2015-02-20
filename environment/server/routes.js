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
                imageUrl: 'http://kuvaton.com/kuvei/kurret.jpg'
            },
            {
                name: 'ses',
                imageUrl: 'http://kuvaton.com/kuvei/icebergs_blue_ice_after_it_has_flipped.jpg'
            },
            {
                name: 'tuosta',
                imageUrl: 'http://kuvaton.com/kuvei/i_got_a_new_kadabra_plushie.jpg'
            },
            {
                name: 'oispa',
                imageUrl: 'http://kuvaton.com/kuvei/wtf_19.jpg'
            },
            {
                name: 'eispä',
                imageUrl: 'http://kuvaton.com/kuvei/godzilla_3.jpg'
            },
            {
                name: 'test',
                imageUrl: 'http://kuvaton.com/kuvei/fail_21.jpg'
    	}];

        res.json(placeholder);
    });
};
