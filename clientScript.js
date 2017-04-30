	$(function(){
		var socket = io.connect('https://pacific-waters-83081.herokuapp.com/');
		var slider = document.getElementById('ledRange');
		
		socket.on('connect',function(data){
			console.log('socket.io is now connected');
		});
		socket.on('changeColor',function(data){
			$("#messages").append("<li>"+data+"</li>");
			console.log("here is data" + data);
		});


		$('#submitButton').on('click',function(){
			socket.emit('ledValue', $('#ledRange').val());
			return false;
		});
	});
