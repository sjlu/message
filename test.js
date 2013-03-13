var message = require('./app');

message.registerDevice('ios', '5dc088a8fc317ff6eb1d765856130cb2b4c3dac4f581dad5a501a6da4cfd40d0', function(e)
{
	console.log('device: '+JSON.stringify(e));
	return message.sendMessage(e.id, 'test', function(e){
		return console.log('message: '+JSON.stringify(e));
	});
});