const got = require('got')
const cheerio = require('cheerio')

async function fetchLeaderboard() {
	try {
		const response = await got('https://www.11ty.dev/speedlify/');
		const $ = cheerio.load(response.body)
		return {
			sites: $('.leaderboard-list-entry').map(function() {
				return {
					rank: parseInt($(this).find('.leaderboard-directlink').text().substring(1), 10),
					url: $(this).find('.url').text(),
					lastUpdated: Date.now()
				};
			}).get(),
			lastUpdated: Date.now()
		}
		
	} catch (error) {
		console.error(error);
	}
}
 
module.exports = fetchLeaderboard