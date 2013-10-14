$(function() {
	var loadCurrentState = function() {
		$.ajax(notificationsBaseUrl + 'msg', {
			type: "GET",
			dataType: 'jsonp',
			success: function(data) {
				if(data.state == 'none') {
					$('#notifications').addClass('no-message');
					return;
				}
				$('#user').text(data.user);
				$('#message').text(data.msg);
				$('#notifications').removeClass('no-message');
			}
		});
		
		setTimeout(loadCurrentState, 30000);
	};

	$(document).on('click', '#change', function() {
		window.open(notificationsBaseUrl + 'broadcast', '_blank');
	});

	$(document).on('click', '#clear', function() {
		$.ajax({
			type: "POST",
			url: notificationsBaseUrl + 'msg', 
			data: { state: 'none' }, 
			complete: function() {
				loadCurrentState();
			},
			dataType: 'json'});		
	});


	$(document).on("submit", "form#edit", function(event){
		event.preventDefault();

		var newState = 'set';
		var newUser = $('#editUser').val();
		var newMessage = $('#editMessage').val();
		
		$.ajax({
			type: "POST",
			url: notificationsBaseUrl + 'msg', 
			data: {state: newState, msg: newMessage, user: newUser }, 
			complete: function() {
				loadCurrentState();
				$('#view').removeClass('hidden');
			},
			dataType: 'json'});		
	});

	loadCurrentState();
});