var express = require('express')
var torrentStream = require('torrent-stream');
var app = express()

app.get('/', function(reg,res) {
	res.send('Insert UI here')
})

var engine = torrentStream('magnet:?xt=urn:btih:224BF45881252643DFC2E71ABC7B2660A21C68C4', {
	path: 'tmp/my-file'
})

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

var server = app.listen(3000, function() {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)

})
