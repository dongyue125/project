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
	gid:'',
	oid:'',
	picurl:'',
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'
  },
  
  onLoad: function (options) {
    var that = this
	var group  = options.group
	
    //网络请求 GET方法
	wx.getStorage({
		key: 'third_Session',
		success(res) {
			console.log(res.data);   //用户session是否存在
			wx.request({
			  url: requestUrl, //仅为示例，并非真实的接口地址
			  method: "POST",
			  data: {
				act: 'gorderlist',
				group: group,
				session:res.data,
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
					that.setData({
						list:res.data.orderlist,
						oid:res.data.oid,
						gid:res.data.gid,
						picurl:res.data.picurl,
					})
				}
				
				
			  }
			})
		}
	})
  },
  
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
		console.log('用户点击了分享按钮');
    }else{
		console.log('用户点击了右上角分享按钮');
	}
    return {
      title: '我在丰雷定制拼团买了一件衣服，非常好看！赶快来拼团哦',
      path: '/pages/productshow/productshow?id=' + this.data.gid+'&oid='+this.data.oid,
	  imageUrl:this.data.picurl,
      success: function (res) {
        console.log('成功', res)
      }
    }
  },

  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
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
})
