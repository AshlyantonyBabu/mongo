var mong=require('mongoose')
var eschema=mong.Schema;
var empschema=new eschema({
    eid:{type:String, required:true},
    name:{type:String, required:true},
    salary:{type:Number, required:true}
})
var empmodel=mong.model("employee",empschema,)
module.exports=empmodel;