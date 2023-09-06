const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema(
    {
        nome:String,
        email:String,
        password:String
    },
    {
        timestamps:true
    }
)

const User = mongoose.model("user", userSchema);

module.exports = User;