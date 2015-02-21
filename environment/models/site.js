var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = new Schema({
	sitename: {
		type: String
	},
	logo: {
		type: String
	},
	frontend: {
		type: Array
    },
    backend: {
        type: Array
    }
});

SiteSchema.methods = {
}

SiteSchema.statics = {
}

var Site = mongoose.model('Site', SiteSchema);
