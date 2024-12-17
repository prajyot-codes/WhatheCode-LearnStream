const asyncHandler  = (requestHandler)=>{
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}

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