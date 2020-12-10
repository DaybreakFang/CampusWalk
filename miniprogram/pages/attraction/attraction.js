// pages/attraction/attraction.js
const app = getApp()
const db = wx.cloud.database()
const blog_collection = db.collection('blog_collection')
var locationID = ''
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
    blogList: []
  },
  ToAdd() {
    
    var datalist = {
      location_id:locationID,
      location_name:this.data.location_name
    }
    let data = JSON.stringify(datalist)
    wx.navigateTo({
      url: '../add/add?datalist='+ data,
    })
  },
 
   async GetPointData(currentAttractionData) {
    // const res = await wx.cloud.callFunction({
    //   name: "attractionBlog",
    //   data: {id}
    // })
    var {location_name,location_img,_id} = currentAttractionData
     blog_collection.where({
      location_name
    }).get().then((res)=>{
      console.log('本地结果：',res.data)
      this.setData({
          location_name,
          location_img,
          blogList:res.data,
          blog_Count:res.data.length
        })
    })
      // 保存 到 当前 全局
      locationID = _id
      setTimeout(()=>{
        $.hideLoading()
      },500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
 async onLoad(options) {
    $.loading('玩命加载中...')
    const locationsListData = app.globalData.locationList // walk页 存的全局的数据
    // var listCount = Object.keys(locationsListData).length;
    const currentAttractionData = locationsListData[options.id];

     // 初次加载
    this.GetPointData(currentAttractionData)
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