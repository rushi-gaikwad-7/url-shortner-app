
const {Router} = require("express");
const {randomBytes}=require("node:crypto")
const Linkbase = require("../database/db");


const urlRouter=Router();

urlRouter.get('/',(req,res)=>{
    res.send('welcome')
})

urlRouter.post('/shortLink',(req,res)=>{
    const {link,CustomLink}=req.body;
    if(CustomLink){
     
        Linkbase.set(CustomLink,link,"EX",600);
         
        res.status(201).send({massage:"UrlShorted",newUrl:`http://localhost:8080/${CustomLink}`});
    }
    else{

        let custom= randomBytes(5).toString('hex');
        
        Linkbase.set(custom,link);
         
        res.status(201).send({massage:"UrlShorted",newUrl:`http://localhost:8080/${custom}`});
    }

})

  urlRouter.get('/:url',async(req,res)=>{

    const {url}=req.params;
   
    Linkbase.get(url, (err, result) => {
        if (err) {
        res.status(403).send({massage:"error occurred"})
        } else {
           if(result){
            res.status(301).redirect(result)
           }
           else{
            res.status(404).send('<h1>Site not fount !</h1>')
           }
        }
      });


})


module.exports=urlRouter;