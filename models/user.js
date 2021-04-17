const mongoose=require('mongoose')
const crypto = require('crypto')
const uuidv1=require('uuid/v1')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
    },
    salt:{
        type:String
    },
    role:{
        type:Number,
        default:0
    },
    scores:{
        type:Array,
        default:[]
    }

},{timestamps:true})

userSchema
     .virtual("password")
     .set(function(password){
         this._password=password
         this.salt=uuidv1()
         this.encry_password=this.securepassword(password)
     })
     .get(function(){
         return this._password
     },
     {timestamps:true})

userSchema.methods={
    authenticate:function(plainpassword){
        return this.encry_password===this.securepassword(plainpassword)

    },


    securepassword:function(plainpassword){
        if(!plainpassword) return ""
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (error) {
            return ""
        }
    }
}


module.exports=mongoose.model('User',userSchema)