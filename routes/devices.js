let express = require("express"),
    middleware = require("../middleware"),
    {isLoggedIn} = middleware,
    router = express.Router(),
    shortid = require("shortid");

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

// Database models
let Devices = require("../models/devices");

// Displaying all the connected devices
router.get("/devices", isLoggedIn, (req, res) => {
   Devices.find({"user.id" : req.user.id}, (err, allDevices) => {
      if(err){
         console.log(err);
      }else{
         console.log(allDevices);
         res.render("../views/devices/devices", {devices : allDevices});
      }
   });
});

// Displaying the form to add a new device
router.get("/device/new", isLoggedIn, (req, res) => {
   res.render("../views/devices/newDevice");
});
// Show edit page
router.get("/device/:id/edit", (req, res)=>{
   Devices.findById(req.params.id, (err, foundDevice)=>{
      if(err){
         console.log("Someting went wrong");
      }else{
         res.render("../views/devices/edit", {device : foundDevice});
      }
   })
});
// Saving the new device data to the database
router.post("/device", isLoggedIn, (req, res) => {
   let deviceName = req.body.deviceName;
   let connectionKey = shortid.generate();
   let user = {
      id: req.user._id,
   };
   let newDevice = {connectionKey : connectionKey, name : deviceName, user};
   Devices.create(newDevice, (err, newlyCreated) => {
      if(err){
         console.log(err);
      }else{
         console.log(newlyCreated);
         res.redirect("/devices")
      }
   });
});

// updating the status // don't touch, it works
router.put("/device/:id/edit/status", isLoggedIn, (req, res) => {
   let deviceId = req.params.id;
   Devices.findById(deviceId, (err, device) =>{
      let newDeviceStatus = {status: !device.status};
      if(err){
         console.log("Someting went wrong!");
      }else{
         Devices.findByIdAndUpdate(deviceId, {$set: newDeviceStatus}, (err, updatedDevice) => {
            if(err){
               console.log("Someting went wrong");
            }else{
               res.redirect("/devices");
            }
         });
      }
   });
});

router.put("/device/:id", (req, res)=>{
   let newName = {name: req.body.deviceName};
   console.log(req.body);
   Devices.findByIdAndUpdate(req.params.id, {$set: newName}, (err, updatedDevice)=>{
      if(err){
         console.log("Something went wrong");
      }else{
         res.redirect("/devices");
      }
   });
});

router.delete("/device/:id", (req, res)=>{
   Devices.findByIdAndRemove(req.params.id, (err)=>{
      if(err){
         console.log("Someting went wrong");
      }else{
         res.redirect("/devices");
      }
   });
});

module.exports = router;
