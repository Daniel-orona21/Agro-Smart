import Invernadero from '../models/invernadero.model.js';
// let existProd = true
const fechaActual = new Date();

export const createInvernadero = async (req, res,) => {
    const {
        name,
        pez,
        cultivo,
        capacidad,
        usuario,
        fechaAlta
    } = req.body;
    try {
        const newInvernadero = new Invernadero({
            name,
            pez,
            cultivo,
            capacidad,
            usuario,
            status: true,
            fechaAlta: fechaActual

        });
        const saveInvernadero = await newInvernadero.save()
        const l = await Invernadero.find();
        res.send(l);

    } catch (error) {
        console.log(error)
    }

    // res.send("Invernadero registrado");
}

export const updateInvernadero = async (req, res) => {
    const { name } = req.body;
    const {
        pez,
        cultivo,
        capacidad,
        usuario
    } = req.body; // Obtén los datos actualizados del cuerpo de la solicitud
    try {
        const updatedInvernadero = await Invernadero.findOneAndUpdate(
            { name: name },
            {
                pez,
                cultivo,
                capacidad,
                usuario
            },
            { new: true }
        );
        if (!updatedInvernadero) {
            return res.status(404).send('Invernadero no encontrado');
        }
        const Invernaderoes = await Invernadero.find();
        res.send(Invernaderoes);
    } catch (error) {
        console.log(error);
    }
};

export const readInvernadero = async (req, res) => {
    const Invernaderoes = await Invernadero.find();
    return res.send(Invernaderoes);
}


export const deleteInvernadero = async (req, res) => {
    const { name } = req.body;

    try {

        const updatedInvernadero = await Invernadero.findOneAndUpdate(
            { nombre: nombre },
            {
                status: false,
                fechaBaja: fechaActual
            },
            { new: true }
        );

        if (!updatedInvernadero) {
            return res.status(404).send('Invernadero no encontrado');
        }

        const Invernaderoes = await Invernadero.find();
        res.send(Invernaderoes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
};

