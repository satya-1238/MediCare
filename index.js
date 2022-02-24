
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

// use these for session-coookies
const session =require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJwt=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore= require('connect-mongo') ;//(session);
// for reading and writing cookies
app.use(express.urlencoded());
// set up the cookie parser
app.use(cookieParser());
// setUp the static files
app.use(express.static('./assets'));


// avalaible uploads path to browser
app.use('/uploads',express.static(__dirname+'/uploads'));
// for using layouts
app.use(expressLayouts);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// setUp the viewEngine
app.set('view engine','ejs');
app.set('views','./views');

// Mongo store is used to store the session cookie in the db
// setUp session
app.use(session({
    name: 'medicare',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/MedicareDb',
        autoRemove:'disabled'
    },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
    
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

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