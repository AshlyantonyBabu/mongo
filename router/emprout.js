var ex=require('express')
const router=ex.Router();
var bdy=require('body-parser')
router.use(bdy.urlencoded({extended:true}))
var mon=require('mongoose')
var url="mongodb://localhost/dbde"
var emp=require("../model/emplyee")
mon.connect(url,function(err){
    if(err) throw err
    else{
        console.log("database connected")
    }
})
module.exports=router;
router.get("/",function(req,res){
    res.render('newemp')
})
router.get("/view",function(req,res){
    emp.find({},function(err,result){
        if(err)throw err
        else{
            res.render('viewemp',{emps:result})
            console.log(result)
        }
    })
  
  
})
router.post("/add",function(req,res){
    var e1=new emp();
    e1.eid=req.body.eid
    e1.name=req.body.ename
    e1.salary=req.body.esalary
    e1.save(function(err){
        if(err)
            throw err
        
        else{
            res.send("data added")
        }
    })
   // res.send('employee added')
})