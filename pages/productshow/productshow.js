//index.js
const app = getApp()
const requestUrl = require('../../config').requestUrl
Page({
  data: {
    banners: '',
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    hide: true,
    // input默认是1  
    num: 1,
	
	oid:'',
	
	gid:'',
	
	cid:'',
	
	price:'',
	
	//选择面料*/
	fid:'1',
	
	//选择尺寸
	chicun:'44',
	
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'  
  },
  
  
   onLoad: function (options) {
	var WxParse = require('../../wxParse/wxParse.js');
    var that = this
	
	//产品id
    if(options.scene){
	   var id = decodeURIComponent(options.scene)
    }else{
		var id  = options.id
	}
	
	//拼团id
	var oid = 0
	if(oid == ''){
		oid = 0
	}else{
		oid = options.oid
	}
	
	
	
    //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'goodsshow',
		id: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
		var temp = WxParse.wxParse('content', 'html', res.data.content, that, 5);
		var temp2 = WxParse.wxParse('message', 'html', res.data.message, that, 5);
        that.setData({
			gid:res.data.id,
			oid:oid,
			cid:res.data.cid,
			title:res.data.title,
			description:res.data.description,
			old_price:res.data.old_price,
			remit:res.data.remit,
			price:res.data.price,
			sales:res.data.m_sales,
			ysales:res.data.y_sales,
			banners:res.data.img,
			fabric:res.data.fabric,
			cateItems:res.data.cateItems,
			content: temp,
        }),
		wx.setNavigationBarTitle({
			title: res.data.title,
		})
      }
    })
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
  
  
  /*选择面料*/
  selectfrabic : function (e){
	var that = this;
	var fid = e.currentTarget.dataset.id;
	var gid = this.data.gid;
	console.log(fid,gid);
	//网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'select_fabric',
		fid: fid,
		gid: gid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
		that.setData({
			fid: fid,
			price:res.data.price,
		});
      }
    })
  },
  
  /*选择尺寸*/
  selectsize : function (e){
	  var chicun = e.currentTarget.dataset.current;
	  console.log(chicun);
	  this.setData({
		chicun: chicun,
	  });
  },
  
  
  /*加入购物车*/
  addcart : function (e){
	 var that = this;
	//产品id
	var gid = e.currentTarget.dataset.id;
	var str = e.currentTarget.dataset.current;
	
	var oid = that.data.oid;
	
	//产品数量
	var num = that.data.num;
	//面料
	var fid = that.data.fid;
	//尺寸
	var size = that.data.chicun;
	
	
    //网络请求 GET方法
	wx.getStorage({
		key: 'third_Session',
		success(res) {
			console.log(res.data);   //用户session是否存在
			wx.request({
			  url: requestUrl, //仅为示例，并非真实的接口地址
			  method: "POST",
			  data: {
				act: 'add_cart',
				gid: gid,
				oid:oid,
				num:num,
				fid:fid,
				size:size,
				session:res.data,
				cate:str,
			  },
			  header: {
				"Content-Type": "application/x-www-form-urlencoded"
			  },
				success(res) {
					console.log(res);
					if(res.data.info=='success'){
						console.log(res.data.msg);
						wx.navigateTo({
							url: '/pages/cart/cart'
						});	
					}else if(res.data.info=='now'){
						var gid = res.data.gid;
						var num = res.data.num;
						var fid = res.data.fid;
						var size = res.data.size;
						var info = res.data.info;
						wx.navigateTo({
							url: '/pages/buy/buy?gid='+gid+'&num='+num+'&fid='+fid+'&size='+size+'&info='+info,
						});
					}else if(res.data.info=='group'){
						console.log(res.data);
						var gid = res.data.gid;
						
						var oid = res.data.oid;
						
						var gnum = res.data.groupnum;
						var gstime = res.data.starttime;
						var getime = res.data.endtime;
						
						var num = res.data.num;
						var fid = res.data.fid;
						var size = res.data.size;
						var info = res.data.info;
						
						wx.navigateTo({
							url: '/pages/spellgroup/spellgroup?oid='+oid+'&gnum='+gnum+'&gstime='+gstime+'&getime='+getime+'&gid='+gid+'&num='+num+'&fid='+fid+'&size='+size+'&info='+info,
						});
					}else{
						wx.showModal({
							title: '提示',
							showCancel: false,
							content: res.data.msg,
						});
						return false;
					}
			    }
			})
		},
		fail(res){
			wx.showModal({
				title: '提示',
				showCancel: false,
				content: '请点击个人中心授权登录！',
			});
		  return false;
		}
	})
  },
  
  showspellgroup: function () {
    wx.navigateTo({
      url: '/pages/spellgroup/spellgroup',
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
  
  
  
});
    

