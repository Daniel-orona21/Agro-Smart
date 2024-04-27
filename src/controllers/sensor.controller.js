import Sensor from '../models/sensor.model.js';
// let existProd = true
const fechaActual = new Date();

export const createSensor=async(req,res)=>{
    const {
        usuario,
        invernadero,
        pez,
        temperaturaEstanque,
        nivel,
        ph,
        temperaturaAmbiente,
        humedadAmbiente
    }=req.body;
    try{
        const newSensor= new Sensor({
            usuario,
            invernadero,
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
    

}

export const updateSensor = async (req, res) => {
    const { usuario } = req.body;
    const {
        invernadero,

        pez,
        temperaturaEstanque,
        nivel,
        ph,
        temperaturaAmbiente,
        humedadAmbiente,
    } = req.body; // Obtén los datos actualizados del cuerpo de la solicitud
    try {
      const updatedSensor = await Sensor.findOneAndUpdate(
        { usuario: usuario }, 
        {
            invernadero:invernadero,        
            pez:pez,
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
    const { usuario } = req.params; // Obtener el usuario de los parámetros de la solicitud
    try {
        // console.log(usuario+"hola"+req.body)
        // Buscar el sensor correspondiente al usuario
        const sensor = await Sensor.findOne({ usuario:usuario });

        if (!sensor) {
            return res.status(404).send('Sensor no encontrado para el usuario especificado');
        }

        // Devolver solo los campos requeridos
        const { humedadAmbiente, nivel, ph, temperaturaAmbiente, temperaturaEstanque } = sensor;

        return res.send({
            humedadAmbiente,
            nivel,
            ph,
            temperaturaAmbiente,
            temperaturaEstanque
        });
    } catch (error) {
        console.error('Error al buscar el sensor:', error);
        return res.status(500).send('Error interno del servidor');
    }
};


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

