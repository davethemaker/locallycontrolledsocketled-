// const five = 	require('johnny-five');

$(function(){
		var socket = io.connect('https://locallycontrolledsocketled.herokuapp.com/');
		var slider = document.getElementById('ledRange');
		
		socket.on('connect',function(data){
			console.log('socket.io is now connected');
		});
		socket.on('changeColor',function(data){
			$("#messages").append("<li>"+data+"</li>");
			console.log("here is new data chunk: " + data);
		});


		$('#submitButton').on('click',function(){
			socket.emit('ledValue', $('#ledRange').val());
			return false;
		});
	});

	console.log("external JS script");
