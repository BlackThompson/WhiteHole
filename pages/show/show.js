const app = getApp()
var aid = 0;
Page({

  data: {
    ping:''
  },
 
  onLoad: function (options) {
    var that = this;
    aid = options.aid; 
    that.view();
    that.comt_list();
    that.uinfo();

  },

  onShareAppMessage: function () {

  },

//详细
view:function(e){
  var that = this;
  wx.request({
    url: app.globalData.host + '/?api=show&aid=' + aid,
    success: function (pro) {
      that.setData({
        show: pro.data
      });
    },
  })
},

//图片放大
  imgYu: function (e) {
    var imgList = e.currentTarget.dataset.list;
    wx.previewImage({
      urls: [imgList]
    })
  },


  //评论列表
  comt_list: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.host + '/?api=comments_list&aid=' + aid,
      success: function (pro) {
        that.setData({
          ping: pro.data
        });
      },
    })
  },

  uinfo:function(e){ 
    var that = this;
    wx.request({
      url: app.globalData.host + '/?api=reg&uid=' + wx.getStorageSync('uid'),
      success: function (pro) {
        wx.setStorageSync('uid', pro.data.uid);
        that.setData({
          stat: pro.data.stat,
          userinfo: pro.data
        });
      },
    })
  },

  //发表评论
  add_comment: function (e) {
    var that = this;
    var comments = e.detail.value.comments;
    if (comments == "") {
      wx.showToast({
        title: '请输入留言!',
        icon: 'loading',
        duration: 500
      });
    } else {
      wx.request({
        url: app.globalData.host + '/?api=comments',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          comments: e.detail.value.comments,
          aid: aid,
          uid: wx.getStorageSync('uid'),
          name_id:5

        },
        success: function (res) {
          wx.showToast({
            title: '留言成功！',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            that.setData({
              comments: '',
            })
           // that.view();
            that.comt_list();
          }, 500);
        },

      })
    }
  },

  ding: function (e) {
    var that = this;
    var aid = e.currentTarget.dataset.aid;  
    wx.request({
      url: app.globalData.host + '/?api=din&aid=' + aid + '&uid=' + wx.getStorageSync('uid'),
      success: function (res) {
        wx.showToast({
          title: '谢谢你的喜欢！',
          icon: 'none',
          duration: 2000
        });
        that.view();
      }

    });
    
  },

  cai: function (e) {
    var aid = e.currentTarget.dataset.aid;  
    wx.request({
      url: app.globalData.host + '/?api=ju&aid=' + aid + '&uid=' + wx.getStorageSync('uid'),
      success: function (res) {
        wx.showToast({
          title: '感谢您的举报!',
          icon: 'none',
          duration: 2000
        });
        that.view();
      }
    });
  },

  home: function (e) {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },


})