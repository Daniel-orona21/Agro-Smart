import temperaturachart from "../models/temperaturas.model.js"
import humedadchart from "../models/humedadchart.model.js";
import nivelchart from "../models/nivelchart.model.js";
import phchart from "../models/phchart.model.js";

const fechaActual = new Date();

export const createphdata=async(req,res)=>{
    const {
        usuario,
        
        }=req.body
        try{
        const newphchart= new phchart({
            usuario
        });
        const saveph = await newphchart.save()
res.send("funcione")
    } catch (error){
        console.log(error)
    }
}
export const createniveldata=async(req,res)=>{
    const {
        usuario,
        
        }=req.body
        try{
        const newnivelchart= new nivelchart({
            usuario
        });
        const savenivel = await newnivelchart.save()
res.send("funcione")
    } catch (error){
        console.log(error)
    }
}

export const createhumedaddata=async(req,res)=>{
    const {
        usuario
        }=req.body
        try{
        const newhumedadchart= new humedadchart({
            usuario
        });
        const savehumedad = await newhumedadchart.save()
        res.send("funcione")
    } catch (error){
        console.log(error)
    }
}

export const createtemperaturadata=async(req,res)=>{
    const {
        usuario
        }=req.body
        try{
        const newtemperaturachart= new temperaturachart({
            usuario
        });
        const savetemperatura = await newtemperaturachart.save()
        res.send("funcione")
    } catch (error){
        console.log(error)
    }
}

export const newph = async (req, res) => {
    const { usuario, dato } = req.body;
    try {
        const datoadded = await phchart.findOneAndUpdate(
            { usuario: usuario  },
            {
                $push: {
                    datos: { $each: [dato], $position: 0 },
                    fechaInsercion: { $each: [fechaActual], $position: 0 }
                }
            },
            { new: true }
        );

        if (!datoadded) {
            return res.status(404).send('No se encontró el documento');
        }
        res.send(datoadded);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
};

export const newhumedad = async (req, res) => {
    const { usuario, dato } = req.body;
    try {
        const datoadded = await humedadchart.findOneAndUpdate(
            { usuario: usuario  },
            {
                $push: {
                    datos: { $each: [dato], $position: 0 },
                    fechaInsercion: { $each: [fechaActual], $position: 0 }
                }
            },
            { new: true }
        );

        if (!datoadded) {
            return res.status(404).send('No se encontró el documento');
        }
        res.send(datoadded);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
};

export const newnivel = async (req, res) => {
    const { usuario, dato } = req.body;
    try {
        const datoadded = await nivelchart.findOneAndUpdate(
            { usuario: usuario  },
            {
                $push: {
                    datos: { $each: [dato], $position: 0 },
                    fechaInsercion: { $each: [fechaActual], $position: 0 }
                }
            },
            { new: true }
        );

        if (!datoadded) {
            return res.status(404).send('No se encontró el documento');
        }
        res.send(datoadded);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
};


export const newtemperatura = async (req, res) => {
    const { usuario, datosAgua, datosAmbiente } = req.body;
    try {
        const datoadded = await temperaturachart.findOneAndUpdate(
            { usuario: usuario  },
            {
                $push: {
                    datosAgua: { $each: [datosAgua], $position: 0 },
                    datosAmbiente: { $each: [datosAmbiente], $position: 0 },
                    fechaInsercion: { $each: [fechaActual], $position: 0 }
                }
            },
            { new: true }
        );

        if (!datoadded) {
            return res.status(404).send('No se encontró el documento');
        }
        res.send(datoadded);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
};


    export const readph = async (req,res) =>{
        const {usuario} = req.params;
        try{
            const traerph = await phchart.findOne({usuario: usuario})
            if (!traerph){return res.status(404).send('Usuario no encontrado')}
            return res.send({traerph})
        }catch (error){
            console.error(error)
        }
    }

    export const readnivel = async (req,res) =>{
        const {usuario} = req.params;
        try{
            const traernivel = await nivelchart.findOne({usuario: usuario})
            if (!traernivel){return res.status(404).send('Usuario no encontrado')}
            return res.send({traernivel})
        }catch (error){
            console.error(error)
        }
    }

    export const readhumedad= async (req,res) =>{
        const {usuario} = req.params;
        try{
            const traerhumedad = await humedadchart.findOne({usuario: usuario})
            if (!traerhumedad){return res.status(404).send('Usuario no encontrado')}
            return res.send({traerhumedad})
        }catch (error){
            console.error(error)
        }
    }

    export const readtemperatura = async (req,res) =>{
        const {usuario} = req.params;
        try{
            const traertemperatura = await temperaturachart.findOne({usuario: usuario})
            if (!traertemperatura){return res.status(404).send('Usuario no encontrado')}
            return res.send({traertemperatura})
        }catch (error){
            console.error(error)
        }
    }

    export const phfechas = async (req, res) => {
        try {
            const { usuario, fechaInicio, fechaFinal } = req.params;

            // Convertir las fechas de cadena a objetos Date
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinalObj = new Date(fechaFinal);
            console.log( fechaInicioObj,fechaFinalObj)
            //     fechaInicioObj.setUTCHours(0, 0, 0, 0); // Establece la hora a las 00:00:00
            // fechaFinalObj.setUTCHours(23, 59, 59, 999); // Establece la hora a las 23:59:59.999

            // Realizar la consulta a la base de datos
            const registros = await phchart.find({fechaInsercion: {$in:[fechaInicioObj, fechaFinalObj]} });
            res.status(200).json(registros);
        } catch (error) {
            console.error("Error al buscar registros por fechas:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    export const getFirstDataFromAllCharts = async (req, res) => {
        const { usuario } = req.params;
        try {
            // Obtener datos del gráfico de pH
            const phData = await phchart.findOne({ usuario: usuario });
            const firstPhData = phData ? phData.datos[0] : null;
    
            // Obtener datos del gráfico de humedad
            const humedadData = await humedadchart.findOne({ usuario: usuario });
            const firstHumedadData = humedadData ? humedadData.datos[0] : null;
    
            // Obtener datos del gráfico de nivel
            const nivelData = await nivelchart.findOne({ usuario: usuario });
            const firstNivelData = nivelData ? nivelData.datos[0] : null;
    
            // Obtener datos del gráfico de temperatura
            const temperaturaData = await temperaturachart.findOne({ usuario: usuario });
            const firstTemperaturaDataAgua = temperaturaData ? temperaturaData.datosAgua[0] : null;
            const firstTemperaturaDataAmbiente = temperaturaData ? temperaturaData.datosAmbiente[0] : null;
    
            // Enviar respuesta con los primeros datos de cada gráfico
            res.send({
                firstPhData,
                firstHumedadData,
                firstNivelData,
                firstTemperaturaDataAgua,
                firstTemperaturaDataAmbiente
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    };
    