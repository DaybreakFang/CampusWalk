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
      setTimeout(() => {
        this.setData({
          skeletonShow:false
        })
      }, 800);
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

  }
})
