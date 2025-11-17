import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;
import session from "express-session";
import express from "express";
import bookRouter from "./bookDb.js";
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .catch((err) => console.log(err));

const personSchema = new Schema({
  username: String,
  password: String,
  tel: Number,
});
const personModel = mongoose.model("person", personSchema);


app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await personModel.findOne({
    username: username,
    password: password,
  });
  if (user === null) {
    res.status(401).send("Invalid username or password");
  } else {
      req.session.isAuthenticated = true;
      res.send("Authenticated successfully");
  }
});

app.post("/register",async (req, res) => {
  const { username, password ,tel } = req.body;
  console.log("--username-- : ",username,"--password-- : ",password);
   const user = await personModel.findOne({
    username: username,
    password: password,
  });
  console.log("---- user",user);
  if(user){
    res.status(401).send("user already exist");
  }
  else{
      await personModel.create({username : username,password :password,tel :tel});
      res.send("user created successufly")
  }

})
function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).send("vous devez s'authentifier"); 
  }
}

app.use("/books", isAuthenticated, bookRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
