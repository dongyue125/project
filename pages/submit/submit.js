//index.js
const app = getApp()
const requestUrl = require('../../config').requestUrl
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    hide: true,
  },
  
  onLoad: function (options) {
    var that = this
	var oid  = options.oid
	
    //网络请求 GET方法
	wx.getStorage({
		key: 'third_Session',
		success(res) {
			console.log(res.data);   //用户session是否存在
			console.log(oid);
			wx.request({
			  url: requestUrl, //仅为示例，并非真实的接口地址
			  data: {
				act: 'order_info',
				oid: oid,
				session:res.data,
			  },
			  success(res) {
				console.log(res.data);
				that.setData({
					oid:res.data.oid,
					title:res.data.title,
					amount:res.data.amount,
					money:res.data.money,
				})
			  }
			})
		},
		fail(res){
			wx.showModal({
			title: '提示',
			showCancel: false,
			content: '请点击我的授权登录',
		  });
		  return false;
		}
	})
  },
  
  click: function () {
    this.setData({
      hide: !this.data.hide
    })
  },
  showindex: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  },
  
  pay : function (e){
	var oid = e.currentTarget.dataset.id;
	wx.request({
	  url: requestUrl, //仅为示例，并非真实的接口地址
	  method: "POST",
	  data: {
		act: 'pay',
		id: oid,
	  },
	  header: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	  success(res) {
		if(res.data.error=='fail'){
			wx.showModal({
				title: '提示',
				showCancel: false,
				content: res.data.msg,
			});
			return false;
		}else{
			console.log(res.data);
			wx.requestPayment({
				'timeStamp': res.data.timeStamp,
				'nonceStr': res.data.nonceStr,
				'package': res.data.package,
				'signType': 'MD5',
				'paySign': res.data.paySign,
				'success':function(res){
					console.log('支付成功');
				},
				'fail':function(res){
					console.log('支付失败！');
				},
				'complete':function(res){
					console.log(res);
				}
			})
		}
		
		
	  }
	})
	
	  
	  
	  /*
	  wx.navigateTo({
		url: '/pages/pay/pay?oid='+oid,
	  });
	  */
  }
})
