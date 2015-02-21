module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/partials/:name', function(req, res){
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.get('/pinterest/:id', function(req, res, next) {
	//TODO: find data from db	
	var id = req.params.id //TODO: get from db with this id

	var obj = {
		id: req.params.id
	 	name: 'test number ' + idx,
		imageUrl: getUrl(idx)	
	}
    });

    app.get('/pinterest/', function(req, res, next) {
        var from = req.query.from;
        var to = req.query.to;
	console.log(from);
	console.log(to);

        //TODO: get data from database or something

	var arr = []
	for(var idx = from; idx < to; idx++) {
		var obj = {
			id: idx,
			name: 'test number ' + idx,
			imageUrl: getUrl(idx)
		}	
		arr.push(obj);
	}

        res.json(arr);
    });
};

var urls = [
	'http://kuvaton.com/kuvei/kurret.jpg',
	'http://kuvaton.com/kuvei/icebergs_blue_ice_after_it_has_flipped.jpg',
	'http://kuvaton.com/kuvei/i_got_a_new_kadabra_plushie.jpg',
	'http://kuvaton.com/kuvei/wtf_19.jpg',
	'http://kuvaton.com/kuvei/godzilla_3.jpg',
	'http://kuvaton.com/kuvei/fail_21.jpg'
	
]
var getUrl = function getUrl(idx) {
	var idx = Math.floor((Math.random() * (urls.length - 1)));
	return urls[idx];
}
