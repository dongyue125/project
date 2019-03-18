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
	
	consignee: '',
	tel: '',
	prov: '',
	city: '',
	country: '',
	address: '',
	
	
	size:'',
	fabric:'',
	amount:'',
    hide: true,
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'
  },
  
  
  onLoad: function (options) {
    var that = this
	var gid  = options.gid
	var num = options.num
	var fid = options.fid
	var size = options.size
	var info = options.info
	
    //网络请求 GET方法
	wx.getStorage({
		key: 'third_Session',
		success(res) {
			console.log(res.data);   //用户session是否存在
			wx.request({
			  url: requestUrl, //仅为示例，并非真实的接口地址
			  method: "POST",
			  data: {
				act: 'buy_now',
				gid: gid,
				num:num,
				fid:fid,
				size:size,
				info:info,
				session:res.data,
			  },
			  header: {
				"Content-Type": "application/x-www-form-urlencoded"
			  },
			  success(res) {
				console.log(res.data);
				that.setData({
					info:res.data.info,
					gid:res.data.gid,
					title:res.data.title,
					description:res.data.description,
					picurl:res.data.picurl,
					amount:res.data.price,
					price:res.data.price,
					fabric:res.data.fabric,
					size:res.data.size,
					consignee:res.data.consignee,
					tel:res.data.tel,
					prov:res.data.prov,
					city:res.data.city,
					country:res.data.country,
					address:res.data.address,
				})
			  }
			})
		}
	})
  },
  
  

  /* 点击减号 */
  bindMinus: function (e) {
	var that = this;
	var gid = e.currentTarget.dataset.id;
	var cate = e.currentTarget.dataset.current;
	console.log(gid);
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
	
	 //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'math',
		num: num,
		gid:gid,
		cate:cate,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
			num: res.data.num,
			amount:res.data.amount,
			minusStatus: minusStatus
        })
      }
    })
  },
  /* 点击加号 */
  bindPlus: function (e) {
	var that = this;
	var gid = e.currentTarget.dataset.id;
	var cate = e.currentTarget.dataset.current;
	console.log(gid);
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
	
	 //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'math',
		num: num,
		gid:gid,
		cate:cate,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
       success(res) {
        console.log(res.data);
        that.setData({
			num: res.data.num,
			amount:res.data.amount,
			minusStatus: minusStatus
        })
      }
    })
  },
  
  
  /*提交订单*/
  buy:function (e){
	  var that = this;
	var gid = e.currentTarget.dataset.id;
	var amount = e.currentTarget.dataset.current;
	var num = e.currentTarget.dataset.num;
	var size = that.data.size;
	var fabric = that.data.fabric;
	  //网络请求 GET方法
	wx.getStorage({
		key: 'third_Session',
		success(res) {
			console.log(res.data);   //用户session是否存在
			wx.request({
			  url: requestUrl, //仅为示例，并非真实的接口地址
			  method: "POST",
			  data: {
				act: 'goods_order',
				gid: gid,
				amount:amount,
				num:num,
				fabric:fabric,
				size:size,
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
					console.log(res.data.oid);
					var oid = res.data.oid;
					wx.navigateTo({
						url: '/pages/submit/submit?oid='+oid,
					});
				}
			  }
			})
		}
	})
  },
  
  
  /*
  *添加收货地址
  */
  add_address : function (){
	var that = this;
	wx.chooseAddress({
		success(res) {
			console.log(res);
			const prov = res.provinceName;
			const city = res.cityName;
			const country = res.countyName;
			const address = res.detailInfo;
			const consignee = res.userName;
			const tel = res.telNumber;
			//网络请求 GET方法
			wx.getStorage({
				key: 'third_Session',
				success(res) {
					console.log(res.data);   //用户session是否存在
					wx.request({
					  url: requestUrl, //仅为示例，并非真实的接口地址
					  method: "POST",
					  data: {
						act: 'add_address',
						prov: prov,
						city:city,
						country:country,
						address:address,
						tel:tel,
						consignee:consignee,
						session:res.data,
					  },
					  header: {
						"Content-Type": "application/x-www-form-urlencoded"
					  },
					  success(res) {
						that.setData({
							consignee: res.data.consignee,
							tel: res.data.tel,
							prov: res.data.prov,
							city: res.data.city,
							country: res.data.country,
							address: res.data.address,
						})
					  }
					})
				}
			})
		}
	})
  },
 
  
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
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
  
  
  
  
})
