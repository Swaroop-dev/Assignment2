const User=require("../models/user")

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"no user found in database"
            })
        }
        req.profile=user
        next()
        
    })

}


exports.getUser=(req,res)=>{
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
  
    return res.json(req.profile)
 }

 exports.updateUser=(req,res)=>{
     User.findByIdAndUpdate(
        { _id:req.profile._id},
        {$set:req.body} ,
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if (err){
                return res.status(400).json({
                    error:"you are not authorised to update"
                })
            }
            user.salt=undefined
            user.encry_password=undefined
            res.json(user)
        }    
     )
 }

 
 