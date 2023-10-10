const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const EsquemaUsuario = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Nombre obligatorio."]
    },
    lastName: {
        type: String,
        required: [true, "Apellido obligatorio."]
    },
    email: {
        type: String,
        required: [true, "E-mail obligatorio."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "ingrese email valido."
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "Pasword obligatorio."],
        minlength: [8, "Pasword debe tener al menos 8 caracteres."],
    }
    /*tipo:{
        type: Number,
        required: ["Es requerido"],
    }*/
}, { timestamps: true, versionKey: false })

//Se realiza cuando no queremos guardarlo en base de datos
EsquemaUsuario.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value)

//Se hace antes de validar el esquema de ususario
EsquemaUsuario.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contraseñas no coinciden');
    }
    next();
})

//antes de guardar usuario encriptamos contrasena
EsquemaUsuario.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });

});

const Usuario = mongoose.model("Usuarios", EsquemaUsuario);
module.exports = Usuario;
