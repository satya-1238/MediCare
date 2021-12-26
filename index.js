
// required 
const express=require('express');
// fireUp express
const app=express();
// provide port to listen
const port=1000;








// Server listener
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the Server ${err}`);
        return;
    }
    console.log(`server is running on  port: ${port}`);

})