const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

const jwtSecret = process.env.JWT_SECRET

const generateToken = (id) => {
    return jwt.sign({id},jwtSecret, {expiresIn:"7d"})
}

//register new user
const register = async (req, res) => {
    //get body da requisição
    const {nome, email, password} = req.body
    //find User on mongoose(findOne)
    try {
        
    const user = await User.findOne({email})

    //if User exists
    if(user){
        res.status(402).json({errors:["E-mail já cadastrado"]})
        return
    }
    
    //generate hash + salt =(349u82h5r237rh223yt32h8t726245h2340gf572g2h938ghTg)
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    //create user on mongoose(create)
    const newUser = await User.create({
        nome,
        email,
        password:passwordHash
    })

    //if error user created
    if(!newUser){
        res.status(422).json({errors:["Erro ao criar Usuário"]})
        return 
    }
    
    res.status(201).json({
        _id: newUser._id,
        nome:newUser.nome,
        token: generateToken(newUser._id)
    })
} catch (error) {
    res.status(404).json({errors:[error]})
}
}
//login user
const login = async (req, res) => {
    //get body da requisição
    const {email, password} = req.body
    //find user by email on mongoose
    try {       
    const user = await User.findOne({email})

    //if User not exists
    if(!user){
        res.status(404).json({errors:["Usuário não encontrado"]})
        return
    }

    //compare password decrypted
    if(!(await bcrypt.compare(password, user.password)))
    {
        res.status(422).json({errors:["Senha inválida"]})
        return
    }
    
    res.status(201).json({
        _id: user._id,
        nome: user.nome,
        token: generateToken(user._id),
    })
} catch (error) {
    res.status(404).json({errors:[error]})
}
}
//get current user 
const getCurrentUser = async (req, res) => {
    const user = req.user;
    res.status(200).json(user)
}
//update image 
const update = async (req, res) => {
    const {nome, password} = req.body

    const reqUser = req.user
    try {
     
    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password")

    if(nome)
    user.nome = nome

    if(password){
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        user.password = passwordHash
    }
    
    await user.save()

    res.status(200).json(user)
       
} catch (error) {
    res.status(404).json({errors:[error]})
}
}
//get user by ID
const getUserById = async (req, res) =>{
    const {id} = req.params

    try {
        const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password")
        
        //if user exists
        if(!user){
            res.status(404).json({errors:["Usuário não encontrado"]})
            return 
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({errors:["Usuário não encontrado"]})
    }        
}
module.exports = {
    register,login, getCurrentUser,update,getUserById
}