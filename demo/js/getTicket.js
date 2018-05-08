$.ajax({
    type: "POST",
    url: http1+"GetWeiXinJsapi_Ticket",
    data: {

    },
    dataType: "json",
    success: function (data) {
        data = JSON.parse(JSON.stringify(data));
        console.log(data);
        var jsapi_ticket = data.ticket
        //进行签名的准备工作
        var option = {
            noncestr: "HelloWorld",
            jsapi_ticket: jsapi_ticket,
            timestamp: 1517144307297,
            url: location.href
        }
        console.log(option);
        //3.将所有参与签名的字段进行ASCII码排序  .sort
        var sigList = [];
        //将带签名的字段以键值对的形式存入数组中
        for (var k in option) {
            sigList.push(k.trim() + "=" + option[k]);
        }
        //给数组进行排序
        sigList.sort()
        //将数组转换成key=value&key=value这种形式的字符串
        var sigStr = sigList.join("&");
        //5.对sigStr字符串，进行sha1算法加密
        var signature = sha1(sigStr);



        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxc5d68d70dd2fc1a6', // 必填，公众号的唯一标识
            timestamp: option.timestamp, // 必填，生成签名的时间戳
            nonceStr: option.noncestr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名，签名生成算法见附录1
            jsApiList: ['checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'onVoicePlayEnd',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    },
    error: function (error) {
        console.log(error);
    }
});

//0.先要拿到access—token
//1.需要拿到jsapi_ticket这个令牌（有这个东西才能调用JS_SDK）
var access_token;
//2.先根据使用appid和secret来获取access_token
// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc5d68d70dd2fc1a6&secret=563f3cfd0a74e811aabf845030650b96
//3.根据获取到的access_token来获取jsapi_ticket
//https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=9_O-ox-9kqfeDV7twd5UBa2n7hIWqk1A_YHXI8idEXSnLfie6V8wHkPduBHZ1ns4BMv_4_qcLTdkKTOQ6fSKB3mxUAXXPfA5B9ciZGiCXXWkfI5ho3gWNaQdBRpjXju0o1D3r0Q5dCJyNbD7hfRNSbAEAIEJ&type=jsapi
//4.获取到jsapi_ticket:HoagFKDcsGMVCIY2vOjf9sBUkpJtF06TACC9PvtAyhDFflVadmxqz76oVmmHoXOWfakjvyIaDysNKKmnyd6LUw（7200s之后过期）