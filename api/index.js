

const { urlencoded } = require("express");
const express =require("express");
const urlRouter = require("./routes/url.routes");
const cors =require("cors");

const app=express();
app.use(cors());
app.use(express.json());

app.use(urlencoded({extended:true}));

app.use('/',urlRouter)


app.listen(8080,()=>{
    console.log("port 8080 is open")
})