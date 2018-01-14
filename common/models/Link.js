'use strict';

const urlRandomizer = require('../utils/urlRandomizer')

module.exports = function(Link) {
	const disabledMethods = [
		'bulkUpdate',
		'changes',
		'checkpoint',
		'count',
		//'create',
		'createChangeFilter',
		'createChangeStream',
		'createUpdates',
		'currentCheckpoint',
		'destroyAll',
		'destroyById',
		'diff',
		'enableChangeTracking',
		'exists',
		//'find',
		//'findById',
		'findOne',
		'findOrCreate',
		'getChangeModel',
		'getIdName',
		'getSourceId',
		'handleChangeError',
		'rectifyChange',
		'replaceById',
		'replaceOrCreate',
		'replicate',
		'updateAll',
		'upsert',
		'upsertWithWhere',
		'updateAttribute',
		'updateAttributes'
	]

	disabledMethods.map((methodName) => Link.disableRemoteMethodByName(methodName))

	Link.observe('before save', function(ctx, next) {
		if (ctx.isNewInstance) {
			const now = new Date();
			ctx.instance.expiration_date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 7} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
			ctx.instance.visits = 0
			ctx.instance.shorten_link = urlRandomizer()
		}
		next()
	})
};
