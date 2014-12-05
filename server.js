// Fuck IE support. If you're on IE, get the fuck off my site.


// MODULES ======================================================

var express = require('express')
var torrentStream = require('torrent-stream')
var tpb = require('thepiratebay')

var app = express()

app.use(express.static(__dirname + '/public'));


// ROUTES ========================================================

app.get('/', function(req,res) {
	res.sendfile('./public/index.html')
})

// add route for GET request


// APP LOGIC =====================================================

var maxSeeds;
tpb.search('Naruto', {
	category: '200',
}, function(err, results) {
	if (err) {
		console.log(err);
	} else {
		results.forEach(function(obj) {
			if (!maxSeeds) maxSeeds = obj;
			if (parseInt(obj.seeders) > parseInt(maxSeeds.seeders)) maxSeeds = obj;
		});
		console.log("max is " + maxSeeds.seeders)
		maxSeeds
		var engine = torrentStream(maxSeeds.magnetLink, {
			path: 'tmp/my-file'
		})
		revEngine(engine)
	}
});

var revEngine = function(engine) {
	engine.on('ready', function() {
		engine.files.forEach(function(file) {
			console.log('filename:', file.name);
			var stream = file.createReadStream();
		})
	})

	engine.on('download', function() {
		engine.files.forEach(function(file) {
			// var file = engine.files[0]
			// console.log(file.length)
			// var stream = file.createReadStream()
			console.log('filename:', file.name);
			var stream = file.createReadStream();
		})
	})
}


// START APP =======================================================

var server = app.listen(3000, function() {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)

})
