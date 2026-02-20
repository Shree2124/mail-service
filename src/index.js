import express from "express";
import dotenv from "dotenv";
import mailRoutes from "./mailRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/mail", mailRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});