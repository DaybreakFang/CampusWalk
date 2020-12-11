// components/blog/blog.js
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    list:{
      type:Array,
      observer: function(a){
     if(a.length){
        this.setData({
          skeletonShow:false
        })
     }else{
       return
     }
      }
    
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    skeletonShow:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail(e){
      let that = this
      const index = e.currentTarget.dataset.id
      this.triggerEvent('detail', {
        singleData: that.data.list[index]
      })
    }
  }
})
