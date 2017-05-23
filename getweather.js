// require request and cheerio
var request = require('request');
var cheerio = require('cheerio');

function getWeather(callback) {
	// 抓取網站
	request({
		url: 'http://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm',
		method: 'GET'
	}, function(error, response, body) {
		if(error) {
			return; //錯誤就不執行動作
		}

		// 解析網站內容
		var $ = cheerio.load(body);

		var weather = [];
		$('table.FcstBoxTable01 > tbody > tr').each(function() {  // 抓處需要內容
			weather.push($(this).text().split('\n'));  // 放入陣列
		});
		var result = weather.map(function(elem) {      // 整理每筆資料
			return {
				time: elem[1].trim().split(' ')[0],
				temp: elem[2].trim(),
				rain: elem[6].trim()
			};
		});
		var message = result.map(function(elem) {
			return elem.time + ': 溫度 ' + elem.temp + ',降雨機率 ' + elem.rain;
		}).join('\n');
		callback(error, message);
	});
}

//getWeather exports(exports是node.js模組化工具 讓其他script可以require這個function)
module.exports = getWeather;