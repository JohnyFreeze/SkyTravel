/**
 * Created by janmraz on 12/08/16.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var City = new keystone.List('City');

City.add({
	name: { type: String, required: true, index: true },
	source: { type: String , hidden:true },
	image: { type: Types.CloudinaryImage }
});



/**
 * Registration
 */
City.defaultColumns = 'name, image';
City.register();
