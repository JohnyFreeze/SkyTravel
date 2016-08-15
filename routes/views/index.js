var keystone = require('keystone');
var Client = keystone.list('Client');
var City = keystone.list('City');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// On POST requests, add the Client item to the database
	view.on('post', function (next) {
		if(validateEmail(req.body.email)) {
			Client.model.find({email: req.body.email}, function (err, data) {
				if (data.length !== 0) {
					req.flash('info', {title: 'User already exists'});
					console.log('already exists', data);
					next();
				} else {
					console.log('creating new Client', req.body.email);
					var newClient = new Client.model({
						email: req.body.email
					});
					newClient.save(function (err, client) {
						if (err) throw err;
						req.flash('success', {title: 'Created'});
						console.log('created new Client', client);
						next();
					})
				}
			});
		}else{
			req.flash('error', {title: 'Email is not valid'});
			console.log('invalid email', req.body.email);
			next();
		}
	});
	// Render the view
	City.model.find({},function (err,cities) {
		if(err) throw err;
		if(cities.length !== 0){
			console.log('sth',cities);
			view.render('index',{cities: cities});
		}
	});
	
	
};


function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
