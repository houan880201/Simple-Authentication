var express  =  require('express'),
    app =  express();

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
})

app.get("/secret",function(req,res){
    res.render("secret");
})

app.listen(8124, "127.0.0.1",function(){
    console.log("Server started");
});
