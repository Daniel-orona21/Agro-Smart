import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    invernadero:{
        type:String,
        required:true,

    },
    phone:{
        type:Number,
        require:true
    },
    pez:{
        type:String,
        required:true
    },
    temperaturaEstanque:{
        type:Number,
        required:true
    },
    nivel:{
        type:Number,
        required:true
    },
    ph:{
        type:Number,
        required:true
    },
    temperaturaAmbiente:{
        type:Number,
        required:true
    },
    humedadAmbiente:{
        type:Number,
        required:true
    },
    fechaAlta:{
        type:Date,
        required:true
    },
    fechaBaja:{
        type:Date
    },
    status:{
       type:Boolean,
       required:true 
    }
});

export default mongoose.model('Sensor',sensorSchema);