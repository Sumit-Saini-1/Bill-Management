const mongoose=require("mongoose");

const billSchema=new mongoose.Schema({
    invoiceNo:String,
    billdetails:Array,
    billItems:Array,
    grandTotal:Number,
    date: String,
    // invoiceNo: String,
    // placeOfSupply: String,
    // // reverseCharge: String,
    // // grRrNo: String,
    // customerCompany: String,
    // customerAddress: String,
    // customerCity:String,
    // customerDistrict:String,
    // customerState:String,
    // customerGSTIN:String,
    // transport:String,
    // vehicleNo:String,
    // station:String,
    billedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Bill=mongoose.model("Bill",billSchema);

module.exports=Bill;