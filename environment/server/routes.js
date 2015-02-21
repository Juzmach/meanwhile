var mongoose = require('mongoose');
var sitemodel = require('../models/site'),
    Site = mongoose.model('Site');


module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/partials/:name', function(req, res){
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.get('/pinterest/', function(req, res, next) {
        var from = req.query.from;
        var to = req.query.to;
        var searchTerm = req.query.searchTerm;
        console.log(from);
        console.log(to);
        var arr = [];
        if(!searchTerm) {
            Site.find(function (err, sites) {
                console.log("fouond : " + sites.length);
                for(var i = from; i++; i<to) {
                    if (i >= sites.length) break;
                    console.log(sites[i].logo);
                    var obj = {
                        _id: i,
                        siteName: sites[i].sitename,
                        logo: sites[i].logo,
                        front: sites[i].frontend,
                        back: sites[i].backend
                    };
                    arr.push(obj);
                }
                res.json(arr);
            });
        }
        else {
            var regex = '*' + searchTerm.toLowerCase() + '*';
            var regexp = new RegExp(regex, 'g');
            Site.find({siteName: regexp}, function (err, sites) {
                console.log("fouond : " + sites.length);
                for(var i = from; i++; i<to) {
                    if (i >= sites.length) break;
                    console.log(sites[i].logo);
                    var obj = {
                        _id: i,
                        siteName: sites[i].sitename,
                        logo: sites[i].logo,
                        front: sites[i].frontend,
                        back: sites[i].backend
                    };
                    arr.push(obj);
                }
                res.json(arr);
            });
        }

    }); 
    
    app.get('/mockpinterest/', function(req, res, next) {
        var from = req.query.from;
        var to = req.query.to;

        var arr = [];
        for(var idx = from; idx < to; idx++) {
            var obj = {
                _id: idx,
                siteName: 'test number ' + idx,
                logo: getUrl(idx)
            }	
            arr.push(obj);
        }

        res.json(arr);
    });

    app.get('/pinterest/:id', function(req, res, next){
        var id = req.params.id;
        Site.find({_id: id}, function(err,sites) {
            console.log("found: " + sites.length);
            var obj = {
                _id: i,
                siteName: sites[0].sitename,
                logo: sites[0].logo,
                front: sites[0].frontend,
                back: sites[0].backend
            };
            arr.push(obj);
            res.json(arr);
        });
    });

}

var urls = [
	'http://kuvaton.com/kuvei/kurret.jpg',
	'http://kuvaton.com/kuvei/icebergs_blue_ice_after_it_has_flipped.jpg',
	'http://kuvaton.com/kuvei/i_got_a_new_kadabra_plushie.jpg',
	'http://kuvaton.com/kuvei/wtf_19.jpg',
	'http://kuvaton.com/kuvei/godzilla_3.jpg',
	'http://kuvaton.com/kuvei/fail_21.jpg'
	
];

var getUrl = function getUrl(idx) {
	var idx = Math.floor((Math.random() * (urls.length - 1)));
	return urls[idx];
}
