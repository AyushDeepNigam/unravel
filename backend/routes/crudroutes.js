//const passport = require('passport')
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
require("../services/passport");
const x = require("../models/data");
const y = require("../models/solution");
module.exports = app => {
  //this method displays all problems posted by the current user
  router.get("/current_user/problems", (req, res, next) => {
    console.log("heeeeelllloooooooooo", req.user.email);
    x.find({ email: req.user.email }, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      else {
        
        //console.log(data);
        res.send(data);
      }
   
    }).sort({ createdAt: -1 });
  });

  router.get("/current_user/problems/:problemId",(req,res)=>{
       
    y.find({ problemId: req.params.problemId},(err,data) => {

      if(err)  return res.json({ success: false, error: err });
      else{
        //console.log( data)
        res.send(data)
  
      }
   
    })
  })
  //this method show all the solutions posted by a user regarding different problems
  router.get("/current_user/solutions", (req, res, next) => {
    

    console.log("heeeeelllloooooooooo", req.user.email);
    y.find({ email_solution: req.user.email }, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      else {
        //console.log(data[0].problemId)

   
        res.send(data);
      }
    }).sort({ createdAt: -1 });
  });
router.get("/:problemId/solutions",(req,res)=>{
    var totalSolution=[]
    var solutiondesc=[]
     x.findById({_id:req.params.problemId},async (err,data)=>{
      if (err) return res.json({ success: false, error: err });
      else{
        for(var i=0;i<data.solution.length;i++)
        {
          totalSolution.push(data.solution[i])
        }
     
    for(var i=0;i<totalSolution.length;i++)
    {
      //console.log(totalSolution[i]);
         await y.findById({_id:totalSolution[i]},(err,datas)=>{
          if (err) return res.json({ success: false, error: err });
          else{
            solutiondesc.push(datas)
          }
          // console.log(solutiondesc)
          
        })
      }
      
      res.send(JSON.stringify(solutiondesc))
      
    }
  })
  
})

router.get("/:solutionId/problem",(req,res) =>{
  var p;
  var prob;
  y.findById({_id:req.params.solutionId},async(err,datas)=> {
    if(err) return res.json({success:false, error:err});
    else {
       prob = datas.problemId;
       console.log(prob);
      await x.findById({_id:prob}, (err,data)=>{
        if (err) return res.json({ success: false, error: err });
        else{
                res.send(data);
        }

      })
     
    }
    
  });
});

  //this method posts solutions to a given problem

  router.post("/:problemId/postSolution", (req, res) => {
   
    //Find a problem------------
    x.findById({ _id: req.params.problemId }).then(prob => {
      //console.log(prob._id)

      //Posting a new solution---------------

      let y1 = new y();
      const { name, solution, date, thumbnail } = req.body;
      y1.problemId = prob._id;
      y1.name = name;
      y1.solution = solution;
      y1.email_solution = req.body.email;
      y1.date = date;
      y1.thumbnail = thumbnail;
      y1.status = "Not Seen";
      y1.save();

      //Attach Solution to problem----------

      prob.solution.push(y1._id);
      console.log(y1._id);
      prob.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
    });
  });

  router.post("/current_user/solutions/:solutionId/updateData",(req,res)=> {
    const{status} = req.body;
    y.findOneAndUpdate({_id:req.params.solutionId},{status},{new:true}, err =>{
      if(err) return res.json({success: false, error: err});
      return res.json({success: true})
     });
  });
//This is the method to update the existig problems--------------//
router.post("/current_user/problems/:problemId/updateData", (req, res) => {
  const { description,title } = req.body;
  x.findOneAndUpdate({_id:req.params.problemId},{description,title},{new:true}, err => {
    
    if (err) return res.json({ success: false, error: err });
    else
    return res.json({ success: true })


  });
});

//--------------------This method deletes a particular problem------------------------------//

router.delete("/:problemId/deleteData", (req, res) => {
  x.findOneAndDelete({_id:req.params.problemId}, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

  //this is a method to post problems relative to each user
  router.post("/putData", (req, res) => {
    let x1 = new x();

    const { title, name, genre, description, date, thumbnail } = req.body;
    x1.title = title;
    x1.name = name;
    x1.genre = genre;
    x1.description = description;
    x1.email = req.body.email;
    x1.date = date;
    x1.thumbnail = thumbnail;

    console.log(x1);
    x1.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

  app.use("/api", router);
};
