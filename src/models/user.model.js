import mongoose from "mongoose";

const user2Schema = new mongoose.Schema({
    usuario: {
        type: String,
        require: true,
        
    },
    email:{
        type: String,
        require: true,
        trim:true,
        unique: true
        
    },
    password:{
        type: String,
        require: true
    },
    rol:{
        type: String,
        // require: true
    },
    estatus:{
        type: Boolean,
        // require: true
    }

})

export default mongoose.model('User2', user2Schema)