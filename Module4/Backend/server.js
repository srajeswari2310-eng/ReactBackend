const express = require('express');
const app  = express();
const dotenv = require('dotenv');
const dbConnection = require('./config/dbconnection.config');

const authRouter = require("./routes/authentication.routes");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const orderRouter = require('./routes/order.routes');

const errorHandler = require("./middleware/error.middleware");

dotenv.config();

app.use(express.json());


dbConnection();

//call register and login
app.use("/", authRouter);

//call user endpoint
app.use("/user", userRouter);

//call product endpoit
app.use("/product", productRouter);

//call order endpoint
app.use("/order", orderRouter);

//handel errorHandler
app.use(errorHandler);


app.listen(process.env.PORT,()=>{
    console.log("Server is running");
})