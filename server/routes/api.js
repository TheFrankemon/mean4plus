const express = require('express');
const router = express.Router();
var status = require('http-status');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
	return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
		if (err)
			return console.log(err);

		closure(db);
	});
};

// Error handling
const sendError = (err, res) => {
	response.status = 501;
	response.message = typeof err == 'object' ? err.message : err;
	res.status(501).json(response);
};

// Response handling
let response = {
	status: 200,
	data: [],
	message: null
};

// Get clients
router.get('/clients', (req, res) => {
	connection((db) => {
		db.collection('clients')
			.find()
			.toArray()
			.then((clients) => {
				response.data = clients;
				// To avoid long IMG string:
				// response.data.forEach(function(elem) {
				//     elem.img2 = "...";
				//     elem.img1 = "...";
				// }, this);
				res.json(response);
			})
			.catch((err) => {
				sendError(err, res);
			});
	});
});

module.exports = router;