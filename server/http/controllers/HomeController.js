const path = require('path')
const loopback = require('loopback')

module.exports = {
	index: (req, res) => {
		res.sendFile(path.resolve(__dirname, '../../../client/index.html'))	
	},
	visitLink: (req, res) => {
		const shortenLink = req.params.shortenLink
		const Link = loopback.findModel('Link')
		Link.findOne({ where: { shorten_link: shortenLink } }, (err, link) => {
			if (link !== null) {
				link.visits++
				link.save((err, link) => {
					res.set({
						'Refresh': '2;' + link.original_link
					})
					res.sendFile(path.resolve(__dirname, '../../../client/redirect.html'))	
				})
			} else res.redirect('/404')
		})
	},
	notFound: (req, res) => {
		res.sendFile(path.resolve(__dirname, '../../../client/404.html'))	
	}
}

