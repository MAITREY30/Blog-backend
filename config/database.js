const mongoose = require("mongoose");


// env file ki configuration ko load krta h process waale object ke andar
require("dotenv").config();

const connectwithdb=()=>{
     mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology:true,
     })
     .then(console.log("DB Connected Successfully"))
     .catch((error) =>{
        console.log("DB Facing Connection Issues");
        console.log(error);
        //In Node.js, process.exit() is a method used to immediately stop the execution of a program and exit the Node.js process. 
        //The method takes an optional exit code as an argument to indicate the reason for the termination:

        //process.exit(0): Exits the program successfully. This indicates that the program completed without errors.
        //process.exit(1): Exits the program with a failure code. This is typically used to signal that something went wrong.
        process.exit(1);
     })
};

module.exports=connectwithdb;