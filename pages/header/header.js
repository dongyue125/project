//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
  },
  showindex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
})
