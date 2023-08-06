const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');

const dotenv = require('dotenv')
dotenv.config()

const ReviewRoute = require('./routes/Review')
const AuthRoute = require('./routes/auth')


const db = mongoose.connection
mongoose.connect('mongodb://localhost:27017/idraulica',{useNewUrlParser:true,useUnifiedTopology:true})

db.on('error',(err) => {
    console.log(err)
})

db.once('open',() => {
    console.log('connection ok')
})

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
    console.log('server running on port ' + PORT)
})

app.use('/api/review',ReviewRoute)
app.use('/api/auth',AuthRoute)