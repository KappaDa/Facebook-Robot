var login = require('facebook-chat-api');
var getWeather = require('./getweather.js');

var account = {
	email: 'insane9136@yahoo.com.tw',
	password: 'love831002'
};

login(account, function(error, api) { // ����l���ߵ�FB
	if(error) console.log(error);  //�e�`̎��

	var id = 100002530017320; // FB�l��ӍϢ����id
	var interval = 25 * 1000; // 5 second

	setInterval(function() {  // �̶��r�g�l��
		getWeather(function(error, weather) {
			if(error) console.log(error);
			api.sendMessage(weather, id);
		});
	}, interval);
});