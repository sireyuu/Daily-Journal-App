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

    Post.create(post).then((result)=>{
        console.log('asdfasdf');
        console.log(result)
        res.redirect('/');
    })
}

const getAllPost = (req,res) => {
    console.log("getting posts")
    var posts = [];

    Post.find({}, function(err, tempPosts){
        if (err)
            console.log(err)
        else{
            res.render('home', {
                tempPosts:tempPosts, 
                homeStartingContent:homeStartingContent
            })
        }   
    })
}

const getPost = (req,res) => {
    console.log("get post")
    console.log(req.params.id)
    Post.findOne({_id: req.params.id}, function(err,result){
        console.log(result)
        res.render('post', {result:result})
    })
}

const editPost = (req,res) => {
    console.log("edit post")
    console.log(req.params.id)
    Post.findOne({_id: req.params.id}, function(err,result){
        console.log(result)
        res.render('compose', {result:result})
    })
}

const editOldPost = (req,res) => {
    console.log("edit old post")

    var newtitle = req.body.postTitle
    var newcontent = req.body.postBody
    var newdate = new Date()

    Post.updateOne({_id: req.params.id}, {$set:{title: newtitle, content: newcontent, updatedAt:newdate}})

    res.redirect('/');
}

const deletePost = (req,res) =>{
    console.log("delete post")
    
    Post.deleteOne({_id:req.params.id}).then((user) => {
        res.redirect('/')
    })
}

app.get('/', getAllPost)

app.get('/compose', function(req, res){
    res.render('compose');
});

app.post('/compose', addPost);

app.get('/compose/:id', editPost)
app.post('/compose/:id', editOldPost)

app.get('/about', function(req, res){
    res.render('about', {aboutContent});
});

app.get('/contact', function(req, res){
    res.render('contact', {contactContent});
});

app.get('/post/:id', getPost)
app.get('/post/delete/:id', deletePost)

app.listen(3000, function () {
    console.log("server started on port 3000");
  });
