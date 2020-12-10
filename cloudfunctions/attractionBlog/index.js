// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
const db = cloud.database()
const _ = db.command  
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await db.collection('attraction_collection').aggregate()
  .match({
    _id:event.id
  })
  .lookup({
    from: 'blog_collection',  //要连接的集合名称
    localField: 'location_name',  //相对于user集合而言，file就是本地字段
    foreignField: 'location_name',  //相对于user集合而言，files集合的_id就是外部字段
    as: 'AllList',  //指定匹配之后的数据存放在哪个字段
  })
.end()
return res.list
}