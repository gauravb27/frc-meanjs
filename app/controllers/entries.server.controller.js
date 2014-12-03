'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Entry = mongoose.model('Entry'),
	_ = require('lodash');

/**
 * Create a match entry
 */
exports.create = function(req, res) {
	var entry = new Entry(req.body);
	entry.user = req.user;

	entry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(entry);
		}
	});
};

/**
 * Show the current entry
 */
exports.read = function(req, res) {
	res.json(req.entry);
};

/**
 * Update a match entry
 */
exports.update = function(req, res) {
	var entry = req.entry;

	entry = _.extend(entry, req.body);

	entry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(entry);
		}
	});
};

/**
 * Delete a match entry
 */
exports.delete = function(req, res) {
	var entry = req.entry;

	entry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(entry);
		}
	});
};

/**
 * List of Match Entries
 */
exports.list = function(req, res) {
	Entry.find().sort('-created').populate('user', 'displayName').exec(function(err, entries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(entries);
		}
	});
};

/**
 * Entry middleware
 */
exports.entryByID = function(req, res, next, id) {
	Entry.findById(id).populate('user', 'displayName').exec(function(err, entry) {
		if (err) return next(err);
		if (!entry) return next(new Error('Failed to load match entry ' + id));
		req.entry = entry;
		next();
	});
};

/**
 * Entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.entry.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};