const express = require("express")
const router = express();
const axios = require("axios");
//routes
router.use("/product", require("./ProductRoutes"))
router.use("/user", require("./UserRoutes"))

//test router
router.get("/health", (req, res) => {
    try {
        res.status(200).send({status:"up"});

    } catch (error) {
        res.status(500).json({errors:[error]})
    }
})
// Rota para gerar uma piada (GET)
router.get('/joke', async (req, res) => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      res.status(200).json({ joke: response.data.value });
    } catch (error) {
        res.status(500).json({errors:[error]})
    }
  });
module.exports = router