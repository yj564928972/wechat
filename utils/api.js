const CONSTANT = require("./constant.js");

const clearSession = function(){
  wx.setStorageSync('JSESSIONID', '');
},
setSession = function (id) {
  wx.setStorageSync('JSESSIONID', id);
},
getHeader = function (contentType){
  var sessionId = wx.getStorageSync('JSESSIONID');//本地取存储的sessionID  
  if (sessionId != null && sessionId.length > 0) {
    return { 'content-type': contentType || 'application/x-www-form-urlencoded', 'cookie': 'JSESSIONID=' + sessionId }
  } else {
    return { 'content-type': contentType || 'application/x-www-form-urlencoded' }
  }  
}, 
isServiceSuccess = function (retdata) {
  var ret = retdata.rethead || retdata.retHead || retdata;
  return ret.status == "S";
},
getRetMsg = function (retdata) {
  if (typeof retdata === "string") {
    retdata = JSON.parse(retdata);
  }

  var ret = retdata.rethead || retdata.retHead || retdata;
  var msg;
  for (var i = 0; i < ret.msgarr.length; i++) {
    if (!msg) {
      msg = ret.msgarr[i].code + " " + ret.msgarr[i].desc;
    }
    else {
      msg = msg + "\n\r" + ret.msgarr[i].code + " " + ret.msgarr[i].desc;
    }

  }
  return msg;
};

const wxRequest = (opt, url) => {
  wx.showLoading({
    title: "努力加载中...",
    mask: true
  });
  CONSTANT.DEBUG && console.log(JSON.stringify(opt))
  wx.request({
    url: CONSTANT.DOMAIN + url,
    data: opt.data || {},
    method: opt.method || "post",
    header: opt.method === "post"?getHeader('application/json'):getHeader('application/x-www-form-urlencoded'),
    success: (res) => {
      if(isServiceSuccess(res.data)){
        opt.success && opt.success(res)
      }else{
        opt.fail && opt.fail(res)
      }
    },
    fail: (res) => {
      opt.fail && opt.fail(res)
    },
    complete: (res) => {
      wx.hideLoading()
      CONSTANT.DEBUG && console.log(JSON.stringify(res))
      opt.complete && opt.complete(res)
    }
  })
}

const s = {
  main: (params) => wxRequest(params, "app.main.query.service"),
  find: (params) => wxRequest(params, "app.index.query.service")
}

module.exports = s