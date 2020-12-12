// pages/profile/profile.js
const app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"我的",
    isLogin: false,
    update:false,
    nickName:"",
    avatarUrl:""

  },

  tapEvent(e){
    /**
     * index = 1 前往 我的发布
     * index = 0 前往 我的收藏
     */
    let index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '../blog/blog?type='+index,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userData = wx.getStorageSync('userData') || []
    if(userData.length){
      let {avatarUrl,nickName} = userData[0]  
      this.setData({
        isLogin:true,
        avatarUrl,nickName
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
      let {avatarUrl,nickName} = userData[0]  
      this.setData({
        isLogin:true,
        avatarUrl,nickName,
        update:false
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