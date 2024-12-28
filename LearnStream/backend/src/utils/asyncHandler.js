const asyncHandler  = (requestHandler)=>{
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}

// ok so basically here we are getting back a promise from the async function and we 
// are resolveing or rejecting it on the basis of the response only doubt in the resolve part

// Key benefits:

// Eliminates the need for manual try-catch blocks in every route
// Automatically forwards errors to Express error middleware
// Simplifies async route handler code
// Helps prevent unhandled promise rejections


// const asyncHandler = (fn) => async(req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }