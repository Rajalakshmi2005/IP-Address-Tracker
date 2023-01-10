const bodyParser = require('body-parser');
const { response } = require('express');
const express = require('express');
const app = express();

const port = 5098;  
const database = require('mysql');
//  connect to database
let connection = database.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:''
})
app.set("view engine","ejs");
app.get('/index',(req,res)=>{
res.render("index");
})
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());
app.use(express.static("public"));

app.listen(port,()=>console.log("listening server",port));  