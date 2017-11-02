let app = require('express')(),
		http = require('http').Server(app),
		io = require('socket.io')(http),
		Twit = require('twit');

let twitter = new Twit({
		consumer_key: 'iJx2n1j0vDT8JCdm87LxidNV7',
		consumer_secret: 'GPL2xWJxVbT5S3dBembZjQpvO6L5Bbt9ip5bjsy6PLLo3dB8p6',
		access_token: '404267567-BTqZo9oCaasiwYDnSRKE4dD3tDTcpd2PB3wAg5dF',
		access_token_secret: '6sx1JrvIg8qWr89zCNCoqeT5OarI04bWVwMRmRZx5VaQk',
		timeout_ms: 60 * 1000,
});

io.on('connection', (ws) => {
	console.log("New connection");

	ws.on('new-stream', (data) => {
		let parsed;
		//parse incoming data to json, if not json send error
		try {
			parsed = JSON.parse(data);
		} catch (e) {
			ws.emit('wrong-format', JSON.stringify({error: "request need to be json"}));
			return null;
		}

		//if track is not defined send error
		if (parsed.track === undefined) {
			ws.emit('wrong-format', JSON.stringify({error: "tracker cannot be empty"}));
		} else {
			//if an old stream is up (maybe not needed)
			if (ws.stream !== undefined) ws.stream.stop();

			console.log("Starting new stream")
			//create new stream
			ws.stream = twitter.stream('statuses/filter', { track: parsed.track })
			ws.stream.on('tweet', function (tweet) {
				//if client is ready for data send
				if (ws.connected === true)
					ws.emit('new-stream-data', JSON.stringify(tweet))
			});
		}
	});

	ws.on('disconnected', () => {
		//on close if stream is up, close it
		if (ws.stream !== undefined) ws.stream.stop();
	});
});

http.listen(9000, function () {
	console.log('listening on *:9000');
});