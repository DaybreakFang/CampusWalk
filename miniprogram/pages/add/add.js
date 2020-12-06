// pages/add/add.js
const MAX_WORDS_NUM = 500
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl:'',
    value:[], //初始化图片
    dealWithValue:[], // 裁剪后的 图片路径
    isOpen:false, // 是否展开 文本输入区域
    wordsNum:0
  },
  result: function(e) {
    console.log('结果',e.detail.imgArr)
  },
  remove: function(e) {
    //移除图片
    console.log('移除',e)
  },
  focusInput(){
    this.setData({
      isOpen:true
    })
  },
  blurInput(){
    this.setData({
      isOpen:false
    })
  },
  onInput(event) {
    let wordsNum = event.detail.value.length;
    if (wordsNum >= MAX_WORDS_NUM) {
      wordsNum = `最大字数为${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(()=>{
      this.value=['cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/bm2.jpg']
      this.setData({
        value:['cloud://hg-sign-123.6867-hg-sign-123-1301188928/land_banner/bm2.jpg']
      })
    },200)
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