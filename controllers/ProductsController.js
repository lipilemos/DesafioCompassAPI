const Product = require("../models/Product")
const User = require("../models/User")
const mongoose = require("mongoose")

//insert new product
const insertProduct = async (req, res) => {
    const { nome, descricao, preco } = req.body
    const reqUser = req.user
    //find User on mongoose(findOne)
    try {
        
    
    const user = await User.findById(reqUser.id)

    const product = await Product.findOne({nome:nome}).sort([["createdAt", -1]]).exec() 
    if(product){
        res.status(402).json({errors:["Já existe esse produto"]})
        return 
    }
    //create a product
    const newProduct = await Product.create({
        nome,
        descricao,
        preco,
        criadoPor: user._id        
    })
    //if no sucess
    if(!newProduct){
        res.status(422).json({errors:["Erro ao criar produto"]})
        return 
    }

    res.status(201).json(newProduct)
} catch (error) {
    res.status(422).json({errors:[error]})
}
}
//delete a product by ID
const deleteProduct = async (req, res) =>{
    const {id} = req.params
    const reqUser  = req.user
    
    try {
        const product = await Product.findById(new mongoose.Types.ObjectId(id))
    
    //check if product exists
    if(!product)
    {
        res.status(404).json({errors:["Produto não encontrado"]})
        return 
    }
    //check if Product is user 
    if(!product.criadoPor.equals(reqUser._id))
    {
        res.status(422).json({errors:["Ocorreu um erro, tente novamente mais tarde."]})
        return 
    }

    await Product.findByIdAndDelete(product._id)
    
    res.status(200).json({id: product._id, message: "Produto excluído com sucesso"})
    } catch (error) {
        res.status(404).json({errors:["Produto não encontrado"]})
        return
    }
    
}
//get all products
const getProducts = async (req, res) =>{
    try {        
    const product = await Product.find({}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(product)
} catch (error) {
    return res.status(404).json(error)
}
}

//get product by id
const getProductById = async (req, res) => {
    const {id} = req.params
try {
    
    const product = await Product.findById(new mongoose.Types.ObjectId(id))

    if(!product)
        return res.status(404).json({erros:["Produto não encontrado"]})

    return res.status(200).json(product)
    
} catch (error) {
    return res.status(404).json({erros:[error]})
}
}
//update a product
const updateProduct = async (req, res) => {
    const {id} = req.params
    const {nome,preco,descricao} = req.body

    const reqUser = req.user
try {
    

    const product = await Product.findById(id)

    if(!product)
    {
         res.status(404)
         .json({erros:["Produto não encontrada"]})
         return
    }    
    if(nome)
        product.nome = nome
    if(preco)
        product.preco = preco
    if(descricao) 
        product.descricao = descricao

    product.atualizadoPor = reqUser._id   

    await product.save()

     res.status(200).json({product, message: "Produto atualizado com sucesso!"})
    } catch (error) {
        res.status(404)
         .json({erros:[error]})
         return
    }
}
module.exports = {
    insertProduct, deleteProduct, getProducts, getProductById,updateProduct 
}