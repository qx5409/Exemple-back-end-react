require('dotenv').config()
const express = require('express')
const { addEmail } = require('./middlewares/addEmail')
const { errorMiddleWare } = require('./middlewares/error')
const { logger } = require('./middlewares/morgan')
const infosRouter = require('./routes/info')
const personsRouter = require('./routes/persons')

// MIDDLEWARE
const app = express()

app.use(express.json())

app.use(addEmail)

app.use(logger)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

// ROUTER
app.get('/', (request, response) => {
    throw new Error()
    response.send('<h1>Hello World!</h1>')
})

app.use('/info', infosRouter)

app.use('/api/persons', personsRouter)

app.use(errorMiddleWare)
