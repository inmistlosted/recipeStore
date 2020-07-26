const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
	name: String,
	category: String,
	shortDesc: String,
	longDesc: String,
	createDate: String,
	updateDate: String,
	author: String
}, {
	versionKey: false
});

module.exports = mongoose.model('recipes', Recipe);
