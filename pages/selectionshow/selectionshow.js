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
    var that = this;
	var id = options.id;
	var WxParse = require('../../wxParse/wxParse.js');
    //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'fmanshow',
		id : id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
		var temp = WxParse.wxParse('message', 'html', res.data.description, that, 5);
        that.setData({
			classname:res.data.classname,
			message:temp,
			title:res.data.title,
			picurl:res.data.picurl,
			content:res.data.content,
			vurl:res.data.vurl,
        }),
		wx.setNavigationBarTitle({
			title: that.data.title,
		})
      }
    })
  },
  
  click: function () {
    this.setData({
      hide: !this.data.hide
    })
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
  showrecommended: function () {
    wx.navigateTo({
      url: '/pages/recommended/recommended',
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
  
  showindex: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  },
  showproductshow: function () {
    wx.navigateTo({
      url: '/pages/selectionshow/selectionshow',
    });
  }
})
