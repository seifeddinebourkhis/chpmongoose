// import mongoose
const mongoose = require ('mongoose')

// model or we call it the contact schema ==structure
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    age: Number,

    favoriteFoods: [Array]
})

module.exports = mongoose.model('user',userSchema)