import mongoose,{Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userstudentSchema=new Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },  
    password:{
        type:String,
        required:true
    },
    avatar: {
        type: String, // cloudinary url
        required: false,
    },
    coverImage: {
        type: String, // cloudinary url
        required:false,
    },
    Courses:[
        {
            type:Schema.Types.ObjectId,
            ref:"Courses"
        }
    ],
    refreshToken:{
        type:String
    }
},
{
    timestamps:true
}
)

userstudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})


userstudentSchema.methods.isPasswordCorrect = async function 
(password) {
    return await bcrypt.compare(password,this.password)
}
userstudentSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            name:this.name,
            
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userstudentSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const UserStudent = mongoose.model('UserStudent',userstudentSchema)