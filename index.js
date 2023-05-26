const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Routes
const routes = require("./routes");

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

const DB = "mongodb://azuresetup:V6a1tKzqPt1k5DYlp3zSJKHkcudILKxsKL3RO95FkLGGZIlRueu2ccsobW8eYlwGAHPesaDM6pVNACDbtc42SA==@azuresetup.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@azuresetup@";

mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
    console.log("Success");
}).catch((err) => console.log("Failed"));

app.use("/", routes);

app.listen(4000, function(){
    console.log("listening on port: 4000");
});