//引入express包
var express = require("express");
//引入xml2js包
var xml2js = require("xml2js");
//创建xml转成js对象的对象
var parser = new xml2js.Parser({
    explicitArray: false
});
//创建js对象转成xml的对象(根节点名称改成xml，加上cdata，去掉头部文档声明)
var builder = new xml2js.Builder({
    rootName: "xml",
    cdata: true,
    headless: true
})
//2.创建express实例
var app = express();
//3.设置路由

//(通过微信服务器的验证)
//开启监听(监听微信服务器发送的get请求)
app.get("/", function (req, res) {
    // console.log("有人来请求了");
    //1.先要获取微信服务器发送的 参数

    //2.将微信服务器返回的echostr参数 返回给微信服务器
    console.log(req.query);
    res.send(req.query.echostr);//返回给微信服务器即可通过验证
    res.send("请求成功了");
})
//接收用户的信息，并作处理
//添加post的路由，处理微信服务器转发过来的用户消息
app.post("/", function (req, res) {
    console.log("用户发送消息了")
    //1.获取post请求中的用户的消息内容
    var bufferList = [];
    req.on("data", function (chunk) {
        bufferList.push(chunk);
    })
    req.on("end", function () {
        var result = Buffer.concat(bufferList);
        // console.log(result.toString("utf8"));
        //将获取到的微信服务器数据转成js对象
        parser.parseString(result.toString(), function (err, result) {
            //声明一个变量，作为回复的消息
            var msg = "";
            //处理文本消息
            if (result.xml.MsgType == "text") {
                switch (result.xml.Content) {
                    case "1":
                        msg = "你好";
                        break;
                    case "2":
                        msg = "hello";
                        break;
                    case "3":
                        msg = "wangwang";
                        break;
                    default:
                        msg = "请选择要回复的语言";
                }
            }
            //将最终要回复给用户的消息转换成xml格式
            var returnMsg = {
                ToUserName: result.xml.FromUserName,
                FromUserName: result.xml.ToUserName,
                CreateTime: +new Date(),
                MsgType: 'text',
                Content: msg
            }
            //格式转化
            res.send(builder.buildObject(returnMsg));
        })
    })
})

//端口监听
app.listen(8888, function () {
    console.log("服务器已经启动：http://gonasky.free.ngrok.cc/")
})