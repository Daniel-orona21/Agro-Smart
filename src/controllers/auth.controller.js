import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'; //Esta es la funcion para crear el token 

export const addUser = async(req, res)=>{
    const {
        password, 
        username,
        email
    }=req.body;
    try{

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
        password: passwordHash, 
        username,
        email
        });
        const saveUser = await newUser.save()
        
        const token = await createAccessToken({id: saveUser._id, username: saveUser.username})
        res.cookie('token', token)
        
        res.json(token)

        

    } catch (error){
        console.log(error)
    }
};

export const login = async(req, res)=>{
    const {
        password, 
        email
        }=req.body;
    try{

        const userFound = await User.findOne({email})
        if (!userFound) return res.status(400).json({message:"user not found"})

        const isMatch = await bcrypt.compare(password, userFound.password)

        if (!isMatch) return res.status(400).json({message: "Incorrect password"})


        const token = await createAccessToken({id: userFound._id, email: userFound.email})
        res.cookie('token', token)
        res.json(token)
        

        

    } catch (error){
        res.status(501).json({message: error.message})
    }
//res.send("registrando");
};

export const logout = (req,res)=>{
    res.cookie('token', "", {expires: new Date(0),});
    return res.sendStatus(201)
}

export const profile = async (req,res)=>{
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({message: "User not found"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email:userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })

    res.send('profile')
}


//los errores se cambiaron a 501 y 201 para diferenciarlos 