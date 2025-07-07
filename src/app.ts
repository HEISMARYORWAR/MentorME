import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./configdb";
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
import authRoutes from "./routes/authroutes";
import userRoutes from "./routes/userroutes";
import mentorRoutes from "./routes/mentorRoutes";
import requestRoutes from "./routes/requestRoutes";
import sessionRoutes from "./routes/sessionRoutes";

// API Routes
app.use("/api/auth", authRoutes);         // Register & Login
app.use("/api/user", userRoutes);         // Profile Management
app.use("/api/mentors", mentorRoutes);    // Mentor Discovery
app.use("/api/requests", requestRoutes);  // Mentorship Requests
app.use("/api/sessions", sessionRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Mentorship API Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));




