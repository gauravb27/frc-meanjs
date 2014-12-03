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
	autohigh: {
		type: Number,
		default: 0
	},
	autolow: {
		type: Number,
		default: 0
	},
	autohot:{
		type: Number,
		default: 0
	},
	mob:{
		type: String,
		default: 'no',
		required: 'Mobility cannot be blank'
	},
	passm:{
		type: Number,
		default: 0
	},
	passr:{
		type: Number,
		default: 0
	},
	truss:{
		type: Number,
		default: 0
	},
	ctch:{				//renamed to ctch, catch resembles exception capture type
		type: Number,
		default: 0
	},		
	high:{
		type: Number,
		default: 0
	},
	low:{
		type: Number,
		default: 0
	},
	drat:{
		type: Number,
		default: 0,
		max: 5
	},	
	dball:{
		type: String,
		default: 'no'
	},
	foulone:{
		type: Number,
		default: 0
	},
	foultwo:{
		type: Number,
		default: 0
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