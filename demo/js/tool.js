//ajax请求的地址
var http1="http://192.168.0.162:8053/qt/API_New/MobileApiNew.asmx/";
var http2="http://192.168.0.75:8099/qt/API_New/MobileApiNew.asmx/";
//获取地址栏拼接参数方法
function getSearchObj() {
    //获取地址栏参数,封装成一个对象  {name:"zs", age:18, desc:"呵呵呵"}
    var search = location.search;
    //对search字符串进行解码
    search = decodeURI(search);
    //去除？    name=zs&age=18&desc=呵呵呵
    search = search.slice(1);
    //把search切割成一个数组    ["name=zs", "age=18", "desc=呵呵呵"]
    var arr = search.split("&");
    var obj = {};
    //遍历数组
    arr.forEach(function (v) {
        var key = v.split("=")[0];
        var value = v.split("=")[1];
        obj[key] = value;
    });
    return obj;
}
//将后台返回的参数转换成地址栏键值对的形式
function changeParam(parameter) {
    var parameterStr = "?"
    var keys = [];
    var values = [];
    for (var k in parameter) {
        if (parameter.hasOwnProperty(k) === true) {
            keys.push(k);
            values.push(parameter[k]);
        }
    }
    for (var i = 0; i < keys.length; i++) {
        parameterStr += keys[i] + "=" + values[i] + "&";
    }
    parameterStr = parameterStr.slice(0, parameterStr.length - 1);
    return parameterStr;
}
//通过坐标来获取地名的方法
function getPlaceName(location) {
    var placeName;
    var data = {　　　　
        location:location,
        /*换成自己申请的key*/
        　　　　　key: "B2FBZ-VI6W6-IXYSE-MDALK-ZRSDS-ZIB4Q",
        　　　　　get_poi: 0　　　　
    }

    var url = "http://apis.map.qq.com/ws/geocoder/v1/?";
    data.output = "jsonp";
    $.ajax({
        type: "get",
        dataType: 'jsonp',
        data: data,
        jsonp: "callback",
        jsonpCallback: "QQmap",
        url: url,
        success: function (json) {
            /*json对象转为文本 var aToStr=JSON.stringify(a);*/
            // $(".location span").eq(1).text(json.result.address)
             placeName=json.result.address


        },
        error: function (err) {
            console.log("服务端错误，请刷新浏览器后重试")
        }


    })
    return placeName;
}
//校验手机号码是否符合要求
function checkMobile(str) {  
    if(str==""){  
        alert("手机号不能为空！");  
    }  
    else{  
        var re = /^1\d{10}$/                               
        if (re.test(str)) {  
            alert("正确");  
        } else {  
            alert("手机号格式错误！");  
        }  
    }  
} 