const express 	= require('express');
const app 		= express();

const http 		= require('http');
const server 	= http.createServer(app);

app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	// res.writeHead(200,{'content-type': 'text/html'});
	res.sendFile(__dirname + '/index.html');

});


server.listen(8000,function(){
	console.log("listening at 8000");
});