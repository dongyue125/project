//index.js
const app = getApp()
const requestUrl = require('../../config').requestUrl
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
	selected:false,
	selectAllStatus:true,
    takeSession: false,
    requestResult: '',
	amount:'',
	list: [], // 购物车列表
	hasList: false, // 列表是否有数据
    hide: true,
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'
  },
  
  
  
  
  onLoad: function (options) {
    var that = this
    //网络请求 GET方法
	wx.getStorage({
		key: 'third_Session',
		success(res) {
			console.log(res.data);   //用户session是否存在
			wx.request({
			  url: requestUrl, //仅为示例，并非真实的接口地址
			  data: {
				act: 'cart',
				session:res.data,
			  },
			  success(res) {
				console.log(res.data);
				if(res.data.error=='fail'){
					wx.showModal({
						title: '提示',
						showCancel: false,
						content: res.data.msg,
					});
					return false;
				}else{
					console.log(res.data.length);
					if(res.data.length=='0'){
						that.setData({
							hasList:false,
						})
					}else{
						that.setData({
							hasList:true,
							list:res.data.cart,
						})
					}
				}
			  }
			})
		},
		fail(res){
			wx.showModal({
			title: '提示',
			showCancel: false,
			content: '请点击个人中心授权登录',
		  });
		  return false;
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
  
 
  
	//删除事件
	del: function (e) {
		var that = this;
	  var cid = e.currentTarget.dataset.id;
	  wx.showModal({
         title: '确定要删除该商品吗？',
         showCancel: true,//是否显示取消按钮
         cancelText:"否",//默认是“取消”
         confirmText:"是",//默认是“确定”
         success(res) {
            if (res.cancel) {
               //点击取消,默认隐藏弹框
            }else{
               //点击确定
				wx.request({
				  url: requestUrl, //仅为示例，并非真实的接口地址
				  data: {
					act: 'del_cart',
					cid:cid,
				  },
				  success(res) {
					console.log(res.data);
					if(res.data.error=='fail'){
						wx.showModal({
							title: '提示',
							showCancel: false,
							content: res.data.msg,
						});
						return false;
					}else{
						hasList:true
						if (getCurrentPages().length != 0) {
							//刷新当前页面的数据
							getCurrentPages()[getCurrentPages().length - 1].onLoad()
						}
					}
				  }
				})
            }
         },
         fail(res){ 
			wx.showToast({
				title: '操作失败！',
				success(res){
					console.log(res);
				}
			})
		 },
      })

	},
  
	//选择事件
  selectList(e) {
    let that = this;
    const index = e.currentTarget.dataset.index;
	
	console.log(index);
    let selectAllStatus = that.data.selectAllStatus; 
    let str = true;  
    let list = that.data.list;                    
    const selected = list[index].selected;        
    list[index].selected = !selected;             
    that.setData({
      list: list
    });
	that.getTotalPrice();                
    for (var i = 0; i < list.length; i++) {
      str = str && list[i].selected;           
    }

  },
  
  //计算购物车商品总价
  getTotalPrice() {
    let carts = this.data.list; 
    let total = 0.00;
    for (let i = 0; i < carts.length; i++) { 
      if (carts[i].selected) { 
        total += parseFloat(carts[i].amount); 
      }
    }
    this.setData({
      amount:total,
    })
  },
  
  //立即购买
  toBuy(){
    var totalPrice = this.data.amount;
    var thingCarts = this.data.list;
    var bookCarts = this.data.list;
    var bookCart = [], thingCart = [];

	if(totalPrice == '0' || totalPrice == ''){
		wx.showModal({
		title: '提示',
		showCancel: false,
		content: '请选择商品！',
	  });
		return false;
	}
    bookCarts.forEach(item=>{
      if (item.selected){
        bookCart.push(item);
      }
    })
    thingCarts.forEach(item=>{
      if (item.selected){
        thingCart.push(item);
      }
    })
	
	
	var cart = JSON.stringify(bookCart);
	
	console.log(cart);
	
    if(totalPrice == '0' || totalPrice==''){
		wx.showModal({
			title: '提示',
			showCancel: false,
			content: '请选择商品！',
		});
		return false;
    }else {
		console.log(totalPrice);
      wx.navigateTo({
        url: '/pages/buycart/buycart?cart='+cart+'&total='+totalPrice,
      })
    }

  }
  
  
 
})
