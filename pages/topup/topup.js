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
    // input默认是1  
    num: 1,
	
	//默认20000
	money:20000,
	
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'
  },
  
  onLoad: function (options){
    var that = this
    //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'recharge'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res),
        that.setData({
		  classname:res.data.classname,
		  content:res.data.content,
		  money:res.data.money,
        })
      }
    })
  },
  
  bindmoney : function (e){
	  var that = this
	  var money = e.currentTarget.dataset.current;
	  console.log(money);
	  that.setData({
		  money:money,
      })
  },
  
  recharge: function(e){
	var that = this
	wx.getStorage({
		key: 'third_Session',
		success(res) {
			console.log(that.data.money);
			wx.request({
			  url: requestUrl, //仅为示例，并非真实的接口地址
			  method: "POST",
			  data: {
				act: 'do_recharge',
				session:res.data,
				money : that.data.money,
			  },
			  header: {
				"Content-Type": "application/x-www-form-urlencoded"
			  },
			  success(res) {
				if(res.data.error == 'fail'){
					wx.showModal({
						title: '提示',
						showCancel: false,
						content: res.data.msg,
					});
					return false;
				}else{
					that.setData({
					  oid:res.data.oid,
					})
					wx.request({
					  url: requestUrl, //仅为示例，并非真实的接口地址
					  method: "POST",
					  data: {
						act: 'pay_recharge',
						oid:res.data.oid,
					  },
					  header: {
						"Content-Type": "application/x-www-form-urlencoded"
					  },
					  success(res) {
						if(res.data.error == 'fail'){
							wx.showModal({
								title: '提示',
								showCancel: false,
								content: res.data.msg,
							});
							return false;
						}else{
							wx.requestPayment({
								'timeStamp': res.data.timeStamp,
								'nonceStr': res.data.nonceStr,
								'package': res.data.package,
								'signType': res.data.signType,
								'paySign': res.data.paySign,
								'success':function(res){
									wx.request({
									  url: requestUrl, //仅为示例，并非真实的接口地址
									  data: {
										act: 'update_recharge',
										oid: that.data.oid,
									  },
									  header: {
										'content-type': 'application/json' // 默认值
									  },
									  success(res) {
										var orderid = res.data.orderid;
										wx.navigateTo({
											//url: '/pages/complete/complete?id='+orderid,
											url: '/pages/personal/personal'
										});
									  }
									})
								},
								'fail':function(res){
									console.log('充值失败！');
								},
								'complete':function(res){
									console.log(res);
								}
							})
						}
					  }
					})
					
				}
			  }
			})
		}
	})
  },
  
  bindGetUserInfo: function(e) {
	if (e.detail.userInfo) {
		//用户按了允许授权按钮
		console.log(e.detail.userInfo);
		wx.navigateTo({
			url: '/pages/personal/personal',
		});
	} else {
		//用户按了拒绝按钮
		console.log('用户拒绝了授权！');
	}
  },
  
  
  
  click: function () {
    this.setData({
      hide: !this.data.hide
    })
  },
  
  showcart: function () {
	wx.navigateTo({
		url: '/pages/cart/cart',
	})
  },
  
  
  showindex: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  },
  showdaren: function () {
    wx.navigateTo({
      url: '/pages/daren/daren',
    });
  },
  showddk: function () {
    wx.navigateTo({
      url: '/pages/ddk/ddk',
    });
  },
  showproduct: function (e) {
	  var cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/product/product?cid='+cid,
    });
  },
  showlife: function () {
    wx.navigateTo({
      url: '/pages/life/life',
    });
  },
  showcustom: function () {
    wx.navigateTo({
      url: '/pages/custom/custom',
    });
  },
  showcooperation: function () {
    wx.navigateTo({
      url: '/pages/cooperation/cooperation',
    });
  },
  showrecruiting: function () {
    wx.navigateTo({
      url: '/pages/recruiting/recruiting',
    });
  },
  showsubscribe: function () {
    wx.navigateTo({
      url: '/pages/subscribe/subscribe',
    });
  },
  showspellgroup: function () {
    wx.navigateTo({
      url: '/pages/spellgroup/spellgroup',
    });
  },
  showgroupshare: function () {
    wx.navigateTo({
      url: '/pages/groupshare/groupshare',
    });
  },
  showspellgrouporder: function () {
    wx.navigateTo({
      url: '/pages/spellgrouporder/spellgrouporder',
    });
  },
  showrecommended: function (e) {
	   var cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/recommended/recommended?cid='+cid,
    });
  },
  showhistory: function () {
    wx.navigateTo({
      url: '/pages/history/history',
    });
  },
  showselection: function () {
    wx.navigateTo({
      url: '/pages/selection/selection',
    });
  },
  showstores: function () {
    wx.navigateTo({
      url: '/pages/stores/stores',
    });
  },
  showwash: function () {
    wx.navigateTo({
      url: '/pages/wash/wash',
    });
  },
  showbuy: function () {
    wx.navigateTo({
      url: '/pages/buy/buy',
    });
  },
  showsubmit: function () {
    wx.navigateTo({
      url: '/pages/submit/submit',
    });
  },
  showpay: function () {
    wx.navigateTo({
      url: '/pages/pay/pay',
    });
  },
  showvieworder: function (e) {
	var checkinfo = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/vieworder/vieworder?checkinfo='+checkinfo,
    });
  },
  showshopping: function () {
    wx.navigateTo({
      url: '/pages/shopping/shopping',
    });
  },
  showpersonal: function () {
    wx.navigateTo({
      url: '/pages/personal/personal',
    });
  },
  showtopup: function () {
    wx.navigateTo({
      url: '/pages/topup/topup',
    });
  },
  showcomplete: function () {
    wx.navigateTo({
      url: '/pages/complete/complete',
    });
  },
  showdistribution: function () {
    wx.navigateTo({
      url: '/pages/distribution/distribution',
    });
  },
  showexclusive: function () {
    wx.navigateTo({
      url: '/pages/exclusive/exclusive',
    });
  },
  
  shownews: function (e) {
	  var cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/news?cid='+cid,
    });
  },
  
  showmade: function () {
    wx.navigateTo({
      url: '/pages/made/made',
    })
  },
  showproductsb: function () {
    wx.navigateTo({
      url: '/pages/productsb/productsb',
    })
  },
  
  
})
