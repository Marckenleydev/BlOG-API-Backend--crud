const express = require("express");
const app = express();
const cors=require("cors");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const multer = require("multer")
const path = require("path")

dotenv.config();
app.use(cors())
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories",categoryRoute)

const storage = multer.diskStorage({
    destination:(req, file,cb)=>{
        cb(null, "images");
    },
    filename:(req,file, cb)=>{
        cb(null, req.body.name)
    }
})



const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.get('/', (req,res)=>{
    res.send("hello to mern-ecommerce API")
})

mongoose.connect(process.env.DATABASE_URL,{
    

}, ()=>{
    console.log("the connection to mongoDB  is successful")
})
app.listen(process.env.PORT || 8000, ()=>{
    console.log("Backend server is running");
})
