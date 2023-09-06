const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema(
    {
        nome: String,
        descricao: String,
        preco: String,        
        criadoPor: mongoose.ObjectId,
        atualizadoPor: mongoose.ObjectId,        
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model("products", productSchema);

module.exports = Product;
