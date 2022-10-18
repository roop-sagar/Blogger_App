const mongoose = require('mongoose');

let Blogs = new mongoose.Schema({
    title :{
        type: String,
        required : true,
        unique : true
    },
    body : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    category :{
        type : String,
        required : true
    }
})


module.exports = mongoose.model('Blogs',Blogs);