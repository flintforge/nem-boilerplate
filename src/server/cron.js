/**
 * nemred
 *
 * cron.js
 * phil.estival@free.fr
 *
 * Scheduled jobs goes here
 *
 */

import CronJob from 'CronJob'


new CronJob('00 00 00 00 * *', () => { // daily 00 00 00 * * *
	log.dbg('Updating schedule');
	// jobs goes here

}, null, true, 'Europe/Paris');
