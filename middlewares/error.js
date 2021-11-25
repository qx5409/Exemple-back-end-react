const errorMiddleWare = (err, req, res, next) => {
    console.log("AAAAAAHHHHHHHHHHHHHH")
    res.status(500).send("oups")
}

exports.errorMiddleWare = errorMiddleWare