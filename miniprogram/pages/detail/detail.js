// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top: 0, //标题图标距离顶部距离
    opacity: 0,
    scrollTop: 0.5,
    isLike:false,
    skeletonShow: true,
    detail:{
      nickname:'你好',
      imgArr:[
        "cloud://hg-sign-123.6867-hg-sign-123-1301188928/test/QQ20201207-0.jpg",
        "cloud://hg-sign-123.6867-hg-sign-123-1301188928/test/QQ20201207-1.jpg",
        "cloud://hg-sign-123.6867-hg-sign-123-1301188928/test/QQ20201207-2.jpg"
      ]
    }
      
   
  },
  initNavigation(e) {
    this.setData({
      opacity:e.detail.opacity,
      top:e.detail.top
    })
  },
  opcityChange(e) {
    this.setData({
      opacity:e.detail.opacity
    })
  },
  back() {
    wx.navigateBack();
  },
	onPageScroll(e) {
    this.setData({
      scrollTop:e.scrollTop
    })
  },
  btnLike() {
    this.setData({
      isLike:!this.data.isLike
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      this.setData({
        skeletonShow:false
      })
    }, 4000);
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