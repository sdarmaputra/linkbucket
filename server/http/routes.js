const httpRouter = require('../utils/httpRouter')

const routes = [
	httpRouter.route('get', '/', 'HomeController.index'),
	httpRouter.route('get', '/404', 'HomeController.notFound'),
	httpRouter.route('get', '/:shortenLink', 'HomeController.visitLink')
]

module.exports = (server, router) => {
	return httpRouter.attachRoutesToServer(server, router, routes)
}
