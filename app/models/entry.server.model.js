'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Match Entries Schema
 */

/*var tmax = [6000, 'The value entered for `{PATH}` ({VALUE}) exceeds the 2015 team number maximum, ({MAX}).']; 
var mmax = [100, 'The value entered for `{PATH}` ({VALUE}) exceeds the 2015 regional match number maximum, ({MAX}).'];
var dmax = [5, 'The value entered for `{PATH}` ({VALUE}) exceeds allocated defense rating maximum, ({MAX}).']; */

var EntrySchema = new Schema({
	match: {
		type: Number,
		default: 0,
		required: 'Match Number cannot be blank',
		max: 100  //2015 Regional Match Number Maximum
	},
	team: {
		type: Number,
		default: 1,
		required: 'Team Number cannot be blank',
		max: 6000 //2015 Team Number Maximum
	},
	alliance: {
		type: String,
		required: 'Alliance cannot be blank'
	},
	spos: {
		type: String,
		default: ''
	},
	botset: {
		type: Number,
		default: 0
	},
	toteset:{
		type: Number,
		default: 0
	},
	binset:{
		type: Number,
		default: 0
	},
	autontotestack:{
		type: Number,
		default: 0
	},
	autototestackzone:{
		type: Number,
		default: 0
	},
	coop:{
		type: Number,
		default: 0
	},
	totes:{
		type: Number,
		default: 0
	},
	bins:{
		type: Number,
		default: 0
	},
	stackLitter:{
		type: Number,
		default: 0
	},
	litter:{
		type: Number,
		default: 0
	},
	score:{
		type: Number,
		default: 0
	},
	zone: {
		type: String,
		default: ''
	},
	comments: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Entry', EntrySchema);