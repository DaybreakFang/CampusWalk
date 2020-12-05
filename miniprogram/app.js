//app.js
App({
  globalData: {
    // 创建 audio 背景声音 播放api
    global_bac_audio_manager: {
      manage: wx.getBackgroundAudioManager(),
      is_play: false
  }
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
   
        traceUser: true,
      })
    }
  }
})
