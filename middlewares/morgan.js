const morgan = require('morgan')

morgan.token('myToken', (req) => {
    return JSON.stringify(req.body)
})

const logger = morgan(':method :url :status :res[content-lenght] - :response-time :myToken')

exports.logger = logger