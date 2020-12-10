//app.js
App({
  globalData: {
    // 创建 audio 背景声音 播放api
    global_bac_audio_manager: {
      manage: wx.getBackgroundAudioManager(),
      is_play: false
  },
  locationList:{}
  },
  onLaunch: function () {
    wx.cloud.init({
      env: 'daybreak-123',
      traceUser: true
    })
  }
})
