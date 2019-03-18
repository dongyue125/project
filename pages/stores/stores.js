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
    //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'store',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res),
        that.setData({
			classname:res.data.classname,
			description:res.data.description,
			list:res.data.rlist,
        }),
		wx.setNavigationBarTitle({
			title: that.data.classname,
		})
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
  showproductshow: function () {
    wx.navigateTo({
      url: '/pages/selectionshow/selectionshow',
    });
  }
})
