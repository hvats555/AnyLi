let express = require("express"),
    router = express.Router();

// Database models
let Devices = require("../models/devices");

router.get("/api/device/:connectionKey/status", (req, res)=>{
   let connectionKey = req.params.connectionKey;
   Devices.findOne({connectionKey : connectionKey},{_id : 0, status : 1}, (err, foundDevice) => {
      if(err){
         console.log(err);
      }else{
         if(!foundDevice){
            res.status(404).send("Cannot find device with given connection id");
         }else{
            res.status(200);
            res.send(foundDevice);
         }
      }
   });
});

module.exports = router;