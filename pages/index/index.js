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
  
  onLoad: function (options){
    var that = this
	
	if(options.pid){
		var pid = options.pid
	}else{
		var pid = 0
	}
	app.globalData.pid = pid
	
    //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'home'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res),
        that.setData({
		  classname:res.data.classname,
          content:res.data.content,
		  vpic:res.data.picurl,
		  dtitle:res.data.ddk_title,
		  dcontent:res.data.ddk_description,
		  dpic:res.data.ddk_pic,
		  newc:res.data.new_content,
		  bimg:res.data.bimg,
		  nlist:res.data.newp,
		  
		  
		  zname:res.data.z_name,
		  zinfo:res.data.z_info,
		  zpic:res.data.z_pic,
		  
		  fname:res.data.fname,
		  finfo:res.data.finfo,
		  rname:res.data.rname,
		  rinfo:res.data.rinfo,
		  
		  rpic:res.data.rpic,
		  wpic:res.data.wpic,
        })
      }
    })
  },
  
  
  bindGetUserInfo: function(e) {
	if (e.detail.userInfo){
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
});