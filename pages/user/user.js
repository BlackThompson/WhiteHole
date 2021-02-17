
const app = getApp()
var util = require('../inc/url.js');   
Page({

  /**
   * 页面的初始数据
   */
  data: {
   uid : 0
  },
  onLoad: function (options) {
    var that = this; 
    that.uinfo();
   // that.fujin();
    that.u_data();
    


   // util.span('hehe')
    
  }, 


  //用户信息+没有就注册
  uinfo: function (e) {
    var that = this; 
      wx.request({
        url: app.globalData.host + '/?api=reg&uid=' + wx.getStorageSync('uid'),
        success: function (pro) {
          wx.setStorageSync('uid', pro.data.uid); 
          that.setData({
            uinfo: pro.data,
         stat: pro.data.stat
          });
        },
      })  
  },


  //用户数据
  u_data: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.host + '/?api=u_data&uid=' + wx.getStorageSync('uid'),
      success: function (pro) {
        that.setData({
          us_data: pro.data
        });
      },
    })
  },



  //附近的人
  fujin: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.host + '/?api=user_fujin&uid=' + wx.getStorageSync('uid'),
      success: function (pro) {
        that.setData({
          fj: pro.data
        });
      },
    })
  },

  //我发布的
  fabiao: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.host + '/?api=tell_list&uid=' + wx.getStorageSync('uid'),
      success: function (pro) {
        that.setData({
          fj: pro.data
        });
      },
    })
  },

//切换头像
  u2u: function (e) { 
    var that = this;
  wx.request({
    url: app.globalData.host + '/?api=u2u&uid=' + wx.getStorageSync('uid'),
    success: function (pro) {
      that.setData({
        u: pro.data
      });
    },
  })
    that.onLoad();
  },


//话题
  hot: function (e) {
    wx.reLaunch({
      url: '/pages/chuan/chuan',
    })
  },

  //图文
  pic: function (e) {
    wx.reLaunch({
      url: '/pages/pic/pic',
    })
  },

  //详情
  show: function (e) {
    var aid = e.currentTarget.dataset.aid;
    wx.navigateTo({
      url: '/pages/show/show?aid=' + aid,
    })

  },


  //发布秘密
  add: function (e) {
    if (wx.getStorageSync('uid')) {
      wx.navigateTo({
        url: '/pages/add/add',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

//我的
  user: function(e) { 
    if (wx.getStorageSync('uid')) {
      wx.navigateTo({
        url: '/pages/user/user',
      })
    } 
  },

//首页
  home: function(e) {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

//用户中心#我的喜欢/收藏
  like: function (e) {
    wx.navigateTo({
      url: '/pages/user/like/like',
    })
  },

  //用户中心#我的秘密
  mymm: function (e) {
    wx.navigateTo({
      url: '/pages/user/mymm/mymm',
    })
  },

  //用户中心#我的礼物
  gif: function (e) {
    wx.showToast({
      title: '暂未开通!',
      icon: 'none',
      duration: 1500
    }); 

 //   wx.navigateTo({
 //     url: '/pages/user/comment/comment',
 //   })
  },


  //用户中心#我的评论
  comment: function (e) {
    wx.navigateTo({
      url: '/pages/user/comment/comment',
    })
  },
  //用户中心#开心
  happy: function (e) {
    wx.navigateTo({
      url: '/pages/pic/pic',
    })
  },

  //用户中心#选择身份
  check_2u: function (e) {
  /*  wx.navigateTo({
      url: '/pages/user/u2u/u2u',
    }) */
    wx.reLaunch({
      url: '/pages/span/span',
    })
 
  },

  //用户中心#发布规范
  tip: function (e) {
    wx.navigateTo({
      url: '/pages/tip/tip',
    })
  },

  //用户中心#发布规范
  about: function (e) {
    wx.navigateTo({
      url: '/pages/user/about/about',
    })
  },



  


})