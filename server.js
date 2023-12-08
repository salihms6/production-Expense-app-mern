const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv= require('dotenv');
const colors= require('colors');
const path = require('path');
const connectDb = require('./config/connectDb');

dotenv.config();

connectDb();


const app = express();
//middleware
app.use(morgan('dev'));
app.use(express.json());

app.use(cors());
// user routes
app.use("/api/v1/users", require("./routes/userRoute"));
//transaction routes
app.use("/api/v1/Transactions", require("./routes/TransactionRoutes"));

app.use(express.static(path.join(__dirname,'./client/build/')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname,'./client/build/index.html'))});

//Error handler middleware
app.use((req, res, next) =>{
    console.error(err.stack);
    res.status(500).send('internal server error');
});

//port
const PORT = 8080 || process.env.PORT || 8080;
//listen server
app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
});
