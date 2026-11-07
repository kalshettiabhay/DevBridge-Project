import express from "express"
import mongoose from "mongoose";
import auth from "./routes/auths.routes.js"
import clientroutes from "./routes/client.routes.js";
import developerroutes from "./routes/developer.routes.js";

const app= express();
const port=3000;

app.use(express.json());

app.use("/api/auth",auth);
app.use("/api",clientroutes);
app.use("/api/developer",developerroutes);

mongoose.connect("mongodb://127.0.0.1:27017/Devbridge")
.then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.listen(port,(req,res)=>{
    console.log(`listening on port ${port}`);
})