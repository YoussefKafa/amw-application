const errorHandler = (err,req,res,next) => {
    const status = res.statusCode === 200 ? 500 : res.statusCode
    res.status(status).json({
        message: err.message,
        stack:process.env.Node_ENV === 'development' ? err.stack : null
    })
}


export {errorHandler}