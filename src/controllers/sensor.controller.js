import Sensor from '../models/sensor.model.js';
// let existProd = true
const fechaActual = new Date();

export const createSensor=async(req,res)=>{
    const {
        username,
        invernadero,
        phone,
        pez,
        temperaturaEstanque,
        nivel,
        ph,
        temperaturaAmbiente,
        humedadAmbiente
    }=req.body;
    try{
        const newSensor= new Sensor({
            username,
            invernadero,
            phone,
            pez,
            temperaturaEstanque,
            nivel,
            ph,
            temperaturaAmbiente,
            humedadAmbiente,
            fechaAlta:fechaActual,
            status:true
        });
        const saveSensor = await newSensor.save()
        const l= await Sensor.find();
        res.send(l);
    
    } catch (error){
        console.log(error)
    }
    
    res.send("Sensor registrado");
}

export const updateSensor = async (req, res) => {
    const { username } = req.body;
    const {
        invernadero,
        phone,
        pez,
        temperaturaEstanque,
        nivel,
        ph,
        temperaturaAmbiente,
        humedadAmbiente,
    } = req.body; // Obtén los datos actualizados del cuerpo de la solicitud
    try {
      const updatedSensor = await Sensor.findOneAndUpdate(
        { username: username }, 
        {
            invernadero,
            phone,
            pez,
            temperaturaEstanque,
            nivel,
            ph,
            temperaturaAmbiente,
            humedadAmbiente,
        },
        { new: true }
      );
      if (!updatedSensor) {
        return res.status(404).send('Sensor no encontrado'); 
      }
      const Sensores = await Sensor.find(); 
      res.send(Sensores); 
    } catch (error) {
      console.log(error);
    }
  };
  
  export const readSensor = async (req, res) => {
    const Sensores = await Sensor.find();
    return res.send(Sensores);
  }


  export const deleteSensor = async (req, res) => {
    const { nombre } = req.body;

    try {
        
        const updatedSensor = await Sensor.findOneAndUpdate(
            { nombre: nombre },
            {
                status: false,
                fechaBaja: fechaActual
            },
            { new: true }
        );

        if (!updatedSensor) {
            return res.status(404).send('Sensor no encontrado');
        }

        const Sensores = await Sensor.find();
        res.send(Sensores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
};

