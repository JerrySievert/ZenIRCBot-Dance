var api = require('zenircbot-api');

var bot_config = api.load_config('../bot.json');

var zen = new api.ZenIRCBot(bot_config.redis.host,
                            bot_config.redis.port,
                            bot_config.redis.db);

var sub = zen.get_redis_client();
var redis = zen.get_redis_client();

sub.subscribe('in');
sub.on('message', function (channel, message) {
	var msg = JSON.parse(message);
	
	// ignore direct messages, let's stay on channel
	if (msg.type !== 'directed_privmsg') {
		if (msg.data.raw_message.match(/^!dance.+/i)) {
			zen.send_privmsg(channel, 'o\-<');
			zen.send_privmsg(channel, 'o|-<');
			zen.send_privmsg(channel, 'o/-<');
		}
	}
});