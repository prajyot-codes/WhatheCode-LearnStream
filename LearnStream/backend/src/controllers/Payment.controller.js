import {Razorpay} from "razorpay"
import { asyncHandler } from "../utils/asyncHandler"
const instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const recieveOrder = asyncHandler(
    async (req,res)=>{
        const user_id  = req.student._id
        const {course_id, amount,currency} = req.body()

        const options = {
            amount:amount,
            currency:currency,
        } 

        instance.orders.create()
    }
) 


export {
    recieveOrder
}