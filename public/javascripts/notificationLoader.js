var notificationsBaseUrl = 'http://localhost:3000/';
$(function() {
	$('head').append('<link rel="stylesheet" href="'+ notificationsBaseUrl +'stylesheets/style.css">');
	$('head').append('<script src="'+notificationsBaseUrl+'javascripts/index.js"></script>');
	$('body').append('<div id="notifications"></div>');
	$('#notifications').load(notificationsBaseUrl + ' #content');

	/*$.get('http://localhost:3000/', function(data) {
		$('body').append(data);
	}, 'html');*/
});