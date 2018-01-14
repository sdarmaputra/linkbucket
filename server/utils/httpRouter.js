const path = require('path')

const route = (method, routePath, handler) => {
	const handlerSegment = handler.split('.')
	const controller = require(path.resolve(__dirname, '../http/controllers', handlerSegment[0]))

	console.log(`attach route ${routePath} (${method}) using ${handler}`)
	return {
		method,
		path: routePath,
		handler: controller[handlerSegment[1]]
	}
}

const attachRoutesToServer = (server, router, routes) => {
	routes.map((route) => {
		router[route.method.toLowerCase()](route.path, route.handler)
	})
	server.use(router)
	return server
}

module.exports = {
	route,
	attachRoutesToServer
}
