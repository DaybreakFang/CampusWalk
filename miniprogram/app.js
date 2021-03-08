//app.js
App({
  globalData: {
    // 创建 audio 背景声音 播放api
    global_bac_audio_manager: {
      manage: wx.getBackgroundAudioManager(),
      is_play: false
  },
  locationList:{},
  likeCollection:{
    like_list:[],
    star_list:[]
  }
  },
  onLaunch: function () {
    wx.cloud.init({
      env: '这里填写你的云开发环境',
      traceUser: true
    })
  }
})
