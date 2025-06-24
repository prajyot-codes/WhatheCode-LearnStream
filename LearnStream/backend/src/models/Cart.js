import mongoose, { Schema } from "mongoose";

const CartSchema = new  Schema ({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"UserStudent"
    },
    courses:[
        {
            type:Schema.Types.ObjectId,
            ref:"Courses"
        }
    ]//will have to use .populate
})

export const Cart = mongoose.model('Cart',CartSchema);