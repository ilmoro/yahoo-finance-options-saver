var express = require('express'),
	querystring = require('querystring'),
    http = require('http'),
	fs = require('fs'),
	app = express();
	
	var symbol = "GOOG",
		encoding = "utf8";

	var url = function(s){ 
		//function accepts symbol as argument and returns URL as string
		return ('http://finance.yahoo.com/q/op?'+ querystring.stringify({s: s})+'+Options');
	}
	
	var callback = function(response){
		response.setEncoding(encoding);
		response.addListener('data', function (html){
			fs.appendFile('option'+symbol+'.html', html, function (err) {
				if (err) throw err;
			});
		})
		response.addListener('end', function(){
			console.log('End of request');
		})
	}
	
	var request = function(s){
		return http.request(url(s), callback).end();
	}
	
	function init(){
		return request(symbol);
	};
	
	init();
