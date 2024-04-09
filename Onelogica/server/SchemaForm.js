const mongoose=require('mongoose');

const FormSchema=new mongoose.Schema({
    
    username:String,
    employeeid:String,
    email:String,
    password:String
}
);

module.exports=mongoose.model('forms',FormSchema);