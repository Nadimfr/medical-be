const express = require("express");
const app = express();

const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
const reviewRoute = require("./routes/reviewRoute");
const fractureRoute = require("./routes/fractureRoute");

const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://nadimfarah:giI86Pi0LWqoPQD6@medical.d8bed.mongodb.net/medical"
  )
  .then(
    () => {
      console.log("connected to mongo");
    },
    (err) => {
      console.log(err);
    }
  );

// Enable CORS
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/fractures", fractureRoute);

app.listen(8080, () => {
  console.log("Running");
});
