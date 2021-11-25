const addEmail = (req, res, next) => {
    const email = req.header("X-USER-EMAIL")
    if(email) req.currentUser = { email }
    next()
}

exports.addEmail = addEmail