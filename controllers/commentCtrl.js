const Comments= require('../models/commentmodel');
const Posts= require('../models/postmodel');
const commentCtrl={
  createcomment:async(req,res)=>{
      try{
        const{postId,content,tag,reply,postUserId}=req.body
        const post=await Posts.findById(postId)
        if(!post)
        return res.status(400).json({msg:'This post does not exist'})
     
        if(reply){
          const cm=await Comments.findById(reply)
          if(!cm)
          return res.status(400).json({msg:'This commenti does not exist'})
        }
        const newcomment=new Comments({
          user:req.user._id,
          content,tag,reply,postUserId,postId

      })
        await Posts.findOneAndUpdate({_id:postId},{
            $push:{comments:newcomment._id}
        },{new:true})
        await newcomment.save()
        res.json({newcomment})
      }catch(err){
        return res.status(500).json({msg:err.message})
      }
  },
  updatecomment:async(req,res)=>{
    try{
     const {content}=req.body
    await Comments.findOneAndUpdate({
      _id:req.params.id,user:req.user._id
    },{content})
    res.json({msg:'Update Success'})
    }catch(err){
      return res.status(500).json({msg:err.message})
    }
},
likecomment:async(req,res)=>{
  try{
      const comment= await Comments.find({_id:req.params.id,likes:req.user._id})
    
      if(comment.length>0)
      return res.status(400).json({msg:'You liked this comment'})
 
    await Comments.findOneAndUpdate({_id:req.params.id},{
  $push:{likes:req.user._id}
   },{new:true})
   res.json({
      msg:'Liked comment!',
      
  })
  }catch(err){
      return res.status(500).json({msg:err.message})
  }
},
unlikecomment:async(req,res)=>{
  try{
      
    await Comments.findOneAndUpdate({_id:req.params.id},{
  $pull:{likes:req.user._id}
   },{new:true})
   res.json({
      msg:'Disliked comment!',
      
  })
  }catch(err){
      return res.status(500).json({msg:err.message})
  }
},
deletecomment:async(req,res)=>{
  try{
      const comment = await Comments.findOneAndDelete({
        _id:req.params.id,
        $or:[
          {user:req.user._id},
          {postUserId:req.user._id}
        ]
      })
  
      await Posts.findOneAndUpdate({_id:comment.postId},{
        $pull:{comments:req.params.id}
      })
      res.json({msg:'Deleted Comment!'})
  
  }catch(err){
      return res.status(500).json({msg:err.message})
  }
},

}
module.exports=commentCtrl