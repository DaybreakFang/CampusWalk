// pages/message/message.js
const db = wx.cloud.database()
const message_collection = db.collection('message_collection')
var util = require('../../utils/formatDate');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "消息中心",
    currentTab: 0,
    isClose: false,
    navbar: [{
      name: "我的消息"
    }, {
      name: "系统通知"
    }],
    messageList: [],
    officialList: []
  },
  change(e) {
    this.setData({
      currentTab: e.detail.index
    })
  },
  detail(e) {
    const id = JSON.stringify(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
    // 关闭小红点
    this.setData({
      isClose: true
    })
    // 删除消息
    this.delData(e.currentTarget.dataset.msg)
  },
  async delData(e) {
    const res = await db.collection('message_collection').doc(e).remove()
    console.log('删除：', res)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const res = await message_collection.where({
      receive_id: '{openid}'
    }).orderBy('origin_time', 'desc').get()
    const dataList = res.data.map((item, index) => {
      item.origin_time = util.timeago(item.origin_time, 'Y年M月D日');
      return item
    })
    const messageList = dataList.filter((item, index) => {
      return item.message_type == 0
    })
    const officialList = dataList.filter((item, index) => {
      return item.message_type == 1
    })
    this.setData({
      messageList,
      officialList
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