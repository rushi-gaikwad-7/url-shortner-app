

const { urlencoded } = require("express");
const express =require("express");
const urlRouter = require("./routes/url.routes");
const cors =require("cors");

const app=express();
app.use(cors());
app.use(express.json());

app.use(urlencoded({extended:true}));

app.use('/',urlRouter)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    
   
    console.log(`Server connected at http://localhost:${PORT}`);
});