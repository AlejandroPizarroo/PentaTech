require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');


// se importan las rutas
const authRoute = require("./routes/auth");
const certificationRoutes = require("./routes/certification")

const app = express();
const port = process.env.PORT;

//conect to databse
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected to database"))
.catch((error) =>console.error(error))


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/ibm", certificationRoutes)


//routes 
app.get("/", (req, res) => {
    res.send("Hello from the server side!")
});

app.listen(port, () => console.log("server listening on port", port));