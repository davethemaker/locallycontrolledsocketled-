const express 	= require('express');
const app 		= express();

const http 		= require('http').Server(app);
const io 		= require('socket.io')(http);



// app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	// res.writeHead(200,{'content-type': 'text/html'});
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
	console.log('a user connected');

    socket.on('ledValue',function(data){
     	console.log("new data :" + data);
     	io.emit('changeColor',data);
   });
});


http.listen(8000,function(){
	console.log("listening at 8000");
});