// pages/add/add.js
const MAX_WORDS_NUM = 500;
var article = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: [], //初始化图片
    dealWithValue: [], // 裁剪后的 图片路径
    isOpen: false, // 是否展开 文本输入区域
    wordsNum: 0,
    location_name: ""
  },
  result: function (e) {
    console.log('结果', e.detail.imgArr)
    // wx.showModal({
    //   title: "错误",
    //   content: "您好像不在校园内，请进入校园后再试试",
    //   showCancel: false,
    //   confirmText: "我知道了",
    //   success: function () {
    //     wx.navigateBack({})
    //   }
    // })
  },
  remove: function (e) {
    //移除图片
    console.log('移除', e)
  },
  focusInput() {
    this.setData({
      isOpen: true
    })
  },
  blurInput() {
    this.setData({
      isOpen: false
    })
  },
  onInput(event) {
    let wordsNum = event.detail.value.trim().length;
    let words = `${wordsNum} / ${MAX_WORDS_NUM}`
    this.setData({
      wordsNum: words
    })
    // 将字数 赋值给全局
    article = wordsNum

  },
  send() {
    let imgCount = this.data.value.length;
    this.check(article, imgCount)
  },
  check(wordsCount, imgCount) {
    console.log('word:', wordsCount)
    console.log('img:', imgCount)
    let wordsRes = wordsCount ? true : '您还没有添加文本哦！';
    let imgRes = imgCount ? true : '您还没有添加图片哦！';
    let res = (wordsRes === true) && (imgRes === true)
// @todo  未完成 判断
    if (wordsRes === true) {
      return wordsRes
    } else {
      wx.showModal({
        title: "友情提示",
        content: wordsRes,
        showCancel: false,
        confirmText: "我知道了",
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  let location_name = JSON.parse(options.location_name)
    //  this.setData({
    //   location_name
    //  })
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