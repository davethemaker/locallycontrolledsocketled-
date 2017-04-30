const express 	= require('express');
const app 		= express();

const http 		= require('http').Server(app);
const io 		= require('socket.io')(http);
const five  	= require('johnny-five');

app.set('port', (process.env.PORT || 8000));

// app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	// res.writeHead(200,{'content-type': 'text/html'});
	res.sendFile(__dirname + '/index.html');
});

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
