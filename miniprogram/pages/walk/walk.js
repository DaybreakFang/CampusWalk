var app = getApp();
const db = wx.cloud.database()
const Attractions = db.collection('attraction_collection')
//使用 微信官方 同声传译 插件
var plugin = requirePlugin("WechatSI")
import inArea from './../../utils/inArea'
// 学校范围
var pointArr = [{
    longitude: 113.908074,
    latitude: 30.937753
  },
  {
    longitude: 113.911572,
    latitude: 30.937918
  },
  {
    longitude: 113.911529,
    latitude: 30.939317
  },
  {
    longitude: 113.916807,
    latitude: 30.938875
  },
  {
    longitude: 113.916249,
    latitude: 30.936243
  },
  {
    longitude: 113.918245,
    latitude: 30.934624
  },
  {
    longitude: 113.917515,
    latitude: 30.932802
  },
  {
    longitude: 113.914511,
    latitude: 30.931771
  },
  {
    longitude: 113.908052,
    latitude: 30.933556
  },
  {
    longitude: 113.907752,
    latitude: 30.931808
  },
  {
    longitude: 113.901980,
    latitude: 30.931955
  },
  {
    longitude: 113.902259,
    latitude: 30.935746
  },
  {
    longitude: 113.907752,
    latitude: 30.935728
  },
];
// 创建 audio 声音播放能力
const AUDIOMANAGER = getApp().globalData.global_bac_audio_manager.manage
Page({

  data: {
    currentImgIndex: 0,
    title: '漫游校园',
    isPlay: false,
    isLocation: true,
    locationList: [],
    nodata: false,
    update: false
  },


  ToAttraction() {
    let index = this.data.currentImgIndex
    var userData = wx.getStorageSync('userData') || []
    if (userData.length) {
      wx.navigateTo({
        url: '../attraction/attraction?id=' + index,
      })
      this.updateViews(this.data.locationList[index]._id)
    } else {
      wx.navigateTo({
        url: '../authorize/authorize'
      })
    }

  },

  /**
   * 访问量 +1
   * @param {location_id} id 
   */
  async updateViews(id) {
    Attractions.doc(id)
      .update({
        data: {
          visitors: db.command.inc(1)
        }
      }).then(res => {
        console.log('访客量：', res)
      })
  },
  // 切换 卡片
  swiperChange: function (e) {
    let index = e.detail.current;
    this.setData({
      currentImgIndex: index,
    });
  },
  // 点击 图片 播放
  async play() {
    var Index = this.data.currentImgIndex;
    const {distance,location_name,location_desc} = app.globalData.locationList[Index]
    let res = distance ? `距离您当前位置${Math.round(distance)}米是${location_name}。${location_desc}` : `您当前所在的位置是${location_name}。${location_desc}`
    if (!this.data.isPlay) {
      this.setData({
        isPlay: true
      })
      // 转语音并播放
      this.ToSpeech(res)

    } else {
      // 暂停播放
      wx.pauseBackgroundAudio()
      this.setData({
        isPlay: false
      })
    }
  },
  // 文字转语音 content：文字
  ToSpeech(content) {
    let that = this;
    // 调用 同声传译插件
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: content,
      success: function (res) {
        console.log("生成成功")
        // 传入声音源
        AUDIOMANAGER.src = res.filename
        // ios下 必须携带 title
        AUDIOMANAGER.title = '你好'
        // 开始播放
        AUDIOMANAGER.onPlay(() => {
          console.log("开始播放")
        })
        // 播放完毕
        AUDIOMANAGER.onEnded(() => {
          that.setData({
            isPlay: false
          })
          console.log("播放完毕")
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
        })
        console.log("生成失败")
      }
    })
  },

  // 初次加载 最近的所有地标
  getLocations() {
    var that = this
    wx.getLocation({ //获取地址
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log('现在所在位置', latitude, longitude)
        //  测试 专用 ---- 图书馆
        var point = {
          longitude: 113.913417,
          latitude: 30.935636
        }

        //  上线 记得 开启这个
        // var point = {
        //   longitude,
        //   latitude
        // }
        // 判断 所在位置是否在校园内
        var inCampus = inArea.inArea(pointArr, point)
        console.log('在里面吗？', inCampus)

        if (inCampus) {
          Attractions.aggregate()
            .geoNear({
              distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
              spherical: true,
              near: db.Geo.Point(longitude, latitude),
              query: {},
              key: 'location_point', // 若只有 location 一个地理位置索引的字段，则不需填
              includeLocs: 'location_point', // 若只有 location 一个是地理位置，则不需填
            })
            .limit(10)
            .end()
            .then(res => {
              console.log('匹配结果', res.list)
              // 筛选 距离小于300的 地标
              //  let newArr = res.list.filter((item)=>{
              //     return item.distance < 300
              //   })
              //   console.log('小于300的：',newArr)
              that.setData({
                locationList: res.list,
                isLocation: false
              })
              // 赋值给全局
              app.globalData.locationList = res.list
            })
        } else {
          wx.showModal({
            title: "错误",
            content: "您好像不在校园内，请进入校园后再试试",
            showCancel: false,
            confirmText: "我知道了",
            success: function () {
              wx.navigateBack({})
            }
          })

        }
      },
      fail: function () {
        wx.showModal({
          title: "错误",
          content: "请检查手机定位是否开启",
          showCancel: false,
          confirmText: "我知道了",
          success: function () {
            wx.navigateBack({})
          }
        })
      }
    })

  },
   async scanGetLocation(id) {
    let arr = []
    const res = await Attractions.doc(id).get() 
    arr.push(res.data)
    this.setData({
      locationList: arr,
      isLocation: false
    })
    app.globalData.locationList = arr
  },

  onLoad: function (options) {
    if (options.id) {
      const id = JSON.parse(options.id)
      this.scanGetLocation(id)
    } else {
      //第一次加载 所有地标
      this.getLocations();
    }



  },
  onShow: function () {
    if (this.data.update) {
      this.ToAttraction()
      this.setData({
        update: false
      })
    }
  },
  onReady(e) {}
})