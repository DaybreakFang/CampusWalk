// pages/login/login.js
const db = wx.cloud.database()
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: ""
  },



  //登录授权
  getUserInfo(e) {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: res => {
              wx.showLoading({
                title: "登录中",
                mask: true
              })
              let {
                avatarUrl,
                nickName
              } = res.userInfo
              // 获取到的头像不是很清晰，这是因为默认的头像大小为132*132, 把avatarUrl链接后面的132修改为0就能获取到640*640大小的头像
              avatarUrl = avatarUrl.split("/")
              avatarUrl[avatarUrl.length - 1] = 0;
              avatarUrl = avatarUrl.join('/');

              that.checkUser(avatarUrl, nickName)
            }
          })
        } else {
          wx.showToast({
            title: '授权失败',
          })
        }
      }
    })
  },
  // 检查 新/老用户
  async checkUser(avatarUrl, nickName) {
    //获取profile_collection是否有当前用户的数据，注意这里默认带了一个where({_openid:"当前用户的openid"})的条件
    const userData = (await db.collection('profile_collection').where({
      _openid: '{openid}'
    }).get()).data
    // console.log("当前用户的数据对象", userData)

    //如果当前用户的数据data数组的长度为0，说明数据库里没有当前用户的数据
    if (userData.length === 0) {
      await db.collection('profile_collection').add({
        data: {
          avatarUrl,
          nickName,
          "star_list": [],
          "message_list":[],
          "role": 0
        }
      })
    } else { //如果有数据，将数据缓存
      wx.setStorageSync('userData', userData)
      this.uploadMsg(avatarUrl, nickName)
    }
    wx.hideLoading()
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      update: true
    })
    wx.navigateBack();
  },
  // 更新 头像 或 昵称
  async uploadMsg(avatarUrl, nickName) {
    const result = await db.collection('profile_collection').where({
      _openid: '{openid}'
    }).update({
      data: {
        avatarUrl,
        nickName
      }
    })
    console.log("更新结果", result)

  },
 
  Goback() {

    wx.navigateBack()
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