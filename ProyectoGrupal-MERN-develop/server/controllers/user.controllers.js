const Usuario = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret_key = "Esta es mi llave secreta";
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
                .cookie("usertoken", myJWT, secret_key, {
                    httpOnly: true
                })
                .json(usuario)

        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
}

module.exports.login = (req, res) => {
    Usuario.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.json({ error: true, message: "El correo electrónico es incorrecto." });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordValid => {
                        if (passwordValid) {
                            const payload = {
                                _id: user._id
                            }

                            const myJWT = jwt.sign(payload, secret_key);
                            req.session.userName = user.firstName + ' ' + user.lastName;
                            // Agregar el nombre y apellido del usuario a la respuesta
                            const response = {
                                error: false,
                                message: "Inicio de sesión correcto.",
                                userName: user.firstName + ' ' + user.lastName, // Nombre de usuario

                            };

                            res
                                .cookie("usertoken", myJWT, secret_key, {
                                    httpOnly: true
                                })
                                .json(response);

                        } else {
                            res.json({ error: true, message: "La contraseña es incorrecta." })
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
