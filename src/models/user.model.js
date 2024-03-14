import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim:true
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
        require: true
    },
    estatus:{
        type: Boolean,
        require: true
    }

})

export default mongoose.model('User', userSchema)