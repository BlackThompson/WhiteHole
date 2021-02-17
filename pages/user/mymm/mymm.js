let app = getApp();
var uid = 0;
var page = 0; //分页标识，第几次下拉，用户传给后台获取新的下拉数据
Page({

  data: {
    curpage: 1,
    list: null,
  },
  onLoad: function () { //初始化
    wx.showLoading();
    var _this = this;
    /**list*/
    _this.getList()

    if (wx.getStorageSync('uid')) {
      // console.log(wx.getStorageSync('uid'));
      var that = this;
      wx.request({
        url: app.globalData.host + '/?api=reg&uid=' + wx.getStorageSync('uid'),
        success: function (pro) {
          that.setData({
            stat: pro.data.stat
          });
        },
      })
    } else {
      this.getuser();
    }

  },


  onPullDownRefresh: function () { //  停止下拉
    wx.stopPullDownRefresh()
  },

  onReachBottom: function () { //上拉动作, push数据
    //console.log(++this.data.curpage);
    var page = ++this.data.curpage
    this.getList();
  },


  getuser: function () {
    var that = this;
    wx.request({
      url: app.globalData.host + '/?api=reg&uid=' + wx.getStorageSync('uid'),
      success: function (pro) {
        wx.setStorageSync('uid', pro.data.uid);
        that.setData({
          stat: pro.data.stat
        });
      },
    })
  },

  getList: function () {
    wx.showLoading({
      mask: true
    });
    var _this = this;
    wx.request({
      url: app.globalData.host + '/?api=mymm&uid=' + wx.getStorageSync('uid'),
      data: {
        page: _this.data.curpage
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        var data1 = _this.data.list;
        if (data1 == null) {
          _this.setData({
            list: res.data,
            // ding:res.data[index].din, 
          });
          return;
        }
        for (var i = 0; i < res.data.length; i++) {
          data1.push(res.data[i]);
        }
        _this.setData({
          list: data1
        });
      }
    })
  },



  ding: function (e) {
    var aid = e.currentTarget.dataset.aid;
    var xid = e.currentTarget.dataset.xid;
    var list = this.data.list;
    list[xid]['din'] = parseInt(list[xid]['din']) + 1;
    this.setData({
      list: list
    });
    wx.request({
      url: app.globalData.host + '/?api=din&aid=' + aid + '&uid=' + wx.getStorageSync('uid'),
    });
  },

  cai: function (e) {
    //  var that = this;
    var aid = e.currentTarget.dataset.aid;
    var xid = e.currentTarget.dataset.xid;
    var list = this.data.list;
    list[xid]['cai'] = parseInt(list[xid]['cai']) + 1;
    this.setData({
      list: list
    });
    wx.request({
      url: app.globalData.host + '/?api=cai&aid=' + aid + '&uid=' + wx.getStorageSync('uid'),
      success: function (res) {
        wx.showToast({
          title: '举报成功!',
          icon: 'none',
          duration: 500
        });

      }

    });
  },


  imgYu: function (e) {
    //  var src = e.currentTarget.dataset.src;
    var imgList = e.currentTarget.dataset.list;
    //图片预览
    wx.previewImage({
      //   current: src,
      urls: [imgList]
    })
  },


  /////////////////////////////////////



  //我的
  user: function (e) {
    if (wx.getStorageSync('uid')) {
      wx.navigateTo({
        url: '/pages/user/user',
      })
    }
  },



  //详情
  show: function (e) {
    var aid = e.currentTarget.dataset.aid;
    wx.navigateTo({
      url: '/pages/show/show?aid=' + aid,
    })

  },




})