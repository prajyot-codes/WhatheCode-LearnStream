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

userstudentSchema.pre("save", async function (req,res,next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next();
})


userSchema.methods.isPasswordCorrect = async function 
(password) {
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function (){
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

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
// // static signup method
// userstudentSchema.statics.signup = async function(name,email,password){
//     if (!name || !email || !password){
//         throw Error(`nothing has been entered`)
//     }
//     if(!validator.isEmail(email)){
//         throw Error('please enter a valid email')
//     }
//     if (!validator.isStrongPassword(password)){
//         throw Error('password not strong enough enter password must contain an uppercase lowercase and a symbol');
//     }
//     const exits = await this.findOne({ email })
//     if (exits){ 
//         throw Error('email already in use');
//     }
//     // using await is really essential and it may lead to app crashes if not used properly
//     const salt =await bcrypt.genSalt(10);
//     const hash =await bcrypt.hash(password,salt);
    
//     const user =await this.create({name,email, password:hash})
//     return user;
// }

// static login method
// userstudentSchema.statics.login= async function (email,password) {
//     if (!email || !password){
//         throw Error(`nothing has been entered`)
//     }
//     const user = await  this.findOne({email});
    
//     if (!user){
//         throw Error("this username doesnt exits")
//     }
//     const match =await  bcrypt.compare(password,user.password);
//     if (!match){
//         throw Error("wrong passwd enterd");
//     }
//     return user;
// }
export const UserStudent = mongoose.model('UserStudent',userstudentSchema)