// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "消息中心",
    currentTab: 0,
    navbar: [{
      name: "我的消息"
    }, {
      name: "系统通知"
    }],
    message:[
      {
        nickname:"飞翔的企鹅",
        desc:"赞了你的动态【这里充满了换联赛看房竞赛分三赛看过晒功德分赛",
        avatar:"/images/avatar.png",
        date:"刚刚"
      },
      {
        nickname:"飞翔的企鹅",
        desc:"赞了你的动态【这里充满了换联赛看房竞赛分三赛看过晒功德分赛",
        avatar:"/images/avatar.png",
        date:"刚刚"
      },
      {
        nickname:"飞翔的企鹅",
        desc:"赞了你的动态【这里充满了换联赛看房竞赛分三赛看过晒功德分赛",
        avatar:"/images/avatar.png",
        date:"刚刚"
      },
      {
        nickname:"飞翔的企鹅",
        desc:"赞了你的动态【这里充满了换联赛看房竞赛分三赛看过晒功德分赛",
        avatar:"/images/avatar.png",
        date:"刚刚"
      }
    ],
    official:[
      // {
      //   nickname:"漫游校园官方",
      //   desc:"你发布的《这里充满...》已被精选至首页",
      //   avatar:"/images/avatar.png",
      //   date:"刚刚"
      // },
      // {
      //   nickname:"漫游校园官方",
      //   desc:"你发布的《这里充满...》已被精选至首页",
      //   avatar:"/images/avatar.png",
      //   date:"刚刚"
      // }
    ]
  },
  change(e) {
    console.log(e.detail.index)
    this.setData({
      currentTab: e.detail.index
    })
  },
  detail(){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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