var exp=require('express')
const app= exp();
app.set("view engine","ejs")
app.set("views","./src/view")
var rrt=require("./router/emprout")
app.use("/emp",rrt)
app.listen(8000,function(req,res){
    console.log("server is ready....")
})
app.get("/",function(req,res){
    res.render("home")
})
