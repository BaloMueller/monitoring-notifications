
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.render('index', { title: 'Express' });
};

exports.test = function(req, res){
  res.render('test', { title: 'Express' });
};