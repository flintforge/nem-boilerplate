/**
 *
 * tracerequest.js
 * phil.estival@free.fr
 * $Date$:2016/09/09 14:01:20 $
 *
 * debug utility to print incoming request
 *
 */
var
	log = require ('./log')

module.exports = function(req) {
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	log.dbg(ip, req.headers['user-agent'], req.headers['referer'], req.method, req.url,req.params,req.query )
}