var gpio = require('rpi-gpio');
var express = require('express');
var app = express();

var channel = 11;

gpio.setup(channel, gpio.DIR_OUT, function(err) {
  if (err) throw err;
  console.log("GPIO $channel is exported");
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/garage/push', function (req, res) {
	console.log('Garage pushed');
	push();
	res.send('pushed')
});


// activate for one second to open or close the garage
function push() {
	write(1);
	setTimeout(function() {write(0)}, 1000);
}

function write(value) {
    gpio.write(channel, value, function(err) {
    	if (err) throw err;
    	console.log('Set GPIO to ' + value);
	});
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

exports.app = app;
