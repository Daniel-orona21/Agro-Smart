import Pez from '../models/pez.model';
// let existProd = true
const fechaActual = new Date();

export const createPez=async(req,res)=>{
    const {
        nombre,
        tipo,
        cantidad
    }=req.body
    try{
        const newPez= new Pez({
            nombre,
            tipo,
            cantidad,

        });
        const savePez = await newPez.save()
        const l= await Pez.find();
        res.send(l);
    
    } catch (error){
        console.log(error)
    }
    
}
export const Pez=(req,res)=>res.send("Pez registrado");

export const updatePez = async (req, res) => {
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
      const updatedPez = await Pez.findOneAndUpdate(
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
      if (!updatedPez) {
        return res.status(404).send('Pez no encontrado'); 
      }
      const Pezes = await Pez.find(); 
      res.send(Pezes); 
    } catch (error) {
      console.log(error);
    }
  };
  
  export const readPez = async (req, res) => {
    const Pezes = await Pez.find();
    return res.send(Pezes);
  }


  export const deletePez = async (req, res) => {
    const { nombre } = req.body;

    try {
        
        const updatedPez = await Pez.findOneAndUpdate(
            { nombre: nombre },
            {
                status: false,
                fechaBaja: fechaActual
            },
            { new: true }
        );

        if (!updatedPez) {
            return res.status(404).send('Pez no encontrado');
        }

        const Pezes = await Pez.find();
        res.send(Pezes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
};

