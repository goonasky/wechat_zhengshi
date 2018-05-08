var API = require('wechat-api');  
var api = new API("wxc5d68d70dd2fc1a6","563f3cfd0a74e811aabf845030650b96");  
var menu = JSON.stringify(require('./wx.json'));
api.createMenu(menu, function (err, result) {  
    console.log(result);  
    console.log(err);
}); 