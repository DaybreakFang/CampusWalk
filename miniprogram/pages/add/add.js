// pages/add/add.js
const MAX_WORDS_NUM = 500;
var textCount = 0;
var imgCount = 0;
var txtContent = ''
var imgList = [] // 上传图片合集
var location_id = ''
var userData = wx.getStorageSync('userData')
const db = wx.cloud.database()
const blog_collection = db.collection('blog_collection')
import $ from './../../utils/loading';
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
    // 将图片数 赋值给全局
    imgCount = e.detail.imgArr.length;
    imgList = e.detail.imgArr
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
  async blurInput() {
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
    textCount = wordsNum;
    // 将内容 赋值给全局
    txtContent = event.detail.value.trim();

  },
  async send() {
  
    var {avatarUrl,nickName,_openid} = userData[0]  
    if (imgCount == 0) {
      this.check(true)
    } else if (textCount < 10) {
      this.check(false)
    } else {
      $.loading('发布中...')
      const res = await wx.cloud.callFunction({
        name: "msgsec",
        data: {
          content: txtContent
        }
      })
      console.log('检测结果：', res.result.code)
      if (res.result.code) {
        console.log('全部通过')
      blog_collection.add({
          data:{ 
            author_id:_openid, // 作者唯一ID
            author_name:nickName, // 作者昵称
            author_avatar:avatarUrl, // 作者头像
            content:txtContent, // 上传文字
            img_list:imgList, // 上传图片的云存储地址合集
            like_list:[], // 点赞合集
            location_id:location_id, // 地标ID
            location_name:this.data.location_name, // 地标名称
            update_time: db.serverDate(), //服务端时间
          }
        }).then((res)=>{
          $.hideLoading()
          if(res._id){
            
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];  //上一个页面
            //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
            prevPage.setData({
              isSendSuccess: true
            })
            wx.navigateBack();
            wx.vibrateLong()
            // 检查图片安全 @todo 待实现 
          //  this.imgCloudCheck(res._id)
          }else{
            wx.showModal({
              title: "友情提示",
              content: '发布失败！请稍后重试',
              showCancel: false,
              confirmText: "我知道了",
            })
          }
        })
      } else {
        $.hideLoading();
        wx.showModal({
          title: "友情提示",
          content: '文本含有违规内容！',
          showCancel: false,
          confirmText: "我知道了",
        })
      }
    }
  },
  check(type) {
    let res = type ? '至少需要添加1张图片哦！' : '最少写10个字才能发布哦！';
    wx.showModal({
      title: "友情提示",
      content: res,
      showCancel: false,
      confirmText: "我知道了",
    })
  },
  /**
   * @todo 待实现 
   *
   */
  // async imgCloudCheck(id){
  //    wx.cloud.callFunction({
  //     name: "msgsec",
  //     data: {
  //       id
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let datalist = JSON.parse(options.datalist)
    let {location_id,location_name} = datalist
     this.setData({
      location_name
     })
     // 赋值给全局
     location_id = location_id
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