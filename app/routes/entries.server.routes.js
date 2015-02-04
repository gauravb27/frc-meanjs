'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	entries = require('../../app/controllers/entries.server.controller');

module.exports = function(app) {
	// Match Entry Routes
	app.route('/entries')
		.get(entries.list)
		.post(users.requiresLogin, entries.create);

	app.route('/entries/:entryId')
		.get(entries.read)
		.put(users.requiresLogin, entries.hasAuthorization, entries.update)
		.delete(users.requiresLogin, entries.hasAuthorization, entries.delete);

	// Finish by binding the entry middleware
	app.param('entryId', entries.entryByID);
};