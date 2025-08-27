
import mongoose from "mongoose";
import doctorModel from "./doctorModel.js";
import userModel from "./userModel.js";

const appointmentschema= new mongoose.Schema({
    userId :{type:String,required:true},
    docId :{type:String,required:true},
    slotDate :{type:String,required:true},
    slottime :{type:String,required:true},
    userdata :{type:Object,required:true},
    docdata :{type:Object,required:true},
    amount:{type:Number,required:true},
    date:{type:Number,required:true},
    cancelled:{type:Boolean,default:false},
     payement:{type:Boolean,default:false},
     iscompleted:{type:Boolean,default:false},
    
})

const appointmentModel= mongoose.models.appointment ||  mongoose.model('appointment',appointmentschema)

export default appointmentModel