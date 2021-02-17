let app = getApp();
var page = 0;
Page({

  data: {
    tags: '绿帽',
    curIdx: 0,// 当前导航索引
    scrollHeight: 0, //滚动高度 = 设备可视区高度 -  导航栏高度
    curpage: 1,
  },

  onLoad: function (options) {
    var that = this;
    wx.request({ //相册列表
      url: app.globalData.host + '/?api=tags',
      success: function (pro) {
        that.setData({
          tabs: pro.data,
        })
      },
    })
    that.getList()
    that.uinfo();

  },

  getList: function () {
    wx.showLoading({
      mask: true,
      title: '加载中',
    });
    var _this = this;
    wx.request({
      url: app.globalData.host + '/?api=tab_list',
      data: {
        page: _this.data.curpage,
        tags: _this.data.tags,
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

  onShow: function () {
    // 100为导航栏swiper-tab 的高度
    this.setData({
      scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100),
    })
  },


  //点击切换
  clickTab: function (e) {
    console.log(e.currentTarget.dataset.tags)

    const that = this;
    that.getList()
  

/**/
   wx.showLoading();
    wx.request({ //相册列表
      url: app.globalData.host + '/?api=tab_list&page=1&tags=' + e.currentTarget.dataset.tags,
      success: function (pro) {
        that.setData({
          list: pro.data,
          curIdx: e.currentTarget.dataset.current,
        })
      },
    })


  },

  //滑动切换
  onReachBottom: function () {
    console.log('到底了')
    var page = ++this.data.curpage
    var tags = this.data.tags
    this.getList();
  },



  home: function (e) {
    wx.reLaunch({
      url: '/pages/index/index',
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

  imgYu: function (e) {
    //  var src = e.currentTarget.dataset.src;
    var imgList = e.currentTarget.dataset.list;
    //图片预览
    wx.previewImage({
      //   current: src,
      urls: [imgList]
    })
  },

  
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

  /////////////////////////////////////


  //穿越
  chuan: function (e) {
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
  user: function (e) {
    if (wx.getStorageSync('uid')) {
      wx.navigateTo({
        url: '/pages/user/user',
      })
    }
  },

  //首页
  home: function (e) {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },


  //详情
  show: function (e) {
    var aid = e.currentTarget.dataset.aid;
    wx.navigateTo({
      url: '/pages/show/show?aid=' + aid,
    })

  },

  span: function (e) {
    wx.navigateTo({
      url: '/pages/span/span',
    })
  },


})