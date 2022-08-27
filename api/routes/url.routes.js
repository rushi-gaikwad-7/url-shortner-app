


const {Router} = require("express");

const urlController = require("../controller/url.controller");


const urlRouter=Router();

urlRouter.get('/',(req,res)=>{
    res.send('welcome to url shortener server')
})

urlRouter.post('/shortLink',urlController.short)

  urlRouter.get('/:url',urlController.redirect)


module.exports=urlRouter;