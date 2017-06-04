const express 	= require('express');
const app 		= express();
const url  		= require('url');

const http 		= require('http').createServer(app);
const io 		= require('socket.io')(http);
const five  	= require('johnny-five');
const board   = new five.Board();
const led = new five.Led.RGB([9, 10, 11]);
const serialport 	= require('serialport');

var SerialPort = serialport.SerialPort;
var portName   = "/dev/ttyACM0";
// var port = new SerialPort('/dev/cu.usbmodem1421', {autoOpen: false});


// SerialPort.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//     console.log(port.pnpId);
//     console.log(port.manufacturer);
//   });
// });

var myPort = new SerialPort(portName, {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\n")
 });

function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}

function sendSerialData(data) {
   console.log(data);
}

function showPortClose() {
   console.log('port closed.');
}

function showError(error) {
   console.log('Serial port error: ' + error);
}

myPort.on('open', showPortOpen);    //when the serial port is opened, the showPortOpen function will get called
myPort.on('data', sendSerialData);  //when new data arrives, the sendSerialData function will get called
myPort.on('close', showPortClose);
myPort.on('error', showError);

app.set('port', (process.env.PORT || 8000));

// app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	// res.writeHead(200,{'content-type': 'text/html'});
	res.sendFile(__dirname + '/index.html');
});

app.get('/clientScript.js',function(req,res){
	res.sendFile(__dirname + '/clientScript.js');
});

app.get('/css/styles.css',function(req,res){
	res.sendFile(__dirname + '/css/styles.css');
});

app.get('./')

	io.on('connection',function(socket){
	console.log('a user connected');

	// mongodb://admin:open@ds123351.mlab.com:23351/localsocketled

    socket.on('ledValue',function(data){
     	console.log("new data :" + data);
     	// db.ledValue.insert({"value" : data});
     	io.emit('changeColor',data);
   });
  });



http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
