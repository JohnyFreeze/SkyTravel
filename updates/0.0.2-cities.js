/**
 * Created by janmraz on 12/08/16.
 */
var keystone = require('keystone');
var async = require('async');
var City = keystone.list('City');

var cities = [
	{ name: 'London', source: '/public/london.png'},
	{ name: 'Paris', source: '/public/paris.png'},
	{ name: 'China', source: '/public/china.png'},
	{ name: 'Istanbul', source: '/public/istanbul.png'}
];

function createCity (city, done) {

	var newCity = new City.model({name: city.name,source:city.source});

	newCity.save(function (err,city) {
		if (err) {
			console.error('Error adding city ' + city.name + ' to the database:');
			console.error(err);
		} else {
			console.log('Added city ' + city.name + ' to the database.');
		}
		done(err);
	});

}

exports = module.exports = function (done) {
	async.forEach(cities, createCity, done);
};
