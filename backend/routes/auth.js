const router= require("express").Router();

router.get("/",(req,resp)=>{
    resp.send("login")
  })
  
module.exports= router