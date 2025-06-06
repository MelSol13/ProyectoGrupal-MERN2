require("dotenv").config(); 

if (!process.env.SECRET_KEY) {
    console.error("ERROR: La variable de entorno SECRET_KEY no está definida.");
    process.exit(1);
}

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');

const PORT = process.env.PORT || 8000;

const allowedOrigins = [
    "http://localhost:3000",
    "https://melsol13.github.io"
];

app.use(cors({
    origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
        return callback(null, true);
    } else {
        return callback(new Error("No permitido por CORS"));
    }
    },
    credentials: true
}));


app.use(express.json(), express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: "none"
    }
    }));


require("./server/config/mongoose.config");
const misRutas = require("./server/routes/sitio.routes");
misRutas(app);


app.listen(PORT, () => console.log(`Servidor Listo en http://localhost:${PORT}`));

app.get("/", (req, res) => {
    res.send("Servidor backend funcionando correctamente.");
});

