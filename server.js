// Fuck IE support. If you're on IE, get the fuck off my site.


// =============================================================
// MODULES 
// =============================================================

var express = require('express')
var torrentStream = require('torrent-stream')
var tpb = require('thepiratebay')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))



// =============================================================
// API
// =============================================================

var router = express.Router()

// middlewate for all requests
router.use(function(req, res, next) {
	console.log('Request: ' + req)
	console.log('Response: ' + res)
	next()
})

// test route accessed at GET http://localhost:8080/api
router.get('/', function(req, res) {
	res.json({ message: "yo, it's the torflix api" })
})

router.route('/stream/:query_or_link')
	.get(function(req,res) {
		var engine
		var query = req.params.query_or_link
		// console.log(query)

		var queryPromise = new Promise(function(resolve, reject) {
	
			if (query.indexOf('magnet:?xt=urn:btih:') == 0) {
				tpb.getTorrent('query').then(function(results) {
					resolve(results.magnetLink)
				})
				
			} else {
				tpb.search(query, {
				category: '200',
				}, function(err, results) {
					if (err) {
						console.log(err)
					} else {
						var maxSeeds
						results.forEach(function(obj) {
							if (!maxSeeds) { maxSeeds = obj }
							if (parseInt(obj.seeders) > parseInt(maxSeeds.seeders)) { maxSeeds = obj }
						})
						resolve(maxSeeds.magnetLink)
					}
				})
			}
		})

		queryPromise.then(function(magnet) {
			console.log("======================== MAGNET LINK ========================")
			console.log(magnet)
			return torrentStream(magnet, {
				path: 'public/tmp'
			})
		}).then(function(engine) {
			console.log(engine)
			revEngine(engine)
		})

		res.json({message:"yo"})
		
	})

app.use('/api', router)

// =============================================================
// ROUTES
// =============================================================

app.get('/', function(req,res) {
	res.sendfile('./public/index.html')
})


// =============================================================
// APP LOGIC
// =============================================================

var magnetPromise = new Promise(function(resolve, reject) {
	var engine = torrentStream(magnet, {
		path: 'tmp/torrent'
	})
	resolve(engine)
})


var getTorrentFromSearch = function(query, callback) {
	var maxSeeds
	tpb.search(query, {
		category: '200',
	}, function(err, results) {
		if (err) {
			console.log(err)
		} else {
			results.forEach(function(obj) {
				if (!maxSeeds) { maxSeeds = obj }
				if (parseInt(obj.seeders) > parseInt(maxSeeds.seeders)) { maxSeeds = obj }
			})
			console.log("max is " + maxSeeds.seeders)
		}
	})
	
}

var setupEngine = function(magnet) {
	var engine = torrentStream(magnet, {
		path: 'public/tmp'
	})
	return engine
}

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

// =============================================================
// START APP
// =============================================================

var server = app.listen(8080, function() {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)

})
