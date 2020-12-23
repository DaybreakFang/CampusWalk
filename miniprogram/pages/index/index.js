// miniprogram/pages/index/index.js
const db = wx.cloud.database()
var list = []
import $ from './../../utils/loading';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0,
    scrollTop: 0.5,
    isLogin: false,
    swiperArr: [
      "cloud://daybreak-123.6461-daybreak-123-1301188928/blog/默认文件1608634844631.png",
      "cloud://daybreak-123.6461-daybreak-123-1301188928/blog/未标题-2.png"
    ],
    blogList: [],
    loadding: false,
    pullUpOn: true,
    update: false,
    pageIndex:1
  },
 

  Todetail(e){
    const res = e.detail.singleData
    var userData = wx.getStorageSync('userData') || []
    if (userData.length) {
      wx.navigateTo({
        url: '../detail/detail?data='+JSON.stringify(res),
      })
    } else {
      wx.navigateTo({
        url: '../authorize/authorize'
      })
    }
   
   },

  scanQRCode() {
    wx.vibrateShort()
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        const id = JSON.stringify(res.result)
        var userData = wx.getStorageSync('userData') || []
        if (userData.length) {
          wx.navigateTo({
            url: '../walk/walk?id=' + id,
          })
        } else {
          wx.navigateTo({
            url: '../authorize/authorize'
          })
        }
      },
      fail: (res) => {
        console.log(res);
        wx.showToast({
          title: '扫描失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //定位授权 前往探索页
  authLocation() {
   
    wx.authorize({
      scope: 'scope.userLocation', //发起定位授权
      success: function () {
        console.log('有定位授权')
        wx.navigateTo({
          url: '../walk/walk',
        })
        wx.vibrateShort()
      },
      fail() {
        //如果用户拒绝授权，则要告诉用户不授权就不能使用，引导用户前往设置页面。
        console.log('没有定位授权')
        wx.showModal({
          cancelColor: 'cancelColor',
          title: '无法获取您的位置信息',
          content: '是否前往设置页面手动开启？',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                withSubscriptions: true,
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: '您取消了定位授权',
              })
            }
          },
          fail: function (e) {
            console.log(e)
          }
        })
      }
    })
  },
  initNavigation(e) {
    this.setData({
      opacity: e.detail.opacity
    })
  },
  opcityChange(e) {
    this.setData({
      opacity: e.detail.opacity
    })
  },
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '../authorize/authorize',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    $.loading('玩命加载中...')
    const res = await db.collection('blog_collection')
      .aggregate()
      .sample({
        size: 20
      })
      .end()
      list = res.list
      console.log('总数据：',list)
      // const arr =res.list.slice(0,4)
    this.setData({
      blogList: list
    })
    $.hideLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var userData = wx.getStorageSync('userData') || []
    if (userData.length) {
     setTimeout(() => {
      this.setData({
        isLogin: true
      })
     }, 1500);
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userData = wx.getStorageSync('userData') || []
    if (this.data.update || userData.length) {
      this.setData({
        update: false,
        isLogin: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  // onPullDownRefresh: function () {
  //   //延时为了看效果
  //   setTimeout(() => {
  //     this.setData({
  //       // productList: this.data.loadData,
  //       // pageIndex: 1,
  //       pullUpOn: true,
  //       loadding: false
  //     }, () => {
  //       wx.stopPullDownRefresh();
  //     })
  //   }, 1000)
  // },

  onReachBottom: function () {
    // if (!this.data.pullUpOn) return;
    // console.log('触底了')
    // this.setData({
    //   loadding: true
    // }, () => {
    //   setTimeout(() => {
    //     if (this.data.pageIndex == 3) {
    //       this.setData({
    //         loadding: false,
    //         pullUpOn: false
    //       })
    //     } else {
    //       const arr = list.slice(4,4)
    //       this.setData({
    //         blogList: this.data.blogList.concat(arr),
    //         pageIndex: this.data.pageIndex + 1,
    //         loadding: false
    //       })
    //     }
    //   }, 10);
    // })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})