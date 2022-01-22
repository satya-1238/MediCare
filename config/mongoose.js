
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/MedicareDb');

const db=mongoose.connection;

// error
db.on('error',console.error.bind(console,"Error connected to mongodb"));
// Connected succesfully
db.once('open',function(){
    console.log('Connected to Database:: MongoDB');
})
module.exports=db;