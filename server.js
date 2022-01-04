const Http = require('http')
const Express = require('express')
const App = Express()
const Server = Http.createServer(App)
const Dotenv = require('dotenv')
const Morgan = require('morgan')
const PORT = process.env.PORT || 8080

App.use(Morgan('dev'))
App.use(Express.urlencoded({ extended: true }))
App.use(Express.json())

Server.listen(PORT, () => { console.log(`Server is running in PORT : ${ PORT }`)} )
const Routes = require('./Routes/Routes')
App.use(Routes)