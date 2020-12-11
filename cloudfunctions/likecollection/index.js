// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
 // likeData = {nickName,avaTarUrl,content,_id,author_id,_openid}
  // 接受到 点赞人 的 OPENID 点赞 需要操作 blog_collection message_collection
  let {nickName,avaTarUrl,content,_id,author_id,_openid} = event.cloudLikeUser;
    const res1 = await  db.collection('blog_collection').doc(_id)
      .update({
        data: {
          like_count: db.command.inc(1),
          like_list:db.command.push(_openid)
        }
      })
    const res2 = await db.collection('message_collection').add({
      data:{
        origin_name:nickName,
        origin_avatar:avaTarUrl,
        blog_content:content,
        blog_id:_id,
        receive_id:author_id,
        origin_time:db.serverDate(),
        message_type:0
      }
    })
    const ID =_openid
   await  db.collection('profile_collection')
    .where({
      _openid: ID
    })
    .update({
      data: {
        like_list:db.command.push(_id)
      }
    }).then((res)=>{
      return res
    })
}