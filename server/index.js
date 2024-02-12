import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import ansRoutes from "./routes/Answers.js";

const app = express();
dotenv.config()
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is a stack overflow clone API");
});

app.use("/user", userRoutes);
app.use("/questions",questionRoutes);
app.use("/answer",ansRoutes)

const PORT =process.env.PORT||5000;
const DATABASE_URL =process.env.CONNECTION_URL;
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`mongodb is successfull connected`),
        console.log(`App is running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));
