let app = getApp();
var page = 0; //分页标识，第几次下拉，用户传给后台获取新的下拉数据
Page({

  data: {
    curpage: 1,
    list: null,
    uid : wx.getStorageSync('uid')
  },
  onLoad: function() { //初始化
    wx.showLoading();
    var _this = this;
    /**list*/
    _this.getList();
    
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




  onPullDownRefresh: function() { //  停止下拉
    wx.stopPullDownRefresh()
  },

  onReachBottom: function() { //上拉动作, push数据
    //console.log(++this.data.curpage);
    var page = ++this.data.curpage
    this.getList();
  },

  getList: function() {
    
    wx.showLoading({
      mask: true
    });


    if (wx.getStorageSync('uid')) {
    //  console.log('ddd');
    } else {
      this.getuser();
    }


    var _this = this;
    wx.request({
      url: app.globalData.host + '/?api=list',
      data: {
        page: _this.data.curpage
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
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
 

 getuser:function(){
   var _this = this;
   wx.request({
     url: app.globalData.host + '/?api=reg&uid=' + wx.getStorageSync('uid'),
     success: function (pro) {
       wx.setStorageSync('uid', pro.data.uid);
       _this.setData({
         uid: uid
       });
     },
   }) 
 },

  ding: function(e) {
    var aid = e.currentTarget.dataset.aid;
    var xid = e.currentTarget.dataset.xid;
    var list = this.data.list;
    list[xid]['din'] = parseInt(list[xid]['din']) + 1;
    this.setData({
      list:list
    });
    wx.request({
      url: app.globalData.host + '/?api=din&aid=' + aid + '&uid=' + wx.getStorageSync('uid'),      
    });
  },

  cai: function(e) {
  //  var that = this;
    var aid = e.currentTarget.dataset.aid;
    var xid = e.currentTarget.dataset.xid;
    var list = this.data.list;
    list[xid]['cai'] = parseInt(list[xid]['cai']) + 1;
    this.setData({
      list: list
    });
    wx.request({
      url: app.globalData.host + '/?api=ju&aid=' + aid + '&uid=' + wx.getStorageSync('uid'),  
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
        var imgList = e.currentTarget.dataset.list;
       wx.previewImage({
             urls: [imgList] 
    })  
  },







  /////////////////////////////////////


  //穿越
  chuan: function (e) {
    wx.reLaunch({
      url: '/pages/chuan/chuan',
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

  //图文
  pic: function (e) {
    wx.reLaunch({
      url: '/pages/pic/pic',
    })
  },
  
//首页
  home: function(e) {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },


//详情
  show: function(e) {
    var aid = e.currentTarget.dataset.aid;
    wx.navigateTo({
      url: '/pages/show/show?aid=' + aid,
    })

  },





})