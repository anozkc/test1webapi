const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    desc:{
        type: String,
        required : true,
        minLength:[10,'Description should be more than 10 characters']
    },
    complete:{
        type: Boolean,
        default: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},
    {timestamps:true}
)

module.exports = new mongoose.model('Todo',todoSchema)