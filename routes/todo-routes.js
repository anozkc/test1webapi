const express =require('express')
const router = express.Router()
const Book = require('../models/todo')
const { verifyAdmin } = require('../middlewares/auth')
const todo = require('../models/todo')
const user = require('../models/user')
router.route('/')
.get((req,res,next)=>{
    todo.find({user: req.user.id})
            .then((todo) => res.json(todo))
            .catch(next)

})
.post((req,res,next)=>{
    // todo.create(req.body)
    const tds =todo({
        desc: req.body.desc,
        complete: req.body.complete,
        user: req.user.id

    })
    todo.create(tds)
    .then((todo)=>{
        res.status(201).json(todo)
    })
    .catch(next)})
    .put((req,res)=>{
        res.status(405).json({error:"method not allowed"})
})
.delete((req, res,next)=>{
    todo.deleteMany()
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})
router.route('/:todo_id')
    .get((req,res,next)=>{
        todo.findById(req.params.todo_id)
            .then((todo)=>{
                if(!todo) return res.status(404).json({error :'Todo not found'})
                res.json(todo)
            })
            .catch(next)
    })

    .post((req,res)=> {
        res.status(405).json({error:"method not allowed"})
    })
     .put((req,res,next)=>{
        todo.findByIdAndUpdate(req.params.todo_id,{$set:req.body},{new:true})
            .then((updated)=>res.json(updated))
            .catch(next)
    })
    .delete((req,res,next)=>{
        todo.findByIdAndDelete(req.params.todo_id)
         .then((reply)=>{
            res.status(204).end()
        })
        .catch(next)
    })
module.exports=router
