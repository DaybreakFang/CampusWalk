// pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = Number(options.type)
  const title = res ? '我的发布' : '我的收藏'
    this.setData({
      title
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})