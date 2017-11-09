let app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	Twit = require('twit'),
	Validator = require('jsonschema').Validator;

let v = new Validator(), 
	twitter = new Twit({
		consumer_key: 'iJx2n1j0vDT8JCdm87LxidNV7',
		consumer_secret: 'GPL2xWJxVbT5S3dBembZjQpvO6L5Bbt9ip5bjsy6PLLo3dB8p6',
		access_token: '404267567-BTqZo9oCaasiwYDnSRKE4dD3tDTcpd2PB3wAg5dF',
		access_token_secret: '6sx1JrvIg8qWr89zCNCoqeT5OarI04bWVwMRmRZx5VaQk',
		timeout_ms: 60 * 100,
	});

const	baseSchema = {
		"id": "/baseSchema",
		"type": "object",
		"properties": {
			"track": {
				"type": "array",
				"items": { "type": "string" },
				"minItems": 1,
				"uniqueItems": true
			},
			"filter": { "type": "string" }
		},
		"required": ["track"]
	};


const check_validate_json = data => {
	let parsed;
	//parse incoming data to json, if not json send error
	try {
		parsed = JSON.parse(data);
	} catch (e) {
		return { error: "request need to be json" };
	}

	let result = v.validate(parsed, baseSchema)
	if(!result.valid)
		return {error: result.errors};

	return parsed;
}


io.on('connection', (ws) => {
	//set ready to false
	ws.ready = true

	ws.on('start-stream', (data) => {
		let parsed = check_validate_json(data)
		//if track is not defined send error
		if (parsed.error !== undefined) {
			ws.emit('format', parsed)
		} else {
			console.log("start-stream")
			//if an old stream is up (maybe not needed)
			if (ws.stream !== undefined) ws.stream.stop()

			let lang = (parsed.lang === undefined)? '': parsed.lang
			//create new stream
			ws.stream = twitter.stream('statuses/filter', { track: parsed.track, language: lang})
			ws.stream.on("tweet", (tweet) => {
				console.log(tweet)
				//if client is ready for data send
				if (ws.connected === true && ws.ready === true) {
					ws.emit('new-stream-data', tweet)
					
					ws.ready = false
				}
			})
		}
	})

	ws.on('ready-stream', () => {
		ws.ready = true
	})

	ws.on('stop-stream', () => {
		console.log("stop-stream")
		//if stream is up, close it
		if (ws.stream !== undefined) ws.stream.stop()
	})

	ws.on('disconnect', () => {
		console.log("disonnect-stream")
		//if stream is up, close it
		if (ws.stream !== undefined) ws.stream.stop()
	});

	ws.on('connect_failed', function() {
		console.log("Sorry, there seems to be an issue with the connection!");
 })
});

http.listen(9000, () => {
	console.log('listening on *:9000')
});