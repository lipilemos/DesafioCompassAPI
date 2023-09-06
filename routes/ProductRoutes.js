const express = require("express")
const router = express.Router()

//controller
const {insertProduct,updateProduct,deleteProduct,getProductById, getProducts} = require("../controllers/ProductsController")

//middlewares
const validate = require("../middleware/handleValidation")
const {productCreateValidation} = require("../middleware/productValidations")
const authGuard = require("../middleware/authGuard.js")

//getAll products
router.get("/", getProducts)

//create product
router.post("/",authGuard, productCreateValidation(), validate, insertProduct)

//update product
router.put("/:id", authGuard, validate, updateProduct) 

//get product by ID
router.get("/:id", getProductById)

//delete product
router.delete("/:id", authGuard, deleteProduct)

module.exports = router





