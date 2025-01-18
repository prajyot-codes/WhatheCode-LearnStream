import mongoose,{Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const userteacherSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
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
},{
    timestamps:true
})

//here on the event 'save' the asyc function runs and  
userteacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})


userteacherSchema.methods.isPasswordCorrect = async function 
(password) {
    return await bcrypt.compare(password,this.password)
}
userteacherSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            name:this.name,
            
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userteacherSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
// static signup method
// userteacherSchema.statics.signup = async function(name,email,password){
//     if (!name || !email || !password){
//         throw Error(`A field is empty`)
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

// // static login method
// userteacherSchema.statics.login= async function (email,password) {
//     if (!email || !password ){
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
export const UserTeacher = mongoose.model('UserTeacher',userteacherSchema)