//import models

const Post=require("../models/postModel");
const Like=require("../models.likeModel");


// like a post

exports.likePost=async(req,res) =>{
   try{
          const{post,user}=req.body;
          const like=new Like({
           post,user,
          });
          const savedLike=await like.save();


          //update post collection
          const updatedPost= await Post.findByIdAndUpdate(post ,{$push :{likes : savedLike._id}}, {new:true})
          .populate("likes").exec();

          res.json({
            post:updatedPost,
          })
   }
   catch(error){
      return res.status(400).json({
         error: "Error while Liking post",
       });
   }
}



//unlike a post
exports.unlikePost=async(req,res) =>{
   try{
         const {post,like}=req.body;

         // find and delete from Like collection
         const  deletedLike= await Like.findOneAndDelete({post:post , _id:like});

         //update the Post Collection
         const updatedPost= await Post.findByIdAndUpdate(post,{$pull :{likes: deletedLike._id}},{new : true});

         res.json({
            post:updatedPost,
         })
   }

   catch(error){
      return res.status(400).json({
         error: "Error while Unliking a  post",
       });
   }
}








exports.dummyLink=(req,res)=>{
   res.send("This is your dummy Page");
};