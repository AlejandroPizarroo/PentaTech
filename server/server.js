require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');


// se importan las rutas
const authRoute = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Conectado a la base de datos");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })