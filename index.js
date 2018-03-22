var login = require('facebook-chat-api');
var getWeather = require('./getweather.js');

var account = {
	email: '',
	password: ''
};

login(account, function(error, api) { // 登入發送者的FB
	if(error) console.log(error);  //錯誤處理

	var id = 100002530017320; // FB發送訊息對象id
	var interval = 25 * 1000; // 5 second

	setInterval(function() {  // 固定時間發送
		getWeather(function(error, weather) {
			if(error) console.log(error);
			api.sendMessage(weather, id);
		});
	}, interval);
});
