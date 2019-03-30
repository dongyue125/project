//index.js
const app = getApp()
const requestUrl = require('../../config').requestUrl
Page({
  data: {
    multiIndex: [0, 0, 0],
    date: '2019-01-01',
    time: '12:01',

    multiIndex: [0, 0, 0],
    region: ['辽宁省', '沈阳市', '和平区'],
    customItem: '全部',
	
	nickname:'',
	tel:'',

    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    hide: true,
  },
  
  
  onLoad: function (options) {
	var WxParse = require('../../wxParse/wxParse.js');
    var that = this
    //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'made_two',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
		var temp = WxParse.wxParse('content', 'html', res.data.description, that, 5);
        that.setData({
			content:temp,
			img:res.data.img,
			clist:res.data.clist,
        })
      }
    })
  },
  
  formSubmit(e) {
	var that = this
	var pattern = /^1[34578]\d{9}$/
	if(e.detail.value.nickname==''){
	  wx.showModal({
		title: '提示',
		showCancel: false,
		content: '请输入姓名！',
	  });
	  return false;
	}
	else if(e.detail.value.tel==''){
		wx.showModal({
		title: '提示',
		showCancel: false,
		content: '请输入电话！',
	  });
		return false;
	}
	else if(!pattern.test(e.detail.value.tel)){
		wx.showModal({
		title: '提示',
		showCancel: false,
		content: '请输入正确的电话号！',
	  });
		return false;
	}
	else if(that.data.date==''){
		wx.showModal({
		title: '提示',
		showCancel: false,
		content: '请选择时间！',
	  });
		return false;
	}else{
		wx.request({
		  url: requestUrl, //仅为示例，并非真实的接口地址
		  method: "POST",
		  data: {
			act: 'do_app',
			nickname : e.detail.value.nickname,
			contact : e.detail.value.tel,
			content : that.data.date,
		  },
		  header: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  success(res) {
			console.log(res);
			wx.showToast({title: '提交成功！',success: res => {
				if (getCurrentPages().length != 0) {
					getCurrentPages()[getCurrentPages().length - 1].onLoad()
				}
			}})
			that.setData({
				nickname: '',
				tel:'',
			})
		  }
		})
	}
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
  
  //测试
  showceshi: function () {
	wx.navigateTo({
		url: '/pages/ceshi/ceshi',
	})
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
  
  showmade: function () {
    wx.navigateTo({
      url: '/pages/made/made',
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

  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
 
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
})
