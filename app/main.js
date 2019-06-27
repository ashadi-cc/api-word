import express from 'express'
import apiRouter from './router/api'
import bodyParser from 'body-parser'

//port 
const port = process.env.NODE_PORT ? process.env.NODE_PORT : 3000

//express web server
const app = express()

//set json body parser
app.use(bodyParser.json())
//set url encoding parser
app.use(bodyParser.urlencoded({extended: true}))

//front end router
app.use('/', express.static('./app/public'))

///api router
app.use('/api', apiRouter)

//run server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})