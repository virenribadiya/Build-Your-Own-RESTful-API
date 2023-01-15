const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);


const app = express()

app.set('view engine',ejs);

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));



mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {useNewUrlParser:true});

const articleSchema = {
    title:String,
    content:String
};

const Article = mongoose.model("Article",articleSchema);





//=======================================GET=====================================

app.get("/articles",function(request,response){
    Article.find(function(error,foundArticles){
        if (error)
        {
            console.log(error);    
        }
        else 
        {
            response.send(foundArticles);  
        }
    })
});






//================================POST=====================================

app.post("/articles",function(request,response){
    console.log(request.body.title);
    console.log(request.body.content);

    const newArticle = new Article({
        title: request.body.title,
        content: request.body.content,
    });

    newArticle.save(function(error){
        if (!error)
        {
            response.send("Successfully added a new article!!!");    
        } 
        else 
        {
            response.send(error);
        }
    });
});





app.listen(3000,function(){
    console.log("Server is running at Port 3000!!");
})