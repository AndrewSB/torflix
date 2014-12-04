var express = require('express')
var torrentStream = require('torrent-stream');
var app = express()

app.get('/', function(reg,res) {
	res.send('Insert UI here')
})

var engine = torrentStream('magnet:?xt=urn:btih:224BF45881252643DFC2E71ABC7B2660A21C68C4&dn=inception+2010+1080p+brrip+x264+1+85gb+yify&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce')

engine.on('ready', function() {
    engine.files.forEach(function(file) {
				var file = engine.files[0]
				console.log(file)
				var stream = file.createReadStream()
    })
})


var server = app.listen(3000, function() {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)

})
