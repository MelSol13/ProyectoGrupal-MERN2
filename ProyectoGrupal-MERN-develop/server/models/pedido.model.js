const mongoose = require("mongoose");

const EsquemaPedido = new mongoose.Schema({
    producto: {
        type: String,
        required:[true,"Producto requerido"],
    },
    cantidad: {
    type: Number,
    required:[true,"Cantidad requerida"],
    },
    imagen:{
        type: String,
    },
    comentarios:{
        type: String,
    },
    fecha:{
        type:String,
        required:[true,"Fecha requerida"],
    },
    hora:{
        type: String,
        required:[true,"Hora requerida"],
    }  
}, {timestamps:true, versionKey:false});


const Pedido= mongoose.model("pedidos", EsquemaPedido);
module.exports = Pedido;