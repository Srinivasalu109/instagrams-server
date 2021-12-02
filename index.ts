import express from "express";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import schema from "../GhraphQL/ghraphql";
const app = express();
mongoose
  .connect(
    "mongodb+srv://allasrinivas:gitsri123@instagram.vaz3z.mongodb.net/test"
  )
  .then((res) => console.log("connented"));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("running");
});
