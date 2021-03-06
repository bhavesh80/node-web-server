const express = require('express');
const hbs = require('hbs');
const fs= require('fs');
const PORT = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log' , log + '\n' ,(err) => {
        if(err){
            console.log('unable to append server.log');
        }
    } );
    next();
});

// app.use((req,res,next) =>{

//     res.render('maintainance.hbs');
    
// });
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
    // return 'test';
});

hbs.registerHelper('screamIt' , (text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {

    res.render('home.hbs',{
        pageTitle:'home Page',
        welcomeMessage:'welcome to my website',
       
    });
});
   
    app.get('/about',(req,res) =>{
        res.render('about.hbs',{
            pageTitle:'About Page',
           
        });
    });
    app.get('/bad',(req,res) =>{
        res.send({
            errorMessage : 'Unable to Handle request'
        });
    });

    app.get('/projects',(req,res) =>{
        res.render('projects.hbs',{
            pageTitle:'Projects',
           
        });
    });


//  app.listen(3000);
app.listen(PORT ,()=> {
    console.log(`server is up on port ${PORT}`);
});