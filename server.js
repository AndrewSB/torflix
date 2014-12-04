var express = require('express')
var torrentStream = require('torrent-stream');
var app = express()

var engine = torrentStream('magnet:?xt=urn:btih:779a133f87109d268d507bf095dfc37c08682e9a');

app.get('/', function(reg,res) {
	res.send('Hello World!')
})


engine.on('ready', function() {
    engine.files.forEach(function(file) {
        console.log('filename: ', file.name)
        var stream = file.createReadStream()
        // stream is readable stream to containing the file content
    })
})


var server = app.listen(3000, function() {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)

})



