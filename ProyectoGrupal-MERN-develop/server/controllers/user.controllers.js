const Usuario = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");

module.exports.register = (req, res) => {
    const user = new Usuario(req.body);
    user.save()
        .then(usuario => {
            const payload = {
                _id: user._id
            }

            const myJWT = jwt.sign(payload, secret_key);

            res
                .cookie("usertoken", myJWT, {
                    httpOnly: true,
                    secure: true,  
                    sameSite: 'None'
                })
                .json(usuario)

        })
        .catch(err => {
        console.log("Error recibido en backend:", err);

        if (err.name === "ValidationError") {
            const errors = {};
            for (let field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            console.log("Errores de validación del backend:", errors); 
            return res.status(400).json({ errors });
        }

        console.log("Código de error:", err.code, "Tipo:", typeof err.code);
        if (err && err.code && Number(err.code) === 11000) {
            console.log("Error de duplicado detectado:", err.keyValue);
            return res.status(409).json({ message: "Correo ya registrado" });
        }

        console.error("Error inesperado:", err);
        res.status(500).json({ message: "Error del servidor." });
    });
}

module.exports.login = (req, res) => {
    Usuario.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.json({ error: true, message: "El correo electronico es incorrecto." });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordValid => {
                        if (passwordValid) {
                            const payload = {
                                _id: user._id
                            }

                            const myJWT = jwt.sign(payload, secret_key);
                            const response = {
                                error: false,
                                message: "Inicio de sesión correcto.",
                                userName: user.firstName + ' ' + user.lastName, // Nombre de usuario
                                type: user.type ? 1 : 0 
                            };

                            res
                                .cookie("usertoken", myJWT,{
                                    httpOnly: true,
                                    secure: true,  
                                    sameSite: 'None'
                                })
                                .json(response);

                        } else {
                            res.json({ error: true, message: "La contrasena es incorrecta." })
                        }
                    })
                    .catch(err => res.json({ error: true, message: "Inicio de sesión inválido." }))
            }
        })
        .catch(err => res.json(err));
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.status(200).json({ message: "Salimos de sesión!" });
}
