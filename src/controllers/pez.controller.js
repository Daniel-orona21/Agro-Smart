import Pez2 from '../models/pez.model.js';
// let existProd = true
const fechaActual = new Date();

export const createPez=async(req,res)=>{
    const {
        tipo,
            cantidad,
            usuario
        }=req.body
        try{
        const newPez= new Pez2({
            tipo,
            cantidad,
            usuario,

        });
        const savePez = await newPez.save()
        const l= await Pez2.find();
        res.send(l);
        var pezBusca = l
    
    } catch (error){
        console.log(error)
    }

    // res.send(pezBusca);
}

export const updatePez = async (req, res) => {
    const { usuario } = req.body;
    const {
     cantidad,
     tipo
    } = req.body; // Obtén los datos actualizados del cuerpo de la solicitud
    try {
      const updatedPez = await Pez.findOneAndUpdate(
        { usuario: usuario }, 
        {
            cantidad,
            tipo
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

