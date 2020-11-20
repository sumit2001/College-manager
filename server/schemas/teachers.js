const {Schema}=require('mongoose')

const mongoose=require('mongoose')
const TeacherSchema =new Schema({
    name:String,
    id:String,
    cs:[{
        sclass:Number,
        section:String
    }]
})

const Teacher=mongoose.model('Teacher',TeacherSchema)

module.exports=Teacher