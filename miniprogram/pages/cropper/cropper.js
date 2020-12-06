// pages/cropper/cropper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top: 0, //标题图标距离顶部距离
    imageUrl:[],
    startCutting:0
  },
  initNavigation(e) {
    this.setData({
      top:e.detail.top
    })
  },

  back() {
    wx.navigateBack();
  },
  // 确认裁剪
  btnCropper() {
    this.setData({
      startCutting: this.data.startCutting + 1
    })
  },
  cropper(e) {
    //裁剪完成后处理逻辑
    // wx.previewImage({
    //   current: '', // 当前显示图片的http链接
    //   urls: [e.detail.url] // 需要预览的图片http链接列表
    // });
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
 
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    let arr =[e.detail.url]
    prevPage.setData({
      dealWithValue: arr
    })
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data =  JSON.parse(options.arr)
    this.setData({
      imageUrl:data
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