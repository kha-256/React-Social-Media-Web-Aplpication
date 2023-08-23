const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute= require("./routes/user")
const authRoute= require("./routes/auth")

dotenv.config()

const corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  exposedHeaders: "Custom-Header1, Custom-Header2",
}
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');

  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user",userRoute);

app.use("/api/auth",authRoute);

app.listen(8800,()=>{
    console.log('Backend Server is running!')
})