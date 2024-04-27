import mongoose from "mongoose";

const phChartSchema = new mongoose.Schema({
    usuario:{
        type:String,
        required:true,
        unique:true,
    },
    invernadero:{
        type:String,
        
    },
    datos:[Number],
    fechaInsercion:[Date]
        
   
});

export default mongoose.model('phchart',phChartSchema);