// miniprogram/pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0,
    scrollTop: 0.5,
    isLogin:false,
    swiperArr: [
      "/images/banner1.png",
      "/images/banner2.png"
    ],
    blogList: [{
        img: "cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/bm2.jpg",
        name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/ZvKxZFblJNlOny5YO0LfDNwicEZic2gNcBaYe6Gv2RmfPbiawllGXFGL9vibp6w0wYiam6aN31ZuB5hHFFYwSyTyiaFw/132",
        nickname: '计算机信息与科学技术学院',
        like: 2342
      },

      {
        img: "cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/sty1.jpg",
        name: '德国DMK进口牛奶  欧德堡',
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/ZvKxZFblJNlOny5YO0LfDNwicEZic2gNcBaYe6Gv2RmfPbiawllGXFGL9vibp6w0wYiam6aN31ZuB5hHFFYwSyTyiaFw/132",
        nickname: '计算机信息与科学技术学院',
        like: 999
      },

      {
        img: "cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/xzy1.jpg",
        name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/ZvKxZFblJNlOny5YO0LfDNwicEZic2gNcBaYe6Gv2RmfPbiawllGXFGL9vibp6w0wYiam6aN31ZuB5hHFFYwSyTyiaFw/132",
        nickname: '计算机信息与科学技术学院',
        like: 666
      },

      {
        img: "cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/lyd2.jpg",
        name: '百雀羚套装女补水保湿护肤品',
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/ZvKxZFblJNlOny5YO0LfDNwicEZic2gNcBaYe6Gv2RmfPbiawllGXFGL9vibp6w0wYiam6aN31ZuB5hHFFYwSyTyiaFw/132",
        nickname: '计算机信息与科学技术学院',
        like: 236
      },

      {
        img: "cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/nm1.jpg",
        name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/ZvKxZFblJNlOny5YO0LfDNwicEZic2gNcBaYe6Gv2RmfPbiawllGXFGL9vibp6w0wYiam6aN31ZuB5hHFFYwSyTyiaFw/132",
        nickname: '计算机信息与科学技术学院',
        like: 2399
      },

      {
        img: "cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/nm1.jpg",
        name: '短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤',
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/ZvKxZFblJNlOny5YO0LfDNwicEZic2gNcBaYe6Gv2RmfPbiawllGXFGL9vibp6w0wYiam6aN31ZuB5hHFFYwSyTyiaFw/132",
        nickname: '计算机信息与科学技术学院',
        like: 2399
      },

      {
        img: "cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/nm1.jpg",
        name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜',
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/ZvKxZFblJNlOny5YO0LfDNwicEZic2gNcBaYe6Gv2RmfPbiawllGXFGL9vibp6w0wYiam6aN31ZuB5hHFFYwSyTyiaFw/132",
        nickname: '计算机信息与科学技术学院',
        like: 2342
      },

      {
        img: "cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/nm1.jpg",
        name: '德国DMK进口牛奶',
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/ZvKxZFblJNlOny5YO0LfDNwicEZic2gNcBaYe6Gv2RmfPbiawllGXFGL9vibp6w0wYiam6aN31ZuB5hHFFYwSyTyiaFw/132",
        nickname: '计算机信息与科学技术学院',
        like: 999
      },

      {
        img: "cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/nm1.jpg",
        name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/ZvKxZFblJNlOny5YO0LfDNwicEZic2gNcBaYe6Gv2RmfPbiawllGXFGL9vibp6w0wYiam6aN31ZuB5hHFFYwSyTyiaFw/132",
        nickname: '计算机信息与科学技术学院',
        like: 666
      },

      {
        img: "cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/nm1.jpg",
        name: '百雀羚套装女补水保湿护肤品',
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/ZvKxZFblJNlOny5YO0LfDNwicEZic2gNcBaYe6Gv2RmfPbiawllGXFGL9vibp6w0wYiam6aN31ZuB5hHFFYwSyTyiaFw/132",
        nickname: '计算机信息与科学技术学院',
        like: 236
      }
    ],
    loadding: false,
    pullUpOn: true,
    update:false
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
      },
      fail() {
        //如果用户拒绝授权，则要告诉用户不授权就不能使用，引导用户前往设置页面。
        console.log('没有定位授权')
        wx.showModal({
          cancelColor: 'cancelColor',
          title: '没有授权无法获取位置信息',
          content: '是否前往设置页面手动开启',
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
      opacity:e.detail.opacity
    })
  },
  opcityChange(e) {
    this.setData({
      opacity:e.detail.opacity
    })
  },
	onPageScroll(e) {
    this.setData({
      scrollTop:e.scrollTop
    })
  },
  toLogin(){
    wx.navigateTo({
      url: '../authorize/authorize',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userData = wx.getStorageSync('userData') || []
    if(userData.length){
      this.setData({
        isLogin:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userData = wx.getStorageSync('userData') || []
    if(this.data.update || userData.length){
      this.setData({
        update:false,
        isLogin:true
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

  onPullDownRefresh: function () {
    //延时为了看效果
    setTimeout(() => {
      this.setData({
        // productList: this.data.loadData,
        // pageIndex: 1,
        pullUpOn: true,
        loadding: false
      }, () => {
        wx.stopPullDownRefresh();
      })
    }, 1000)
  },

  onReachBottom: function () {
    if (!this.data.pullUpOn) return;
    this.setData({
      loadding: true
    }, () => {
      // setTimeout(() => {
      //   if (this.data.pageIndex == 3) {
      //     this.setData({
      //       loadding: false,
      //       pullUpOn: false
      //     })
      //   } else {
      //     this.setData({
      //       productList: this.data.productList.concat(this.data.loadData),
      //       pageIndex: this.data.pageIndex + 1,
      //       loadding: false
      //     })
      //   }
      // }, 10);
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})