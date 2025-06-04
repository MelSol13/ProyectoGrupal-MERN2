require("dotenv").config(); 
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;
const session = require('express-session');


app.use(cookieParser());

app.use(
    session({
        secret: "tu secreto", 
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, 
    })
);
app.use(express.json(), express.urlencoded({extended:true}));

//Para usar cookies
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:3000",
        //Credenciales
        credentials:true
    })
)

require("./server/config/mongoose.config");

const misRutas = require("./server/routes/sitio.routes");
misRutas(app);


app.listen(PORT, () => console.log(`Servidor Listo en http://localhost:${PORT}`));

app.get("/", (req, res) => {
    res.send("Servidor backend funcionando correctamente.");
});