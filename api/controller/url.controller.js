
const urlDatabase = require("../database/db");

const {randomBytes}=require("node:crypto");

const urlController = {
  short: async (req, res) => {
    try {
     
        const {link,CustomLink}=req.body;
    
        if(CustomLink){
         
            urlDatabase.set(CustomLink,link,"EX",600);
             
            res.status(201).send({massage:"UrlShorted",newUrl:`https://bitn.herokuapp.com/${CustomLink}`});
        }
        else{
    
            let custom= randomBytes(5).toString('hex');
            
            urlDatabase.set(custom,link);
             
            res.status(201).send({massage:"UrlShorted",newUrl:`https://bitn.herokuapp.com/${custom}`});
        }
    } catch (error) {
      return res.status(500).json({ msg: error.message,});
    }
  },

  redirect: async (req, res) => {
    try {
        const {url}=req.params;
   
        urlDatabase.get(url, (err, result) => {
            if (err) {
            res.status(403).send({massage:"error occurred"})
            } else {
               if(result){
                res.status(301).redirect(result)
               }
               else{
                res.status(404).send('<h1>Site not fount.. !</h1>')
               }
            }
          });
    } catch (error) {
        res.status(404).send('<h1>Site not fount !</h1>')
    }
  },
};

module.exports = urlController;
