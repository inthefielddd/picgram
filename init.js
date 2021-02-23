import "./db";
import dotenv from "dotenv";
import app from "./app";
import "./models/Image";
import "./models/User";
import "./models/Comment";
import "./passport";

dotenv.config();

//port
const PORT = process.env.PORT || 4000;

const handleListening = () => {
    console.log(`✅Listening on : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
