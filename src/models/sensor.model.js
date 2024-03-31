import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    usuario:{
        type:String,
        required:true,

    },
    invernadero:{
        type:String,
        required:true,

    },
    pez:{
        type:String,
        required:true
    },
    temperaturaEstanque:{
        type:Number,

    },
    nivel:{
        type:Number,

    },
    ph:{
        type:Number,

    },
    temperaturaAmbiente:{
        type:Number,

    },
    humedadAmbiente:{
        type:Number,

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