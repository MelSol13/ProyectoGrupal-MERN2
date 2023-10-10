const Pedido = require("../models/pedido.model");

module.exports.ver_todos = (req, res) => {
    Pedido.find()
    .then(pedidos => res.json(pedidos))
    .catch(err => res.json({message:"Hubo un error"+err}));
}

module.exports.ver_pedido = (req, res) =>{
    Pedido.findOne({_id: req.params.id})
    .then(pedido => res.json(pedido))
    .catch(err => res.json({message:"Hubo un error"+err}));
}

module.exports.crear_pedido = (req, res) => {
    Pedido.create(req.body)
    .then(pedido => res.json(pedido))
    .catch(err => res.json({message:"Hubo un error"+err}));
}

module.exports.editar_pedido = (req, res) => {
    Pedido.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(pedido => res.json(pedido))
        .catch(err => res.json({message:"Hubo un error"+err}));
}

module.exports.borrar_pedido = (req, res) => {
    Pedido.deleteOne({_id: req.params.id})
    .then(pedido => res.json(result))
    .catch(err => res.json({message:"Hubo un error"+err}));
}