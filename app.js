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


//=======================GET,POST,DELETE (all articles) ================================
app.route("/articles")

.get(function(request,response){
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
})
.post(function(request,response){
    console.log(request.body.title);
    console.log(request.body.content);

    const newArticle = new Article({
        title: request.body.title,
        content: request.body.content,
    });

    newArticle.save(function(error){
        if (!error) {
            response.send("Successfully added a new article!!!");
        } else {
            response.send(error);
        }
    });
})
.delete(function(request,response){
    Article.deleteMany(function(error){
        if (!error) {
            response.send("Successfully deleted all the articles!!!");
        } else {
            response.send(error);
        }
    })
});
//==============================================================================

//========================== GET,PUT,DELETE,PATCH (specific articles) ====================

app.route("/articles/:articleTitle")
.get(function(request,response){
    Article.findOne({title:request.params.articleTitle},function(error,foundArticle){
        if(foundArticle){
            response.send(foundArticle);
        } else {
            response.send("No matching article.");
        }
    });
})
.put(function(request,response){
    console.log("enter!");
    Article.update(
        {title:request.params.articleTitle},
        {title:request.body.title,content:request.body.content},
        {overWrite:true},
        function(error){
            if (!error) {
                response.send("Successfully updated the article.");
            } else {
                response.send(error);
            }
        }    
    )   
}).delete();






app.listen(3000,function(){
    console.log("Server is running at Port 3000!!");
});



































































//=======================================GET=====================================

// app.get("/articles",function(request,response){
//     Article.find(function(error,foundArticles){
//         if (error)
//         {
//             console.log(error);    
//         }
//         else 
//         {
//             response.send(foundArticles);  
//         }
//     })
// });






//================================POST=====================================

// app.post("/articles",function(request,response){
//     console.log(request.body.title);
//     console.log(request.body.content);

//     const newArticle = new Article({
//         title: request.body.title,
//         content: request.body.content,
//     });

//     newArticle.save(function(error){
//         if (!error) {
//             response.send("Successfully added a new article!!!");
//         } else {
//             response.send(error);
//         }
//     });
// });










//=================================DELETE=================================

// app.delete("/articles",function(request,response){
//     Article.deleteMany(function(error){
//         if (!error) {
//             response.send("Successfully deleted all the articles!!!");
//         } else {
//             response.send(error);
//         }
//     })
// });


// app.listen(3000,function(){
//     console.log("Server is running at Port 3000!!");
// })