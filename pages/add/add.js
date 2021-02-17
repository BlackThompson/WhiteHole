const app = getApp()
const qiniuUploader = require("../../utils/qiniuUploader");
var that = this;

// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'ECN', // 华北区
    uptokenURL: app.globalData.host + '/qiniu.php?api=uptoken',
    domain: '/'
  };
  qiniuUploader.init(options);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageObject: '',
  },

  onLoad: function (options) {
    var that = this;
    var uid = wx.getStorageSync('uid')
    wx.request({
        url: app.globalData.host + '/?api=reg&uid=' + uid,
        success: function (pro) {
          that.setData({
            a_nickname: pro.data.a_nickname
          });
        },
      }),
      wx.request({ //相册列表
        url: app.globalData.host + '/?api=tags',
        success: function (pro) {
          that.setData({
            tags: pro.data,
          })
        },

      })

  },

  //  停止下拉
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  checkChange: function (e) {
    //console.log('radio发生change事件，携带value值为：', e)
    var that = this
    var items = this.data.items;
    var checkArr = e.detail.value;
    var data = [];
    for (var key in checkArr) {
      var newKey = checkArr[key];
      var value = this.data.items[newKey];
      data.push(value['value']);
    }
    that.setData({
      value: e.detail.value,
      data: data
    })

    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      items: items
    })
  },


  didPressChooesImage: function () {
    var that = this;
    didPressChooesImage(that);
  },


  add_need: function (e) { //修改相册
    var that = this;
    // var title = e.detail.value.title;
    var contact = e.detail.value.contact;
    var img = e.detail.value.imgurl;
    var access_token = e.detail.value.access_token;
    var uid = wx.getStorageSync('uid');
    if (contact == "") {
      wx.showToast({
        title: '说点什么吧!',
        icon: 'loading',
        duration: 500
      });
    } else {

      wx.request({
        url: app.globalData.host + '/?api=tel_add',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          uid: uid,
          com: 1,
          img: e.detail.value.imgurl,
          contact: e.detail.value.contact,
        },
        success: function (res) {
          console.log(res.data.msg)
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          });

          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/index/index',
              // url: '/pages/add/add'
            })
          }, 2000);

        }
      })

    }

  },


  changeSex: function (e) {
    const that = this;
    console.log(e.detail.value)

  },

  tips: function (e) {
    wx.navigateTo({
      url: '/pages/tip/tip',
    })
  },


})

function didPressChooesImage(that) {
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
    count: 5,
    success: function (res) {
      wx.showLoading({
        mask: true,
        title: '上传中..',
      });

      var filePath = res.tempFilePaths[0];
      qiniuUploader.upload(filePath, (res) => {
        // console.log(res.imageURL)   
        that.setData({
          'imageObject': 'http://img2.photo.telyun.com' + res.imageURL
        })
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      });
      wx.hideLoading()
    }
  })
}