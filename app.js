const express = require("express");
const app = express();

const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
const reviewRoute = require("./routes/reviewRoute");
const fractureRoute = require("./routes/fractureRoute");
const solutionRoute = require("./routes/solutionRoute");
const fractureController = require("./controllers/fractureController");

const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");

require("dotenv").config();

cron.schedule("0 0 * * *", () => {
  console.log("Running cron job at midnight...");
  fractureController
    .updateFractureDuration()
    .then(() => console.log("Durations updated"))
    .catch((err) => console.error("Error updating durations:", err));
});

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
app.use("/api/solutions", solutionRoute);

app.listen(8080, () => {
  console.log("Running");
});
