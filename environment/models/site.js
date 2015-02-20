var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = new Schema({
	sitename : {
		type: String
	},
	logo : {
		type: String
	},
	frontend : {
		type: String
	},
	backend : {
		type: String
}});

SiteSchema.methods = {
}

SiteSchema.statics = {
}

var Site = mongoose.model('Site', SiteSchema);
