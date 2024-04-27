import User2 from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'; //Esta es la funcion para crear el token 

export const addUser = async(req, res)=>{
    const {
        password, 
        usuario,
        email
    }=req.body;
    try{

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User2({
        password: passwordHash, 
        usuario,
        email
        });
        const saveUser = await newUser.save()
        
        const token = await createAccessToken({id: saveUser._id, username: saveUser.username})
        res.cookie('token', token)
        
        res.json(token)

        

    } catch (error){
        res.status(501).json({ message: error.message });

    }
};

export const login = async(req, res) => {
    const { password, email } = req.body;
    try {
        // Buscar el usuario en la base de datos por su correo electrónico
        const userFound = await User2.findOne({ email });
        
        // Verificar si el usuario existe
        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        // Verificar si la contraseña proporcionada coincide con la contraseña almacenada
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generar el token de acceso y establecerlo en una cookie
        const token = await createAccessToken({
            id: userFound._id,
            email: userFound.email,
            usuario: userFound.usuario
        });
        res.cookie('token', token, { maxAge: 900000 });
        
        // Devolver el token y el nombre de usuario en la respuesta JSON
        res.json({ token, username: userFound.username });
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
};

export const logout = (req,res)=>{
    res.cookie('token', "", {expires: new Date(0),});
    return res.sendStatus(201)
}

export const profile = async (req,res)=>{
  
    const userFound = await User2.findById(req.user.id)

    if (!userFound) return res.status(400).json({message: "User not found"});
    // console.log(userFound)
    return res.json({
        id: userFound._id,
        usuario: userFound.usuario,
        email:userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })

    res.send('profile')
}


//los errores se cambiaron a 501 y 201 para diferenciarlos 