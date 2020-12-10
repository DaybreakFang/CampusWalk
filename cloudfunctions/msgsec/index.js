// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// const db = cloud.database()
// const blog_collection = db.collection('blog_collection')

// 云函数入口函数
exports.main = async (event) => {
  try {
    if (event.content) {
      await cloud.openapi.security.msgSecCheck({
        content: event.content
      });
    } 
    // else if(event.id){
      // blog_collection.doc(id)
      // .field({
      //   img_list:true
      // })
      // .get()
      // .then(res=>{
      //   console.log('用户图片：',res.data.img_list)
      // imgArr = res.data.img_list;
       
      // })



    // }
    // else if (event.img) {
    //   const img = event.img
      // const res = await cloud.downloadFile({
      //   fileID: img,
      // })
    //   const Buffer = res.fileContent
    //   await cloud.openapi.security.imgSecCheck({
    //     media: {
    //       contentType: 'image/*',
    //       value: Buffer
    //     }
    //   })
    // }
    return {
      code: 1,
      msg: "ok"
    }

  } catch (err) {
    return {
      code: 0,
      msg: err
    }
  }

/**
 * @Todo  遍历用户的图片数组 然后检测  
 * 问题： 调用耗时太长，遇到违规会立即 return 不再继续执行
 */
  
  // var BufferArr = [];
  // for(var i =0 ;i< imgArr.length ; i++){
  //  let file = await cloud.downloadFile({
  //     fileID: imgArr[i],
  //   })
  //   let Buffer = file.fileContent;
  //   var results = await cloud.openapi.security.imgSecCheck({
  //       media: {
  //         contentType: 'image/*',
  //         value: Buffer
  //       }
  //     })
  //     console.log('结果：', results)
  // }
  // console.log('BUffer=========',BufferArr)

}