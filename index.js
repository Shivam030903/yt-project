import express from "express"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"
import bodyParser from "body-parser"


import { connectToDb } from "./config/db.config.js"
import userRoutes from "./routes/user.routes.js"

dotenv.config()

const app = express()
// app.use(express.json())
connectToDb()

app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/temp/"
}))

app.use("/api/v1/user",userRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`app runing on port ${process.env.PORT}`);
    
})