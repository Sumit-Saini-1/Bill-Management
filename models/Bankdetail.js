const mongoose=require("mongoose");

const bankDetailSchema=new mongoose.Schema({
    bankName:String,
    accountNumber:String,
    IFSCCode:String,
    branch:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const BankDetail=mongoose.model("BankDetail",bankDetailSchema);

module.exports=BankDetail;