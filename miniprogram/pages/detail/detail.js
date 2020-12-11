// pages/detail/detail.js

const db = wx.cloud.database()
var likeData = {}
var blogID = ''
var cloudLikeUser = ''
var cloudCollection = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top: 0, //标题图标距离顶部距离
    opacity: 0,
    scrollTop: 0.5,
    isLike: false,
    isCollection: false,
    skeletonShow: true,
    author_avatar: '',
    author_name: '',
    img_list: [],
    content: '',
    like_count: 0,
    location_name: ''
  },
  initNavigation(e) {
    this.setData({
      opacity: e.detail.opacity,
      top: e.detail.top
    })
  },
  opcityChange(e) {
    this.setData({
      opacity: e.detail.opacity
    })
  },
  back() {
    wx.navigateBack();
  },
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  btnLike() {
    if (this.data.isLike) {
      this.setData({
        isLike: false,
        like_count: this.data.like_count - 1
      })
      cloudLikeUser = ''
    } else {
      this.setData({
        isLike: true,
        like_count: this.data.like_count + 1
      })
      wx.showToast({
        title: "感谢点赞，推荐已收到~",
        icon: 'none'
      })
      cloudLikeUser = likeData
    }

  },
  collection() {

    if (this.data.isCollection) {
      this.setData({
        isCollection: false
      })
      cloudCollection = ''
    } else {
      this.setData({
        isCollection: true
      })
      wx.showToast({
        title: "收藏成功",
        icon: 'none'
      })
      cloudCollection = likeData
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userData = wx.getStorageSync('userData')[0]
    /**
     * 两种进入方式
     * 1. 通过 attraction 页面进入 无需要调用数据库
     * @todo 2. 通过 message 页面 获取文章 ID 进入  需要 doc(id) 查询 attraction_collection 数据库
     * 
     */
    console.log('我的点赞 和收藏：', userData.star_list, userData.like_list)
    const res = JSON.parse(options.data)
    //赋值 文章ID 到全局
    blogID = res._id
    let {
      nickName,
      avatarUrl,
      _openid
    } = userData
    let {
      content,
      _id,
      author_id
    } = res
   
    likeData = {
      nickName,
      avatarUrl,
      content,
      _id,
      author_id,
      _openid
    }
    this.getAllData(res)
  },

  async getAllData(data) {
    let {
      author_avatar,
      author_name,
      content,
      img_list,
      like_count,
      location_name
    } = data
    this.setData({
      author_avatar,
      author_name,
      img_list,
      content,
      like_count,
      location_name
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
    var userData = wx.getStorageSync('userData')[0]
    console.log('blogID::::::',blogID)
    let str = blogID + ''
    let star = userData.star_list.indexOf(str)
    let like = userData.like_list.indexOf(str)
    if (star != -1) {
      this.setData({
        isCollection: true
      })
    }
    if (like != -1) {
      this.setData({
        isLike: true
      })
    }
    console.log('本文ID：', blogID)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  async onUnload() {
    if ((!cloudLikeUser) && (!cloudCollection)) {
      return
    }
    var userData = wx.getStorageSync('userData')[0]
    if (cloudLikeUser) {
      await wx.cloud.callFunction({
        name: "likecollection",
        data: {
          cloudLikeUser: cloudLikeUser,
        }
      }).then((res) => {
        userData.like_list.push(likeData._id);
        console.log('点赞处理到云端', res)
      })
    }
    if (cloudCollection) {
      await db.collection('profile_collection')
        .where({
          _openid: '{openid}'
        })
        .update({
          data: {
            star_list: db.command.push(likeData._id)
          }
        }).then((res) => {
          userData.star_list.push(likeData._id);
          console.log('收藏：', res)
        })
    }
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