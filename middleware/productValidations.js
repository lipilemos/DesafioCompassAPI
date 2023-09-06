const {body} = require("express-validator");

const productCreateValidation = () => {
    return [
        body("nome")
        .isString()
        .withMessage("O campo nome é obrigatório")
        .isLength({min:3})
        .withMessage("O nome deve ter no mínimo 3 caracteres"),
        body("preco")
        .isString()
        .withMessage("O campo preco é obrigatório"),        
        body("descricao")
        .isString()
        .withMessage("A descricao é obrigatório")
        .isLength({min:10})
        .withMessage("A descricao deve ter no mínimo 10 caracteres.")
    ]
}

module.exports = {
    productCreateValidation
}