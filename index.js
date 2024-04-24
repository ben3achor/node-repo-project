const express= require("express");
const mongoose= require("mongoose");
const ArticleM = require("./module/article");
const { render } = require("ejs");
const app=express();
app.use(express.json());
//const uri = "mongodb+srv://ben3achor_db:<password>@cluster-beno.bhb3myl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-beno";
mongoose
.connect("mongodb+srv://ben3achor_db:WnQIE2uG6FMZplwT@cluster-beno.bhb3myl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-beno")
.then(()=>{console.log("connection successful to mongose");})
.catch(()=>{console.log("fail to mongose "),"error"})
app.post("/articles",async (req,res)=>{
    const articlextitle=req.body.article_title;
    const articlexbody=req.body.article_body;
   /* res.send(articlextitle +"   ___________this  is  the  body___________________   :"+articlexbody);    return;
   newArticle.title="tide   artB";
    newArticle.body="tide   artB";*/ 
   const newArticle= new ArticleM();
    newArticle.title=articlextitle;
    newArticle.body=articlexbody;
    newArticle.numbreoflikes=99;
    await newArticle.save();
    res.json(newArticle);
    //res.send("the new article has been stored")
});
app.get("/articles/:articleid",async (req,res)=>{
    const id=req.params.articleid;
    console.log(id);
   /* const articlextitle=req.body.article_title;
    const articlexbody=req.body.article_body;
    res.send(articlextitle +"   ___________this  is  the  body___________________   :"+articlexbody);    return;
   newArticle.title="tide   artB";
    newArticle.body="tide   artB"; 
    const newArticle= await ArticleM.find();*/
    const newArticle= await ArticleM.findById(id);
    console.log("____________________voila the articles_____________",newArticle);
    res.json(newArticle);
});
app.delete("/articles/:articleid",async (req,res)=>{
    const id=req.params.articleid;
    console.log(id);
    const newArticle= await ArticleM.findByIdAndDelete(id);
    res.json(newArticle);
});
app.get("/showarticles",async (req,res)=>{
    const newArticle= await ArticleM.find();    
    res.render("articles.ejs",{allarticles:newArticle});
});

app.get("/hello",(req,res)=>{res.send("hello world !")});
app.get("/visited",(req,res)=>{//res.send("thk 4 visited ................ !");
   //res.sendFile(__dirname+"/views/numbers.ejs");});//,{name:"benozer",});, numberos:numberos ,{name: "benozer"}
res.render("numbers.ejs")});

app.get("/numberos",(req,res)=>{let numberos="";
for (let i = 0; i < 5; i++) {
    numberos += i + "-"; }
    console.log(numberos);
res.render("numbers.ejs",{name:"benozer",numberos:numberos,})});
//res.send('the number is equal to :' +numberos);});

app.get('/find_sum/:number1/:number2',(req,res)=>{
    console.log(req.params.number1);
    const num1=req.params.number1;
    const num2=req.params.number2;
    const total=Number(num1) + Number(num2);
    res.send(`the total is:${total}`);});
app.get('/someRoute/:number1', function(req, res) {
        console.log(req.params.number1);
        res.send(`${req.params.number1}`);});

app.get("/find_some",(req,res)=>{
    console.log(req.body);
    console.log(req.query);
    //res.send( `your name is ::  ${req.body.name} then you have ${req.query.age} old` );});
    res.json({name:req.body.name,age:req.query.age,});});

   /*res.send((req.body.name));});res.send(your name ${req.body.name},:${req.body.name}  res.send(" your name is : "+ req.body.name );});
    then your age is:${req.query.age});}); res.send("' your name '+ req.body.name + ',then your age is:' + req.query.age");});*/
   app.post("/postman",(req,res)=>{res.send("hello....... postman  !")});
app.listen(3000,()=>{console.log("i am connecting to server beno_svr")});