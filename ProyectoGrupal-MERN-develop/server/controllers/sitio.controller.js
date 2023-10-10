const Sitio = require("../models/sitio.model");

module.exports.ver_todos = (req, res) => {
    Sitio.find()
        .then(sitios => res.json(sitios))
        .catch(err => res.json({ message: "Hubo un error" + err }));
}

module.exports.ver_sitio = (req, res) => {
    Sitio.findOne({ _id: req.params.id })
        .then(sitio => res.json(sitio))
        .catch(err => res.json({ message: "Hubo un error" + err }));
}

module.exports.crear_sitio = (req, res) => {
    Sitio.findOne({ url: req.body.url })
        .then(sitio => {
            if (sitio != null) {
                let err = {
                    "errors":
                    {
                        "url":
                            { "message": "url ya existe" }
                    }
                };
                res.status(400).json(err);
            } else {
                Sitio.create(req.body)
                    .then(sitio => res.json(sitio))
                    .catch(err => res.status(400).json(err));
            }
        })
}
module.exports.editar_sitio = (req, res) => {
    Sitio.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(sitio => res.json(sitio))
        .catch(err => res.json({ message: "Hubo un error" + err }));
}

module.exports.borrar_sitio = (req, res) => {
    Sitio.deleteOne({ _id: req.params.id })
        .then(sitio => res.json(result))
        .catch(err => res.json({ message: "Hubo un error" + err }));
}