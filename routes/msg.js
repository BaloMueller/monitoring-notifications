var message = { state: 'critical', msg: 'Die Welt geht unter'};

exports.show = function(req, res){
  res.jsonp(message);
};

exports.update = function(req, res){
	console.log(req.body);
  message = req.body;
  res.redirect('/msg');
};