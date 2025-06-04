const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://msolano13:k1nxIJECWyvuUBiM@cluster0.xm5rz.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch(err => console.log("Error al conectarse a DB",err));