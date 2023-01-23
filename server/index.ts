import "colors";
import express from "express";
import cors from "cors";

require("dotenv").config();
import {graphqlHTTP} from "express-graphql";
import schema from "./schema/schema";
import connectDB from "./config/db";
// import connectDB from "./config/db";
const port = process.env.PORT || 5000;

const app = express();

//connect DB
connectDB();

//cors
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({schema, graphiql: process.env.NODE_ENV === "development"})
);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
