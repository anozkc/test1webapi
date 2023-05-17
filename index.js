
const express = require("express")
const mongoose = require('mongoose')
const { verifyUser} = require('./middlewares/auth')
mongoose.connect('mongodb://127.0.0.1:27017/todo')
.then(()=> console.log('connected to mongodb server '))
.catch((err)=> console.log(err))

const app=express()
const todo_routes = require('./routes/todo-routes')
const users_routes =require('./routes/user-routes')
app.use(express.json())
app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.send('Hello world')
})
app.use('/users', users_routes)
app.use('/todo',verifyUser,todo_routes)


app.use((err,req,res,next)=>{
    console.error(err)

    if(err.name==='CastError'){
        res.status(400)
    }
    else if(err.name =='ValidationError'){
        res.status(400)
    }
    res.json({error: err.message})
})

app.use((req,res)=>{
    res.status(404).json({error: 'path not found'})
})

app.listen(3000, () =>{
    console.log('server is running on port 3000')

})