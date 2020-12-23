// pages/blog/blog.js
const db = wx.cloud.database();
import $ from './../../utils/loading';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    blogList: [],
  },

  Todetail(e) {
    const res = e.detail.singleData
    wx.navigateTo({
      url: '../detail/detail?data=' + JSON.stringify(res),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userData = wx.getStorageSync('userData') || []
    if (!userData.length) {
      return
    }
    $.loading('玩命加载中...')
    let res = Number(options.type)
    // const title = res ? '我的发布' : '我的收藏'
    if (res) {
      this.getAllData()
    } else {
      this.getCollectionData()
    }

  },
  getAllData() {
    db.collection('blog_collection').where({
        author_id: '{openid}'
      }).orderBy('update_time', 'desc')
      .get().then((res) => {
        console.log('我的发布：', res)
        this.setData({
          title: '我的发布',
          blogList: res.data
        })
        $.hideLoading()
      })
  },
  getCollectionData() {
    wx.cloud.callFunction({
      name: 'collectionblog',
      data: {},
    }).then((res) => {
      console.log('我的收藏', res)
      this.setData({
        title: '我的收藏',
        blogList: res.result.data
      })
      $.hideLoading()
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