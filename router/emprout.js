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
router.get("/edit/:id",function(req,res){
    var idi=req.params.id
    console.log(idi)
    var qry={eid:idi}
    emp.findOne(qry,function(err,result){
        if(err)throw err
        else{
            res.render('editemp',{empes:result})
            
            console.log(result)
        }
    })
    
   // res.send(idi)
})
router.post("/update/:id",function(req,res){
    var idi=req.params.id
    //var e2=new emp();
    eidi=req.body.eid
    namee=req.body.ename
    salaryy=req.body.esalary

    var myquery = { eid: idi };
  var newvalues = { $set: {eid:eidi,name: namee, salary: salaryy } };
  emp.updateOne(myquery, newvalues, function(err,result) {
    if (err) throw err;
   
   // db.close();
   else{
    console.log("1 document updated");
   // res.rendir('viewemp')
res.redirect('/emp/view')
}
  
  });
//   res.render('viewemp')
   
})
router.get("/delete/:id",function(req,res){
    var idi=req.params.id
    var qry={eid:idi}
    emp.deleteOne(qry,function(err,obj){
        if(err)throw err
        else{
            res.redirect('/emp/view')
        }
    })
})
router.post("/search",function(req,res){
    var seachvalue=req.body.search;
    //var qry={name:{$text:{$search:seachvalue}}}
    emp.find({$text: { $search: seachvalue } },function(err,result){
        if(err)throw err
        else{
            res.render("viewemp",{emps:result})
        }
    })
})