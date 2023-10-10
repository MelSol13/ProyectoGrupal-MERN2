const mongoose = require("mongoose");

const EsquemaSitio = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Nombre Obligatorio"],
        minLength: [3, "Nombre debe tener al menos 3 caracteres"]
    },
    categoría: {
        type: String,
    },
    url:{
        type: String,
        required: [true, "Url Obligatorio"],
    },
    logo:{
        type: String,
        required: [true, "Logo Obligatorio"],
    },
    eslogan:{
        type: String,
        required: [true, "Eslogan Obligatorio"],
    },
    descripcion:{
        type: String,
        required: [true, "Descripcion Obligatorio"],
    },
    servicio1:{
        type:String,
    }, 
    servicio2:{
        type:String,
    },  
    servicio3: {
        type:String,
    }, 
    contacto:{
        type:String,
    },
    imagen1:{
        type:String,
    }, 
    imagen2:{
        type:String,
    },  
    imagen3:{
        type:String,
    }, 
    fuenteSeleccionada:{
        type:String,
    },
    colorBarra:{
        type: String
    },
    colorFondo:{
        type: String
    },
    colorInformacion:{
        type:String
    }
}, {timestamps: true, versionKey: false});

const Sitio = mongoose.model("sitios", EsquemaSitio);

module.exports = Sitio;