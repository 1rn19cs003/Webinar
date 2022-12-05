const express=require("express")
const app=express();

const db=require("./config/database")
db.authenticate()
.then(()=>console.log("DataBase Connected"))
.catch((err)=>console.log("ERROR",err));

app.use(express.json());
const userRouter=require("./routers/userRouter")
app.use("/user",userRouter);


app.listen(3000); 