import express from "express";
import connectDB from "./src/config/mongodb.js";
import cors from "cors";
import "dotenv/config";
import userRouter from "./src/routes/userRouter.js";
import otpRouter from "./src/routes/otpRouter.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
await connectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", otpRouter);

app.get("/", (req, res) => res.send("System Online. API is Working...."));

app.listen(PORT, () => {
	console.log(`System server is running on port ${PORT}`);
});
