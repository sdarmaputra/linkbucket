module.exports = function(app) {
	app.dataSources.linkbucketMysql.automigrate('Link', function(err) {
		if (err) throw err	
	})
}
