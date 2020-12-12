// pages/attraction/attraction.js
const app = getApp()
const db = wx.cloud.database()
const blog_collection = db.collection('blog_collection')
var currentAttractionData = {}
var currentNewList = []
var currentHotList = []
import $ from './../../utils/loading';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top: 0, //标题图标距离顶部距离
    opacity: 0,
    scrollTop: 0.5,
    location_name: "",
    location_img: "",
    blog_Count:0,
    isSendSuccess:false, // 在发布页是否成功发布
    NewBlogList: [],
    HotBlogList:[],
    isSwitch:true // 新 热开关
  },
  ToAdd() {
    var datalist = {
      location_id:currentAttractionData._id,
      location_name:this.data.location_name
    }
    let data = JSON.stringify(datalist)
    wx.navigateTo({
      url: '../add/add?datalist='+ data,
    })
  },
  Todetail(e){
   const res = e.detail.singleData
  wx.navigateTo({
    url: '../detail/detail?data='+JSON.stringify(res),
  })
  },
  switchTab(e){
    wx.vibrateShort()
    var currentID = Number(e.currentTarget.dataset.sid);
    this.setData({
      isSwitch:!Boolean(currentID)
    })
    if((!currentNewList.length)||(currentHotList.length && currentNewList.length)){
      return
    }
    currentID ? this.GetHotData(this.data.location_name) : this.GetNewData()
    
  },

   async GetNewData() {
    var {location_name,location_img} = currentAttractionData
    const res = await blog_collection
     .where({ location_name })
    .orderBy('update_time','desc') // 按最新 排序
    .get()
    this.setData({
      location_name,
      location_img,
      NewBlogList:res.data,
      blog_Count:res.data.length
    })
      // 保存 最新 到 当前 全局
      currentNewList = res.data
      setTimeout(()=>{
        $.hideLoading()
      },500)
  },
  async GetHotData(location_name) {
    console.log('获取最热')
   const  res = await  blog_collection
     .where({ location_name })
    .orderBy('like_count','desc') // 按最热 排序
    .get()
    console.log('最热：',res)
    this.setData({
      HotBlogList:res.data
    })
      // 保存 最新 到 当前 全局
      currentHotList = res.data
  },
  /**
   * 生命周期函数--监听页面加载
   */
 async onLoad(options) {
    $.loading('玩命加载中...')
    const locationsListData = app.globalData.locationList // walk页 存的全局的数据
    // var listCount = Object.keys(locationsListData).length;
  // 保存 到 当前 全局
    currentAttractionData = locationsListData[options.id];
     // 初次加载
    this.GetNewData()
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
    if(this.data.isSendSuccess){
      wx.showToast({
        icon:'none',
        title: '发布成功！一大波赞美正在路上～',
      })
      this.setData({
        isSendSuccess:false
      })
     }
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