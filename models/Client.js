/**
 * Created by janmraz on 12/08/16.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Client Model
 * ==========
 */
var Client = new keystone.List('Client');

Client.add({
	email: { type: Types.Email,initial:true, required: true,unique: true, index: true }
});



/**
 * Registration
 */
Client.defaultColumns = 'email';
Client.register();
