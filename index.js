const express 	= require('express');
const app 		= express();
const url  		= require('url');

const http 		= require('http').createServer(app);
const io 		= require('socket.io')(http);
const five  	= require('johnny-five');

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
