// var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
// var qqmapsdk;

// // const StuInfo = db.collection('StuInfo')
// const $ = db.command.aggregate
// const Memories = db.collection('Memories')

// var app = getApp();
// var getmarkerData = []
//使用 微信官方 同声传译 插件
const db = wx.cloud.database()
const Attractions = db.collection('Attractions')
var plugin = requirePlugin("WechatSI")

import inArea from './../../utils/inArea'
import $ from './../../utils/loading'
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
    isLocation: false,
    locationTitle:"准备好了吗？",
    locationList: [],
    loadingShow: false,
    optionList: [{
        type: 'black',
        id: '0',
        title: '全部',
        checked: true
      },
      {
        type: 'primary',
        id: '1',
        title: '教学',
        checked: false
      },
      {
        type: 'warning',
        id: '2',
        title: '生活',
        checked: false
      },
      {
        type: 'green',
        id: '3',
        title: '风景',
        checked: false
      }
    ]

  },

  // 授权位置
  authLocation() {

    // this.mapCtx.moveToLocation({
    //   longitude: "113.914785",
    //   latitude: "30.937605",
    //   success: res => {
    //     console.log("回到原点");
    //     this.setData({
    //       scale: 15
    //     })
    //   }
    // })

  },

  // 切换 卡片
  swiperChange: function (e) {
    var a = e.detail.current;
    var locationTitle = this.data.locationList[a].name
    this.setData({
      currentImgIndex: a,
      locationTitle
    });
  },
  // 点击 图片 播放
  play: function () {
    var Index = this.data.currentImgIndex;
    const distance = Math.round(this.data.locationList[Index].distance);
    const name = this.data.locationList[Index].name;
    const desc = this.data.locationList[Index].desc;
    const text = `距离你当前位置${distance}米是${name}。${desc}`
    console.log('第几页', Index)
    if (!this.data.isPlay) {
      this.setData({
        isPlay: true
      })
      // 转语音并播放
      this.ToSpeech(text)
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
          setTimeout(() => {
            console.log("开始播放")
          }, 800)
        })
        // 播放完毕
        AUDIOMANAGER.onEnded(() => {
          console.log("播放完毕")
        })
      },
      fail: function (res) {
        console.log("生成失败")
      }
    })
  },
 
   // 初次加载 附近 10个 所有地标
  getLocations() {
    var that = this
    wx.getLocation({ //获取地址
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log('现在所在位置', latitude, longitude)
        var point = {
          longitude: 113.913417,
          latitude: 30.935636
        }
        // 判断 所在位置是否在校园内
        var inCampus = inArea.inArea(pointArr, point)
        console.log('在里面吗？', inCampus)

        if (inCampus) {
          Attractions.aggregate()
            .geoNear({
              distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
              spherical: true,
              near: db.Geo.Point(113.914785, 30.937605),
              query: {
                docType: 'geoNear'
              },
              key: 'location', // 若只有 location 一个地理位置索引的字段，则不需填
              includeLocs: 'location', // 若只有 location 一个是地理位置，则不需填
            })
            .limit(10)
            .end()
            .then(res => {
              that.setData({
                currentImgIndex: 0,
                locationList: res.list,
                isLocation: false,
                locationTitle :res.list[0].name
              })
              console.log('匹配结果', res.list)
            })
        } else {
          wx.showModal({
            title: "错误",
            content: "您好像不在校园内，请走进校园再试试",
            showCancel: false,
            confirmText: "我知道了",
            success: function () {
              wx.navigateBack({})
            }
          })

        }
        // qqmapsdk.reverseGeocoder({ //SDK调用
        //   location: {
        //     latitude,
        //     longitude
        //   },
        //   success: function (res) {
        //     console.log( res)
        //   }
        // })
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

  // 切换 分类选项卡
  optionType(e) {
    let nType = Number(e.currentTarget.dataset.index);
    let list = this.data.optionList;
    for (let i = 0; i < list.length; i++) {
      list[i].checked = false;
    }
    if (list[nType].checked) {
      list[nType].checked = false;
    } else {
      list[nType].checked = true;
    }
    // 显示 分类选项卡 的状态
    this.setData({
      optionList: this.data.optionList,
      loadingShow: true
    })
    $.loading('玩命加载中...', false)

    // 按类型加载
    this.getAttData(nType)
  },
  // 查询数据库 
  getAttData(k) {

    if (k) {
      var condition = {
        locaType: k
      }
    } else {
      var condition = {
        docType: 'geoNear'
      }
    }
    var that = this;
    Attractions.aggregate()
      .geoNear({
        distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
        spherical: true,
        near: db.Geo.Point(113.914785, 30.937605),
        query: condition,
        key: 'location', // 若只有 location 一个地理位置索引的字段，则不需填
        includeLocs: 'location', // 若只有 location 一个是地理位置，则不需填
      })
      .limit(10)
      .end()
      .then(res => {
        setTimeout(function () {
          that.setData({
            currentImgIndex: 0,
            locationList: res.list,
            loadingShow: false
          })
          $.hideLoading()
        }, 500)
        console.log('匹配结果', res.list)
      })


  },
 onLoad: function (options) {
    //第一次加载 所有地标
    this.getLocations();
    
  },
  //     this.app = getApp()
  //     // 实例化API核心类
  //     qqmapsdk = new QQMapWX({
  //       key: 'NWIBZ-QD4C4-YZJUA-D4BHO-U3KVK-SGFXR'
  //     });
  //     this.getArround();

  //     Attractions.aggregate()
  //         .geoNear({
  //           distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
  //           spherical: true,
  //           near: db.Geo.Point(113.914785, 30.937605),
  //           query: {
  //             docType: 'geoNear',
  //           },
  //           key: 'location', // 若只有 location 一个地理位置索引的字段，则不需填
  //           includeLocs: 'location', // 若只有 location 一个是地理位置，则不需填
  //         })
  //         .end()
  //         .then(res=>{
  //           console.log('++++++',res)
  //           this.setData({
  //             // pop_animate: "animated " + "bounceInUp",
  //             // isDetail: false,
  //             // landImg: getmarker.img,
  //             // landTitle: getmarker.name,
  //             // description: getmarker.description
  //           });
  //         })
  //   },
  //   onShow: function () {
  //     this.mapCtx = wx.createMapContext('myMap')

  //     this.GetTop()
  //     this.setData({
  //       isEmerge: "animated " + "bounceInDown"
  //     })
  //   },

  onReady(e) {
    this.setData({
      isLocation: true
    })

  },
  // 卡片动画
  // animateIn: function () {
  //   this.animate('.change-img', [{
  //       scale: [1.0],
  //       opacity: 0,
  //       translateY: 0,
  //       translateX: 0,
  //       ease: 'ease-out'
  //     },
  //     {
  //       scale: [0.6],
  //       opacity: 1,
  //       translateY: -185,
  //       translateX: -150,
  //       ease: 'ease-in',
  //       offset: 0.5
  //     },

  //   ], 500)
  //   this.animate('.views', [{
  //       scale: [1.0],
  //       opacity: 0,
  //       translateY: 0,
  //       translateX: 0,
  //       ease: 'ease-out'
  //     },
  //     {
  //       scale: [0.8],
  //       opacity: 1,
  //       translateY: -265,
  //       translateX: 50,
  //       ease: 'ease-in',
  //       offset: 0.9
  //     },

  //   ], 450)
  //   this.animate('.desc', [{
  //       opacity: 0,
  //       ease: 'ease-out'
  //     },
  //     {
  //       opacity: 0.5,
  //       ease: 'ease-in'
  //     },
  //     {
  //       opacity: 1
  //     },
  //   ], 800)
  // },
  //   //点击地标分类1---教学类
  //   type1(e) {
  //     wx.vibrateShort()
  //     let getAllPoints = this.getAllPoints()
  //     this.setData({
  //       AllPoints: getAllPoints,
  //       buildlData: app.globalData.map.type1,
  //       landscape: false,
  //       teach: true,
  //       life: false,
  //       isDetail: true
  //     })
  //   },
  //   //点击地标分类2---风景类
  //   type2(e) {
  //     wx.vibrateShort()
  //     let getAllPoints = this.getAllPoints()
  //     this.setData({
  //       AllPoints: getAllPoints,
  //       buildlData: app.globalData.map.type2,
  //       landscape: true,
  //       teach: false,
  //       life: false,
  //       isDetail: true
  //     })

  //   },
  //   //点击地标分类3---生活类
  //   type3(e) {
  //     wx.vibrateShort()
  //     let getAllPoints = this.getAllPoints()
  //     this.setData({
  //       AllPoints: getAllPoints,
  //       buildlData: app.globalData.map.type3,
  //       landscape: false,
  //       teach: false,
  //       life: true,
  //       isDetail: true
  //     })
  //   },
  //   //获取分类下所有地标
  //   getAllPoints() {
  //     let pointType = this.data.buildlData
  //     let mappoint = []
  //     for (let index = 0; index < pointType.length; index++) {
  //       const item = {
  //         longitude: pointType[index].longitude,
  //         latitude: pointType[index].latitude
  //       }
  //       mappoint.push(item)
  //     }
  //     return mappoint
  //   },

  //   //跳转至我的页
  //   onClick(e) {
  //     wx.vibrateShort()
  //     wx.getSetting({
  //       success: res => {
  //         if (res.authSetting['scope.userInfo']) {
  //           wx.navigateTo({
  //             url: "/pages/user/user"
  //           })
  //         } else {
  //           wx.navigateTo({
  //             url: './../login/login'
  //           })

  //         }
  //       }
  //     })


  //   },

  //   onShareAppMessage() {
  //     return {
  //       title: '欢迎使用湖工UP小程序',
  //       path: '/pages/map/map',
  //       imageUrl: 'cloud://hg-sign-123.6867-hg-sign-123-1301188928/data/主页分享.jpg'
  //     }
  //   }

   //   //点击地标
  //   markertap(event) {
  //     let that = this
  //     let mapdata = that.data.buildlData
  //     let getmarker = mapdata[event.markerId]
  //     getmarkerData = getmarker
  //     that.setData({
  //       pop_animate: "animated " + "bounceInUp",
  //       isDetail: false,
  //       landImg: getmarker.img,
  //       landTitle: getmarker.name,
  //       description: getmarker.description
  //     });
  //     that.mapCtx.moveToLocation({
  //       longitude: getmarker.longitude,
  //       latitude: getmarker.latitude,
  //     })
  //   },
  //   //顶部通知
  //   GetTop() {
  //     Memories.where({
  //         status: 2,
  //       })
  //       .get().then(res => {
  //         this.setData({
  //           TOPList: res.data,

  //         })

  //       })

  //   },
  //   //进入活动、通知详情
  //   ToTop(e) {
  //     //console.log(e);
  //     let detailId = e.target.dataset.id
  //     wx.navigateTo({
  //       url: './../img-detail/img-detail?id=' + detailId
  //     })

  //   },
  //   //是否隐藏地标介绍
  //   detail() {
  //     this.setData({
  //       pop_animate: "animated " + "bounceOutDown",
  //       isDetail: true,
  //     })
  //   },
  //   //跳转帮助
  //   Tohelp() {
  //     wx.navigateTo({
  //       url: './../help/help'
  //     })
  //   },
  //   //跳转详情
  //   ToDetail(e) {
  //     wx.navigateTo({
  //       url: './../detail/detail?id=' + JSON.stringify(getmarkerData)
  //     })
  //     this.setData({
  //       isDetail: true
  //     })

  //   },
  //   //左下回到原点
  //   moveToLocation(e) {
  //     wx.vibrateShort()
  //     var that = this
  //     wx.authorize({
  //       scope: 'scope.userLocation', //发起定位授权
  //       success: function () {
  //         console.log('有定位授权')
  //         that.getLocations();
  //         //授权成功，此处调用获取定位函数
  //       },
  //       fail() {
  //         //如果用户拒绝授权，则要告诉用户不授权就不能使用，引导用户前往设置页面。
  //         console.log('没有定位授权')
  //         wx.showModal({
  //           cancelColor: 'cancelColor',
  //           title: '没有授权无法获取位置信息',
  //           content: '是否前往设置页面手动开启',
  //           success: function (res) {
  //             if (res.confirm) {
  //               wx.openSetting({
  //                 withSubscriptions: true,
  //               })
  //             } else {
  //               wx.showToast({
  //                 icon: 'none',
  //                 title: '您取消了定位授权',
  //               })
  //             }
  //           },
  //           fail: function (e) {
  //             console.log(e)
  //           }
  //         })
  //       }
  //     })
  //     // this.mapCtx.moveToLocation({
  //     //   longitude: "113.914785",
  //     //   latitude: "30.937605",
  //     //   success: res => {
  //     //     console.log("回到原点");
  //     //     this.setData({
  //     //       scale: 15
  //     //     })
  //     //   }
  //     // })
  //   },
  //   getArround() {
  //     Attractions.where({
  //         locaType: 1,
  //       })
  //       .skip(0)
  //       .limit(10)
  //       .get().then(res => {

  //         var arr = [];
  //         for (var k = 0; k < res.data.length; k++) {
  //           // console.log(k)
  //           var item = {};
  //           item['iconPath'] = '../../images/markers/teach.png';
  //           item['longitude'] = res.data[k].location.longitude;
  //           item['latitude'] = res.data[k].location.latitude;
  //           item['width'] = '41';
  //           item['height'] = '45';
  //           arr.push(item)
  //         }
  //         console.log('-----', arr)
  //         this.setData({

  //           buildlData: arr
  //         });
  //       })
  //   },




})