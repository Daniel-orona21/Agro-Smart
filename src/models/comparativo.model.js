import mongoose from "mongoose";

const truchaSchema = new mongoose.Schema({
    temperaturaEstanqueMax: 18.0,

    temperaturaEstanqueMin: 4.0,
    
    phEstanqueMax: 8.0,

    phEstanqueMin: 6.5,
})

const tilapiaSchema = new mongoose.Schema({
    temperaturaEstanqueMax: 20.0,

    temperaturaEstanqueMin: 25.0,
    
    phEstanqueMax: 9.0,

    phEstanqueMin: 6.5,

})

const lechugaSchema = new mongoose.Schema({
    temperaturaAmbienteMax: 10.0,

    temperaturaAmbienteMin: 24.0,
    
})


const chileSchema = new mongoose.Schema({
    temperaturaAmbienteMax: 18.0,

    temperaturaAmbienteMin: 32.0,
    
})


const Trucha = mongoose.model('trucha', truchaSchema)
const Tilapia =mongoose.model('tilapia', tilapiaSchema)
const Lechuga =mongoose.model('lechuga', lechugaSchema)
const Chile =mongoose.model('chile', chileSchema)

export default { Trucha, Tilapia, Lechuga, Chile}