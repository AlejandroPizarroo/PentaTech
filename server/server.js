require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

// Import routes
const loginRoute = require("./routes/login");
const certificationRoutes = require("./routes/certification")
const udemyPopularRoutes = require("./routes/udemyPopular")
const courseraRoutes = require("./routes/courseraCertification")
const importRoutes = require("./routes/import")

const app = express();
const port = process.env.PORT;

//Connect to database
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected to database"))
.catch((error) =>console.error(error))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware
app.use("/api/login", loginRoute);
app.use("/api/ibm", certificationRoutes)
app.use("/api/udemy", udemyPopularRoutes)
app.use("/api/coursera", courseraRoutes)
app.use("/api/import", importRoutes)

//routes 
app.get("/", (req, res) => {
    res.send("Hello from the server side!")
});

app.listen(port, () => console.log("Server listening on port", port));