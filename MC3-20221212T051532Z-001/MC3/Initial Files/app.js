const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
  }));

const homeStartingContent = "Good luck on your Final Exam. Merry Christmas and Happy New Year to Everyone!";
const aboutContent = "Good luck on your Final Exam. Merry Christmas and Happy New Year to Everyone!";
const contactContent = "Good luck on your Final Exam.Merry Christmas and Happy New Year to Everyone!";

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = new mongoose.Schema({ title: String, content: String }, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

const addPost = (req,res) => {
    console.log("1")

    const post = new Post ({
        title: req.body.postTitle,
        content: req.body.postBody,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    
    console.log(post)

    Post.create(post).then((result)=>{
        console.log('asdfasdf');
        console.log(result)
        res.redirect('/');
    })
}

app.get('/', function(req, res){
    res.render('home', {homeStartingContent});
});

app.get('/compose', function(req, res){
    res.render('compose');
});

app.post('/compose', addPost);

app.get('/about', function(req, res){
    res.render('about', {aboutContent});
});

app.get('/contact', function(req, res){
    res.render('contact', {contactContent});
});

app.listen(3000, function () {
    console.log("server started on port 3000");
  });
