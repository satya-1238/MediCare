
const mongoose=require('mongoose');
const env=require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db=mongoose.connection;

// error
db.on('error',console.error.bind(console,"Error connected to mongodb"));
// Connected succesfully
db.once('open',function(){
    console.log('Connected to Database:: MongoDB');
})
module.exports=db;