const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    companyName:String,
    description:String,
    name:String,
    primaryMobile:String,
    secondaryMobile:String,
    primaryEmail:String,
    secondaryEmail:String,
    password:String,
    addressLine1:String,
    addressLine2:String,
    postOffice:String,
    district:String,
    state:String,
    pincode:String,
    CIN:String,
    GSTIN:String,
    pan:String,
});

const User=mongoose.model("User",userSchema);

module.exports=User;