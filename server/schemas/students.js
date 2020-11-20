const {Schema}=require('mongoose')

const mongoose=require('mongoose')
const StudentSchema =new Schema({
    name:String,
    rollno:Number,
    sclass:Number,
    section:String
})

const Student=mongoose.model('Student',StudentSchema)

module.exports=Student