const mongoose=require('mongoose');

const Trackerschema= new mongoose.Schema({
 username:String,
 employeeid:String,
 useremail:String,
 logintime:String,
 logouttime:String

})

module.exports=mongoose.model('tracks',Trackerschema);