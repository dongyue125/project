//index.js
const app = getApp()
const requestUrl = require('../../config').requestUrl
Page({

  data: {
	nickname: '',
	tel:'',
	address: '',
    multiIndex: [0, 0, 0],
    date: '',
    time: '',

    multiIndex: [0, 0, 0],
    region: ['', '', ''],
    customItem: '全部',

    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    hide: true,
  },
  
  
  onLoad: function (options){
    var that = this
    //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'appointment'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res),
        that.setData({
          num:res.data.num,
		  date: '',
		  region: ['', '', ''],
		  nickname:'',
		  tel:'',
		  address:'',
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
	}else if(that.data.region[0]=='' || that.data.region[1]=='' || that.data.region[2]==''
	|| that.data.region[0]=='全部' || that.data.region[1]=='全部' || that.data.region[2]=='全部'
	){
		wx.showModal({
		title: '提示',
		showCancel: false,
		content: '请输入地区！',
	  });
		return false;
	}else if(e.detail.value.address==''){
		wx.showModal({
		title: '提示',
		showCancel: false,
		content: '请填写详细地址！',
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
			prov : that.data.region[0],
			city : that.data.region[1],
			country : that.data.region[2],
			address : e.detail.value.address,
		  },
		  header: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  success(res) {
			console.log(res)
			wx.showToast({title: '提交成功！',success: res => {
			if (getCurrentPages().length != 0) {
				
				//刷新当前页面的数据
				getCurrentPages()[getCurrentPages().length - 1].onLoad()
			}
          }})
		  }
		})
	}
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
