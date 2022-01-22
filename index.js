
// required 
const express=require('express');
const cookieParser=require('cookie-parser');
// fireUp express
const app=express();
// provide port to listen
const port=8000;

// import the express-layouts library
const expressLayouts=require('express-ejs-layouts');

// Use db
const db=require('./config/mongoose');

// for reading and writing cookies
app.use(express.urlencoded());
// set up the cookie parser
app.use(cookieParser());
// setUp the static files
app.use(express.static('./assets'));


// for using layouts
app.use(expressLayouts);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// setUp the viewEngine
app.set('view engine','ejs');
app.set('views','./views');

// Use express router
app.use('/',require('./routes'));
// Server listener
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the Server ${err}`);
        return;
    }
    console.log(`server is running on  port: ${port}`);

})