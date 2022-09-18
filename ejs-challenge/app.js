//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash'); //turn everything into lowercase using LODASH


const homeStartingContent = "Welcome to my daily journal! アメリカ生活5年目、現在インターンに、フリーランス、勉強、恋愛を奮闘中な23歳が作ったジャーナルサイトへようこそ。node.js や EJSを今回は学んでこのサイトが完成しました。コーディング好きじゃないけどこのWeb Development のコースをクリスマス前に終わらせたいので応援してくれると嬉しいです。";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
  //{key(from ejs file): value (variable/data in js file)}

});


app.get("/about", function(req, res){
  res.render("about", {aboutContentPage: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContentpage: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");

});

//Express routing parameters
//you type after "/posts/" and then what you type appears on the terminal

app.get("/posts/:postName", function(req, res){

  //Check if the title and url are the same

  const requestedTitle = _.lowerCase(req.params.postName); //turn everything into lowercase

  posts.forEach(function(post){

    const storedTitle = _.lowerCase(post.title);

    //if same, redirect to that dedicated page
    if(storedTitle === requestedTitle){

      res.render("post", {
        title: post.title,
        content: post.content
      });
    }

  });


});

//check if parameter val is equal to the title








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
