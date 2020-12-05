const navBarHeight = wx.getSystemInfoSync().statusBarHeight + 44

Component({

  properties: {
    logo: {
      type: Boolean,
      value: false
    },
    back: {
      type: Boolean,
      value: false
    },
    left: {
      type: String,
      value: '104px'
    },
    right:{
      type: String,
      value: '104px'
    },
    home: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: 'Wechat'
    },
    titleColor: {
      type: String,
      value: '#ffffff'
    },
    background: {
      type: String,
      value: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%) '
    }
  },

  data: {
    navBarHeight
  },

  methods: {
    home() {
      this.triggerEvent('home')
      wx.reLaunch({
        url: '../map/map'
      })
    },

    back() {
      this.triggerEvent('back')
     
        wx.navigateBack()
      
    }
  }
})
